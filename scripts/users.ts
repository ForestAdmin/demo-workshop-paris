import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate from './utils';

export default async function populateUsers(client: Knex): Promise<number[]> {
  const tableName = 'users';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.date('signup_date');
    table.string('lastname');
    table.string('firstname');
    table.string('identity_picture');
    table.date('birthdate');
    table.string('password').notNullable();
    table.string('cellphone');
    table.boolean('is_blocked');
    table.date('created_at');
    table.date('updated_at');
  });

  return populate(client, tableName, 100, () => ({
    identity_picture: faker.image.avatar(),
    email: faker.internet.email(),
    signup_date: faker.date.past(),
    lastname: faker.person.lastName(),
    firstname: faker.person.firstName(),
    birthdate: faker.date.past(),
    password: faker.internet.password(),
    cellphone: faker.phone.number(),
    is_blocked: faker.datatype.boolean(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  }));
}
