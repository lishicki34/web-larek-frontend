
export interface IProduct {
  selected: boolean;
  id: string;
  title: string;
  image: string;
  category: string;
  description?: string;
  price: number | null;
  index?: string;
  button?: string;
  buttonDelete?: string;
  buttonInBasket?: string;
}

export interface IBasketModel {
  items: IProduct[];
  getTotal(): number;
  add(id: IProduct): void;
  remove(id: IProduct): void;
  clearBasket(): void;
}


export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export interface IButtonPayment {
  onClick: (tab: string) => void;
}

export interface IProductItem {
  description: string;
}

export type ICard = IProduct & IProductItem;

export type OpenCard = IProduct;

export interface IAppState {
  catalog: IProduct[];
  preview: string | null;
  order: IOrderForm | null;
  contacts: IContactsForm | null;

}

export interface IBasketView {
  items: HTMLElement[];
  total: number;
  selected: string[];
  title: string;
  price: number;
}

export interface IBasketHeaderButton {
  id: string;
  title: string;
  price: number;
  image: string;
}

export interface IOrderForm {
  address: string;
  payment: string;
}

export interface IContactsForm  {
  email: string;
  phone: string;
}

export interface IOrderResult {
  id: string;
}

export interface CatalogModel {
  items: IProduct[]
  setItems(tems: IProduct[]):void;
  getProduct(id: string): IProduct;
}


export interface IModalData {
  content: HTMLElement;
}

export interface IEventEmitter {
  emit: (event: string, data: unknown) => void;
}

export interface IViewConstructor {
  new (container: HTMLElement, events?: IEventEmitter): IView;
}

export interface IView {
  render(data?: object): HTMLElement;
}

export interface IFormState {
  valid: boolean;
  errors: string[];
}

export interface ISuccess {
  total: number;
}

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

export type FormErrorsContact = Partial<Record<keyof IContactsForm, string>>;

export type CatalogChangeEvent = {
  catalog: IProduct[]
};