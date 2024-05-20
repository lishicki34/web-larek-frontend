import './scss/styles.scss';

import {EventEmitter} from './components/base/events';
import {CDN_URL, API_URL} from './utils/constants';
import {Modal} from './components/Modal';
import {ensureElement} from '../src/utils/utils';
import {Page} from './components/Page';
import {ProductAPI} from './components/ProductAPI';
import {AppState} from './components/AppData';
import {Card} from './components/Card';
import {cloneTemplate} from '../src/utils/utils';
import {IProduct, CatalogChangeEvent,IOrderForm, IContactsForm} from './types/index';
import {Basket} from './components/Basket';
import {Order, Contacts} from './components/Order';
import {Success} from './components/Success';

const events = new EventEmitter();
const api = new ProductAPI(CDN_URL, API_URL);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');


const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events, {
	onClick: (buttonName) => events.emit('order.payment:change', {field: 'payment', value: buttonName })
});
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);

export const appData = new AppState({}, events);

api.getCardList()
	.then(appData.setCatalog.bind(appData))
	.catch(err => {
		console.error(err);
	});

//отображение списка продуктов
events.on<CatalogChangeEvent>('items:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), events, item, false, {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
		});
	});
});

// Открыть карточку продукта
events.on('card:select', (item: IProduct) => {
	appData.setCardPreview(item);
});

// Открыть корзину
events.on('basket:open', () => {
	modal.render({ content: basket.render() });
});

// Отправлена форма заказа
events.on('success:open', () => {
    api.orderProduct(appData.order, appData.contacts, appData.basketModel)
        .then(() => {
            const success = new Success(cloneTemplate(successTemplate), events);
			success.total = appData.getTotalPrice();
            modal.render({
                content: success.render({})
            });
			appData.basketModel.clearBasket()
        	events.emit('basket:change');
        })
        .catch(err => {
            console.error(err);
        });
});

events.on('success:close', () => {
	modal.close();
})

// Открыть форму заказа с адресом и оплатой
events.on('order:open', () => {
	modal.render(
		{
			content: order.render({
				address: '',
				payment: '',
				valid: false,
				errors: [],
			}),
		}
	);
});

// Открыть  форму заказа с телефоном и почтой
events.on('contacts:open', () => {
	modal.render({
		content: contacts.render({
			phone: '',
			email: '',
			valid: false,
			errors: [],
		}),
	});
});

// Корзина
events.on('basket:change', () => {
	page.basketCounter = appData.basketModel.items.length
    basket.total = appData.getTotalPrice();
	  basket.items = Array.from(appData.basketModel.items).map((basketItem, index) => {
		const item = Array.from(appData.basketModel.items).find(
			(catalogItem) => catalogItem.id === basketItem.id
		);
		const card = new Card(cloneTemplate(cardBasketTemplate), events, item, true, {
			onClick: () => events.emit('basket:change'),
		});
		return card.render({
			index: String(index + 1),
			title: item.title,
			price: item.price,
		});
	});
});

events.on('addInBasket:change', (item: IProduct) => {
	appData.basketModel.add(item);
	events.emit('basket:change');

	const cardBasket = new Card (
		cloneTemplate(cardPreviewTemplate),
		events,
		item,
		appData.cardInBasket(item)
	);
	modal.render({ content: cardBasket.render(item) });
});

events.on('removeFromBasket:change', (item: IProduct) => {
	appData.basketModel.remove(item);
	events.emit('basket:change');
	const cardBasket = new Card (
		cloneTemplate(cardPreviewTemplate),
		events,
		item,
		appData.cardInBasket(item)
	);	
	modal.render({ content: cardBasket.render(item) });
});

events.on('removeFromBasketInBasket:change', (item: IProduct) => {
	appData.basketModel.remove(item);

});

// Продукт открыт
events.on('preview:changed', (item: IProduct) => {
	const showItem = (item: IProduct) => {
        const basketItems = appData.basketModel.items;
		const card = new Card (
			cloneTemplate(cardPreviewTemplate),
			events,
			item,
			appData.cardInBasket(item),
		);

		modal.render({
			content: card.render({
				title: item.title,
				image: item.image,
				price: item.price,
				category: item.category,
				description: item.description,
			}),
		});
	};

	if (item) {
		api
			.getCardItem(item.id)
			.then((result) => {
				item.description = result.description;
				showItem(item);
			})
			.catch((err) => {
				console.error(err);
			});
	} else {
		modal.close();
	}
});

// Блокируем скролл страницы если открыто модальное окно
events.on('modal:open', () => {
	page.locked = true;
});

// Разблокируем скролл
events.on('modal:close', () => {
	page.locked = false;
});

events.on('formErrorsAddress:change', (errors: Partial<IOrderForm>) => {
	const { address, payment} = errors;
	order.valid = !address && !payment;
	order.errors = Object.values({ address, payment }).filter((i) => !!i).join('; ');
});

events.on('formErrorsContact:change', (errors: Partial<IContactsForm>) => {
    const { email, phone } = errors;
    contacts.valid = !email && !phone;
    contacts.errors = Object.values({phone, email}).filter(i => !!i).join('; ');
});

events.on(/^order\..*:change/, (data: { field: keyof IOrderForm, value: string }) => {
    appData.setOrderFieldAddressForm(data.field, data.value);
});

events.on(/^contacts\..*:change/, (data: { field: keyof IContactsForm, value: string }) => {
    appData.setOrderFieldContactsForm(data.field, data.value);
});