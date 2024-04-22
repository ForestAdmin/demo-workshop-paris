import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate from './utils';

export default async function populateProducts(client: Knex): Promise<number[]> {
  const tableName = 'products';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description');
    table.float('price').notNullable();
    table.integer('stock').notNullable();
    table.string('category');
    table.boolean('is_active');
    table.date('added_date');
    table.string('product_image');
  });

  return populate(client, tableName, 1000, () => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    stock: faker.number.int({ min: 0, max: 1000 }),
    category: faker.commerce.department(),
    is_active: faker.datatype.boolean(),
    added_date: faker.date.recent(),
    product_image: faker.image.urlLoremFlickr({ category: 'product' }),
  }));
}
