import {Form} from "./Form"; 
import {IButtonPayment, IOrderForm, IContactsForm} from "../types/index";
import {EventEmitter, IEvents} from "./base/Events";
import {ensureAllElements} from "../utils/utils";

export class OrderForm extends Form<IOrderForm> {

    protected _button: HTMLElement;
    protected _paymentButtons: HTMLButtonElement[];

    constructor(protected container: HTMLFormElement, events: IEvents, actions?: IButtonPayment) {
        super(container, events);

        // this._button = container.querySelector('.order__button');
        this._paymentButtons = ensureAllElements<HTMLButtonElement>('.button_alt', container);
        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit(`${this.container.name}:submit`);
        });

        // if (this._button) {
        //     this._button.addEventListener('click', () => {
        //         events.emit('contacts:open');
        //     });
        // }

        this._paymentButtons.forEach(button => {
            button.addEventListener('click', () => {
                actions?.onClick?.(button.name);
                this.selected = button.name;
            });
        });
    }

    set selected (name: string) {
        this._paymentButtons.forEach(button => {
            this.toggleClass(button, 'button_alt-active', button.name === name);
        });
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }
}

export class ContactsForm extends Form<IContactsForm> {

    protected _button: HTMLElement;
    protected _email: HTMLElement;
    protected _phone: HTMLElement;

    constructor(container: HTMLFormElement, protected events: EventEmitter) {
        super(container, events);

        this._button = container.querySelector('.button[type="submit"]');
        this._email = this.container.elements.namedItem('email') as HTMLInputElement;
        this._phone = this.container.elements.namedItem('phone') as HTMLInputElement;
        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('success:open');
            });
        }
    }
    
    set phone(value: string) {
        // (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
        this.setText(this._phone, value);
    }

    set email(value: string) {
        this.setText(this._email, value);
        // (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }
}