# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```


## Класс Api 
является базовым классом для работы с API и предоставляет методы для отправки GET и POST запросов к указанному базовому URL. Aрхитектура:

### Свойства:
- baseUrl (тип string): базовый URL для всех запросов.
- options (тип RequestInit): объект с опциями для настройки запросов, включая заголовки.

### Конструктор:
Принимает baseUrl (тип string) - базовый URL для API и необязательный параметр options (тип RequestInit) для настройки запросов. В конструкторе инициализируются свойства baseUrl и options, включая заголовок Content-Type как application/json.

### Методы:
- handleResponse(response: Response): Обработка ответа от сервера. Если ответ успешен (response.ok), возвращает JSON данные. В противном случае, возвращает ошибку, содержащую сообщение об ошибке из JSON данных или статус текст ответа.
- get(uri: string): Выполняет GET запрос по указанному URI, используя базовый URL. Возвращает Promise с JSON данными ответа после обработки.
- post(uri: string, data: object, method: ApiPostMethods = 'POST'): Выполняет POST запрос по указанному URI, передавая данные в формате JSON. Также можно указать метод (POST, PUT, DELETE). Возвращает Promise с JSON данными ответа после обработки.

### Типы:
- ApiListResponse<Type>: Обобщенный тип, представляющий ответ от сервера, содержащий общее количество элементов и массив элементов заданного типа.
- ApiPostMethods: Тип, представляющий поддерживаемые методы для POST запросов.

## Класс Component
 является абстрактным классом, предназначенным для создания компонентов интерфейса. Он обеспечивает базовую функциональность для работы с DOM элементами, такими как управление классами, текстовым содержимым, атрибутами, видимостью и изображениями. Архитектура:

### Обобщения:
- T: Обобщенный тип данных, который представляет данные компонента.

### Конструктор:
- container: Корневой элемент, в который будет отрисовываться компонент. Конструктор принимает этот элемент и сохраняет его в защищенное свойство container.

### Методы:
- toggleClass(element: HTMLElement, className: string, force?: boolean): Переключает класс className для элемента element, при необходимости с применением параметра force.
- setText(element: HTMLElement, value: unknown): Устанавливает текстовое содержимое value для элемента element.
- setDisabled(element: HTMLElement, state: boolean): Устанавливает состояние блокировки для элемента element.
- setHidden(element: HTMLElement): Скрывает элемент element.
- setVisible(element: HTMLElement): Показывает элемент element.
- setImage(element: HTMLImageElement, src: string, alt?: string): Устанавливает изображение с альтернативным текстом для элемента element.
- render(data?: Partial<T>): HTMLElement: Виртуальный метод, который должен быть переопределен в дочерних классах. Он отображает компонент с данными data и возвращает корневой DOM-элемент компонента.

### Защищенные свойства:
- container: Корневой элемент компонента.

## Класс EventEmitter 
представляет брокер событий с классической реализацией, который поддерживает подписку на события, отписку от событий, инициирование событий, прослушивание всех событий, сброс всех обработчиков и использование "триггеров" для генерации событий. Архитектура:

### Типы:
- EventName: Тип данных для имени события, представленный как строка или регулярное выражение.
- Subscriber: Тип данных для функции-подписчика на событие.
- EmitterEvent: Тип данных представляющий событие с именем и данными.

### Интерфейс IEvents:
- on<T extends object>(event: EventName, callback: (data: T) => void): Метод для подписки на событие.
- emit<T extends object>(event: string, data?: T): Метод для инициирования события.
- trigger<T extends object>(event: string, context?: Partial<T>): Метод для создания "триггера", который при вызове генерирует указанное событие.

### Свойства:
- _events: Закрытое свойство, представляющее карту событий, где ключом является имя события, а значением - набор подписчиков.

#### Методы:
- constructor(): Конструктор класса, инициализирует карту событий.
- on<T extends object>(eventName: EventName, callback: (event: T) => void): Метод для установки обработчика на событие.
- off(eventName: EventName, callback: Subscriber): Метод для снятия обработчика с события.
- emit<T extends object>(eventName: string, data?: T): Метод для инициирования события с данными.
- onAll(callback: (event: EmitterEvent) => void): Метод для подписки на все события.
- offAll(): Метод для сброса всех обработчиков.
- trigger<T extends object>(eventName: string, context?: Partial<T>): Метод для создания триггера, который инициирует событие с заданным именем и контекстом при вызове.

## Класс Model<T> 
представляет базовую модель, которую можно использовать для отличия от простых объектов с данными. Вот архитектура данного класса:

### Методы:
- constructor(data: Partial<T>, events: IEvents): Конструктор класса, принимает частичные данные и объект событий.
- emitChanges(event: string, payload?: object): Метод для сообщения всем подписчикам о изменениях в модели.

### Свойства:
- events: Защищенное свойство, представляющее объект событий, необходимый для уведомления о изменениях в модели.

## Класс Page
представляет страницу со следующими свойствами и методами:

### Свойства:
- counter (число): счётчик элементов на странице
- catalog (массив HTMLElement): массив элементов каталога
- locked (логическое значение): флаг блокировки страницы

### Защищенные свойства:
- _basketCounter (тип HTMLElement): HTML-элемент счётчика корзины
- _catalog (тип HTMLElement): HTML-элемент каталога
- _wrapper (тип HTMLElement): HTML-элемент обёртки страницы
- _basket (тип HTMLElement): HTML-элемент корзины

### Конструктор:
- constructor(container: HTMLElement, events: IEvents): принимает контейнер для размещения страницы и экземпляр объекта событий events. 
  - инициализирует защищенные свойства _basketCounter, _catalog, _wrapper, _basket с помощью метода ensureElement, связывает обработчик клика по корзине с эмиттером событий. 

### Методы:
- set basketCounter(value: number): устанавливает текст счётчика корзины в переданное значение.
- set catalog(items: HTMLElement[]): заменяет дочерние элементы каталога на переданный массив элементов.
- set locked(value: boolean): добавляет/удаляет класс page__wrapper_locked к обёртке страницы в зависимости от переданного значения.

### Интерфейс:
Класс Page наследует класс Component и принимает интерфейс IPage в качестве обобщенного типа.

## Класс Card<T> 
является компонентом для отображения карточки продукта на странице. Он имеет следующую структуру:

### Свойства:
- Защищенные свойства:
  - _title (тип HTMLElement): заголовок карточки
  - _image (тип HTMLImageElement): изображение карточки
  - _price (тип HTMLElement): цена продукта
  - _description (тип HTMLElement): описание продукта
  - _category (тип HTMLElement): категория продукта
  - _button (опциональный тип HTMLButtonElement): кнопка действия
  - _buttonDelete (опциональный тип HTMLElement): кнопка удаления продукта
  - _buttonInBasket (опциональный тип HTMLButtonElement): кнопка добавления в корзину
  - _index (тип HTMLElement): индекс продукта

### Конструктор:
- constructor(container: HTMLElement, events: EventEmitter, item: IProduct, isItemInBasket: boolean, actions?: ICardActions): принимает контейнер, объект EventEmitter, информацию о продукте, флаг наличия продукта в корзине и объект действий для карточки.
 - инициализирует защищенные свойства карточки и устанавливает обработчики событий на кнопки.
  
### Методы:
- Методы для установки и получения значений свойств карточки, такие как index, id, title, image, price, description, category.
- Методы для отображения соответствующих классов категории продукта.

### Интерфейсы:
- IProduct: описывает структуру объекта продукта
- ICardActions: содержит функцию обработчика события клика на карточке


## Класс Basket 
является компонентом для отображения содержимого корзины на странице, предоставляет функциональность для отображения содержимого корзины, общей цены и обработки события оформления заказа. Он имеет следующую структуру:

### Свойства:
- Защищенные свойства:
  - _list (тип HTMLElement): список элементов корзины
  - _price (тип HTMLElement): общая цена продуктов в корзине
  - _button (тип HTMLElement): кнопка оформления заказа
  - _index (тип HTMLElement): индекс элемента корзины

### Конструктор:
- constructor(container: HTMLElement, events: EventEmitter): принимает контейнер и объект EventEmitter.
  - инициализирует защищенные свойства корзины и устанавливает обработчик события на кнопку оформления заказа.
  - устанавливает пустой массив items.

### Методы:
- set items(items: HTMLElement[]): устанавливает элементы корзины.
  - Заменяет текущие элементы на переданный массив элементов.
  - Включает или выключает кнопку оформления заказа в зависимости от количества элементов.
- set total(value: number | null): устанавливает общую цену продуктов в корзине.
- Отображает либо "Бесценно", либо фактическую сумму цены.
- Метод get total(): number возвращает число, обозначающее общую цену продуктов.

### Интерфейс:
- IBasketView: описывает структуру объекта представления корзины.
- Свойства items, total, selected, title, price представляют элементы корзины.

## Класс BasketModel
 представляет модель данных корзины продуктов. Позволяет управлять состоянием корзины, добавляя, удаляя продукты, вычисляя общую сумму и очищая корзину. Он реализует интерфейс IBasketModel, который определяет структуру модели корзины продуктов. Он имеет следующую структуру:

### Свойства:
- items (тип IProduct[]): массив продуктов в корзине, начальное значение - пустой массив.

### Методы:
- add(item: IProduct): добавляет продукт в корзину, если его еще нет.
- remove(item: IProduct): удаляет продукт из корзины по его id.
- getTotal(): возвращает общую сумму цен продуктов в корзине.
- clearBasket(): очищает корзину (удаляет все продукты).

### Интерфейс:
- IBasketModel: определяет структуру модели корзины.
  - Свойство items представляет массив продуктов в корзине.
  - Метод getTotal() возвращает общую сумму цен продуктов.
  - Методы add(id: IProduct) и remove(id: IProduct) добавляют и удаляют продукт из корзины соответственно.
  - Метод clearBasket() очищает корзину.

## Класс Order 
представляет форму заказа и наследует от абстрактного класса Form<IOrderForm>, управляет кнопками оплаты, устанавливает выбранную кнопку и адрес доставки. Он реализует интерфейс IOrderForm, который определяет структуру данных формы заказа. Он имеет следующую структуру:

### Свойства:
- _button (тип HTMLElement): кнопка отправки заказа.
- _payment (тип HTMLButtonElement[]): массив кнопок оплаты.

### Конструктор:
- container (тип HTMLFormElement): контейнер формы заказа.
- events (тип IEvents): объект, содержащий события.
- actions (тип IButtonPayment, необязательный): объект, содержащий действия для кнопок оплаты.
- Вызывает конструктор родительского класса Form с передачей контейнера и событий.

### Методы:
- selected(name: string): устанавливает выбранную кнопку оплаты, добавляя/удаляя класс button_alt-active.
- address(value: string): устанавливает значение адреса в поле формы.

### Интерфейс:
- IOrderForm: определяет структуру данных формы заказа.
  - Свойство address типа string: адрес доставки.
  - Свойство payment типа string: метод оплаты (не используется в данном классе).

## Класс Contacts 
представляет форму контактной информации, управляет полями ввода для электронной почты и номера телефона, а также обрабатывает событие отправки формы. Он реализует интерфейс IContactsForm, который определяет структуру данных формы контактов. Класс наследует от абстрактного класса Form<IContactsForm>. Он имеет следующую структуру:

### Свойства:
- _button (тип HTMLElement): кнопка отправки контактной информации.
- _email (тип HTMLElement): поле ввода электронной почты.
- _phone (тип HTMLElement): поле ввода номера телефона.

### Конструктор:
- container (тип HTMLFormElement): контейнер для формы контактов.
- events (тип EventEmitter): объект, содержащий события.
- Вызывает конструктор родительского класса Form с передачей контейнера и событий.
- Инициализирует свойства _button, _email и _phone.
- Добавляет обработчик события клика для кнопки отправки контактной информации.

### Методы:
- phone(value: string): устанавливает значение номера телефона в поле формы.
- email(value: string): устанавливает значение электронной почты в поле формы.

### Интерфейс:
- IContactsForm: определяет структуру данных формы контактной информации.
  - Свойство email типа string: электронная почта.
  - Свойство phone типа string: номер телефона.

## Класс Success 
является компонентом, который отображает сообщение об успешном завершении действия (успешной отправке данных или заказа), , управляет элементами для закрытия сообщения и отображения результата. Класс наследует от абстрактного класса Component<ISuccess> и имеет следующую структуру:

### Свойства:
- _close (тип HTMLElement): элемент для закрытия сообщения об успешном действии.
- _total (тип HTMLElement): элемент для отображения информации о результате действия.

### Конструктор:
- container (тип HTMLElement): контейнер, в котором будут отображаться данные успешного действия.
- events (тип EventEmitter): объект, содержащий события.
- Вызывает конструктор родительского класса Component с передачей контейнера.
- Инициализирует свойства _close и _total.
- Добавляет обработчик события клика для элемента закрытия сообщения.

### Методы:
- total(value: number): устанавливает значение для отображения информации о результате действия.
  - Генерирует текст сообщения на основе переданного числового значения и отображает его в элементе _total.

### Интерфейс:
- ISuccess: определяет структуру данных для компонента успешного действия.
  - Свойство total типа number: числовое значение, которое нужно отобразить в сообщении об успешном действии.

## Класс AppState 
является моделью данных приложения и отвечает за хранение и управление состоянием приложения. Управляет данными приложения, включая каталог продуктов, данные заказа, контактные данные, ошибки форм, модель корзины покупок и выбранные продукты. Он также обрабатывает валидацию данных и генерирует события при изменениях. Он наследует от абстрактного класса Model<IAppState> и имеет следующую структуру:

### Свойства:
- catalog (тип IProduct[]): массив продуктов.
- order (тип IOrderForm): данные заказа (адрес и способ оплаты).
- contacts (тип IContactsForm): контактные данные (email и телефон).
- preview (тип string | null): ID выбранного продукта для предпросмотра.
- formErrors (тип FormErrors): объект с ошибками при заполнении формы заказа.
- formErrorsContact (тип FormErrorsContact): объект с ошибками при заполнении формы контактов.
- basketModel (тип IBasketModel): модель корзины покупок.
- selectedItem (тип IProduct): выбранный продукт.
- price (тип IProduct): цена продукта.

### Методы:
- setCatalog(items: IProduct[]): устанавливает список продуктов и генерирует событие изменения.
- setCardPreview(item: IProduct): устанавливает выбранный продукт для предпросмотра и генерирует событие изменения.
- setPreview(item: IProduct): устанавливает выбранный продукт и генерирует событие изменения.
- getTotalPrice(): возвращает общую стоимость продуктов в корзине.
- setButton(item: IProduct): устанавливает выбранный продукт и генерирует событие изменения.
- cardInBasket(item: IProduct): boolean: проверяет, есть ли выбранный продукт в корзине.
- setOrderFieldAddressForm(field: keyof IOrderForm, value: string): устанавливает данные формы заказа и проверяет их валидность.
- setOrderFieldContactsForm(field: keyof IContactsForm, value: string): устанавливает контактные данные и проверяет их валидность.
- validateOrderAddressForm(): валидирует данные формы заказа и генерирует событие изменения ошибок.
- validateContactsForm(): валидирует контактные данные и генерирует событие изменения ошибок.

### Интерфейсы:
- IAppState: определяет структуру данных для состояния приложения.
- FormErrors: тип для объекта с ошибками формы заказа.
- FormErrorsContact: тип для объекта с ошибками формы контактов.
- IBasketModel: интерфейс для модели корзины покупок.
- IOrderForm: интерфейс для данных формы заказа.
- IContactsForm: интерфейс для контактных данных.
- IProduct: интерфейс для продукта.

## Класс Modal 
является компонентом для работы с модальным окном и отвечает за отображение контента в модальном окне, его открытие и закрытие. Он наследует от базового класса Component<IModalData> и имеет следующую структуру:

### Свойства:
- _closeButton (тип HTMLButtonElement): кнопка закрытия модального окна.
- _content (тип HTMLElement): контент модального окна.
- events (тип IEvents): объект для работы с событиями.

### Конструктор:
Принимает container (тип HTMLElement) - элемент, в котором будет отображаться модальное окно, и events (тип IEvents) - объект для работы с событиями. В конструкторе происходит инициализация компонента, добавление обработчиков событий для закрытия модального окна и предотвращения закрытия окна при клике внутри контента.

### Методы:
- content (setter): устанавливает контент модального окна.
- open(): открывает модальное окно и генерирует событие открытия модального окна.
- close(): закрывает модальное окно, обнуляет контент и генерирует событие закрытия модального окна.
- render(data: IModalData): HTMLElement: рендерит модальное окно с переданным контентом из data и вызывает метод open() для открытия окна.

### Интерфейс:
- IModalData: интерфейс, описывающий структуру данных для контента модального окна.

## Класс ProductAPI 
является реализацией интерфейса IProductAPI и предоставляет методы для работы с продуктами, заказами и картами продуктов через API. Вот его архитектура:

### Свойства:
- cdn (тип string): URL-адрес контентного хранилища, используемый для получения изображений продуктов.

### Конструктор:
Принимает cdn (тип string) - URL-адрес контентного хранилища, baseUrl (тип string) - базовый URL для API, и необязательный параметр options (тип RequestInit) для настройки запросов. В конструкторе вызывается конструктор родительского класса Api с передачей базового URL и настроек.

### Методы:
- getCardList(): Получает список карточек продуктов и для каждой карточки добавляет URL изображения из CDN. Возвращает Promise с массивом карточек ICard[].
- getCardItem(id: string): Получает карточку продукта по идентификатору id и изменяет ее структуру, добавляя описание продукта. Возвращает Promise с объектом ICard.
- getOpenCard(id: string): Получает данные о конкретном продукте по идентификатору id и возвращает Promise с объектом OpenCard.
- orderProduct(order: IOrderForm, contacts: IContactsForm, basketModel: BasketModel): Отправляет запрос на создание заказа, передавая информацию о заказе, контактные данные и содержимое корзины. Возвращает Promise с результатом заказа IOrderResult.