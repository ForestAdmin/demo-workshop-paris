import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate from './utils';

export default async (
  client: Knex,
  orderIds: number[],
  productIds: number[],
): Promise<number[]> => {
  const tableName = 'order_products';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.integer('order_id').references('id').inTable('orders').notNullable();
    table.integer('product_id').references('id').inTable('products').notNullable();
    table.integer('quantity').notNullable();
  });

  return populate(client, tableName, 10000, () => ({
    order_id: faker.helpers.arrayElement(orderIds),
    product_id: faker.helpers.arrayElement(productIds),
    quantity: faker.number.int({ min: 1, max: 10 }),
  }));
};
