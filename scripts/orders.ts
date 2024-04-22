import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate from './utils';

export default async function populateOrders(client: Knex, userIds: number[]): Promise<number[]> {
  const tableName = 'orders';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users').notNullable();
    table.string('status');
    table.date('order_date').notNullable();
    table.date('created_at');
    table.date('updated_at');
  });

  return populate(client, tableName, 10000, () => ({
    user_id: faker.helpers.arrayElement(userIds),
    status: faker.helpers.arrayElement(['pending', 'shipped', 'delivered', 'cancelled']),
    order_date: faker.date.recent({ days: 90 }), // Orders placed within the last 90 days
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  }));
}
