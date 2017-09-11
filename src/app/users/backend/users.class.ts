import { Record } from 'immutable';

export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

const DEFAULT_VALUES = {
  id: 0,
  firstname: '',
  lastname: '',
  email: ''
};

export class User extends Record(DEFAULT_VALUES) implements IUser {
  public readonly id: number;
  public readonly firstname: string;
  public readonly lastname: string;
  public readonly email: string;

  get name(): string {
    return `${this.firstname} ${this.lastname}`;
  }
}
