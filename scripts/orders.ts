import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate from './utils';

export const ORDER_STATUS = ['pending', 'shipped', 'delivered', 'cancelled'];

export default async function populateOrders(client: Knex, userIds: number[]): Promise<number[]> {
  const tableName = 'orders';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);
  await client.raw(`DROP TYPE IF EXISTS order_status_enum`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users').notNullable();
    table.enum('status', ORDER_STATUS, { enumName: 'order_status_enum', useNative: true });
    table.date('order_date').notNullable();
    table.date('created_at');
    table.date('updated_at');
    table.integer('coupon');
  });

  return populate(client, tableName, 1000, () => ({
    user_id: faker.helpers.arrayElement(userIds),
    status: faker.helpers.arrayElement(ORDER_STATUS),
    order_date: faker.date.recent({ days: 90 }), // Orders placed within the last 90 days
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  }));
}
