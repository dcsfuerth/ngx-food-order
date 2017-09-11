import { Schema, schema } from 'normalizr';

export const userSchema: Schema = new schema.Entity('user');
export const productSchema: Schema = new schema.Entity('product');
export const orderItemSchema: Schema = new schema.Entity('item', { user: userSchema, product: productSchema });
export const orderSchema = new schema.Array(orderItemSchema);
