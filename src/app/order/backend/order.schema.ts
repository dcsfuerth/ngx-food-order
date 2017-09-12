import { Schema, schema } from 'normalizr';

export const orderItemSchema: Schema = new schema.Entity('items');
export const orderSchema = new schema.Entity('order', { items: orderItemSchema });
