import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate from './utils';

export default async function populateOrders(
  client: Knex,
  userIds: number[],
  productIds: number[],
): Promise<number[]> {
  const tableName = 'orders';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users').notNullable();
    table.integer('product_id').references('id').inTable('products').notNullable();
    table.integer('quantity').notNullable();
    table.float('total_price').notNullable();
    table.string('status');
    table.date('order_date').notNullable();
  });

  return populate(client, tableName, 10000, () => ({
    user_id: faker.helpers.arrayElement(userIds),
    product_id: faker.helpers.arrayElement(productIds),
    quantity: faker.number.int({ min: 1, max: 10 }),
    total_price: faker.number.float({ min: 20, max: 2000 }), // Prices between $20 and $2000
    status: faker.helpers.arrayElement(['pending', 'shipped', 'delivered', 'cancelled']),
    order_date: faker.date.recent({ days: 90 }), // Orders placed within the last 90 days
  }));
}
