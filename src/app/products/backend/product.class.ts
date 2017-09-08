import { Record } from 'immutable';

export interface IProduct {
  id: number;
  articleId: string;
  label: string;
  price: number;
}

export const DEFAULT_VALUES: IProduct = {
  id: 0,
  articleId: '',
  label: '',
  price: 0
};

export class Product extends Record(DEFAULT_VALUES) implements IProduct {
  public id: number;
  public articleId: string;
  public label: string;
  public price: number;
}
