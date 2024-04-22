/* eslint-disable no-console */
import 'dotenv/config';

import Knex from 'knex';
import createUsers from './users';
import createProducts from './products';
import createOrders from './orders';

const knex = Knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
});

(async () => {
  console.log('Creating users...');
  const userIds = await createUsers(knex);
  console.log('Creating products...');
  const productIds = await createProducts(knex);
  console.log('Creating orders...');
  const orderIds = await createOrders(knex, userIds, productIds);
  await knex.destroy();
})();
