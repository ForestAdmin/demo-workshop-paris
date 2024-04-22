/* eslint-disable no-console */
import 'dotenv/config';

import Knex from 'knex';
import createUsers from './users';
import createProducts from './products';
import createOrders from './orders';
import createOrderProducts from './order-products';

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
  const orderIds = await createOrders(knex, userIds);
  console.log('Creating order products...');
  await createOrderProducts(knex, orderIds, productIds);
  await knex.destroy();
})();
