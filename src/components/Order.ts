import {Form} from "./Form"; 
import {IButtonPayment, IOrderForm, IContactsForm} from "../types/index";
import {EventEmitter, IEvents} from "./base/events";
import {ensureAllElements} from "../utils/utils";

export class Order extends Form<IOrderForm> {

    protected _button: HTMLElement;
    protected _payment: HTMLButtonElement[];

    constructor(protected container: HTMLFormElement, events: IEvents, actions?: IButtonPayment) {
        super(container, events);

        this._button = container.querySelector('.order__button');
        this._payment = ensureAllElements<HTMLButtonElement>('.button_alt', container);

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('contacts:open');
            });
        }

        this._payment.forEach(button => {
            button.addEventListener('click', () => {
                actions?.onClick?.(button.name);
                this.selected = button.name;
            });
        });
    }

    set selected (name: string) {
        this._payment.forEach(button => {
            this.toggleClass(button, 'button_alt-active', button.name === name);
        });
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }
}

export class Contacts extends Form<IContactsForm> {

    protected _button: HTMLElement;
    protected _email: HTMLElement;
    protected _phone: HTMLElement;

    constructor(container: HTMLFormElement, protected events: EventEmitter) {
        super(container, events);

        this._button = container.querySelector('.button[type="submit"]');
        this._email = this.container.querySelector('input[name="email"]');
        this._phone = this.container.querySelector('button[type="submit"]');

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('success:open');
            });
        }
    }
    
    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }
}