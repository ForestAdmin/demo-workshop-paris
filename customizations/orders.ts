import { CollectionCustomizer } from '@forestadmin/agent';

import { Schema } from '../typings';

export default (orders: CollectionCustomizer<Schema, 'orders'>) => {
  orders
    .addField('total_price', {
      columnType: 'Number',
      dependencies: ['id'],
      getValues: async (records, context) => {
        const orderIds = records.map(r => r.id);

        const orderProducts = await context.dataSource
          .getCollection('order_products')
          .list({ conditionTree: { field: 'order_id', operator: 'In', value: orderIds } }, [
            'order_id',
            'quantity',
            'product:price',
          ]);

        return orderIds.map(id => {
          const ops = orderProducts.filter(o => o.order_id === id);
          return ops.reduce((acc, o) => {
            acc += o.quantity * o.product.price;
            return acc;
          }, 0);
        });
      },
    })
    .addField('summary', {
      columnType: 'String',
      dependencies: ['id', 'order_date', 'status', 'total_price', 'user:fullname'],
      getValues: (records, context) => {
        return Promise.all(
          records.map(async record => {
            const products = await context.dataSource.getCollection('order_products').list(
              {
                conditionTree: {
                  field: 'order:id',
                  operator: 'Equal',
                  value: record.id,
                },
              },
              ['product_id', 'product:name', 'product:product_image'],
            );
            console.log(products);
            return `
            <style>
              body {
                font-family: 'Roboto', sans-serif;
                background-color: #f5f5f5;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
              }
              .order {
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                padding: 20px;
                margin-bottom: 20px;
              }
              .order h3 {
                color: #333;
                margin: 0 0 10px 0;
              }
              .order p {
                color: #666;
                margin: 0;
              }
              .order p:not(:last-child) {
                margin-bottom: 5px;
              }
              .product-list {
                display: flex;
                flex-wrap: wrap;
                margin: 10px 0 0 0;
              }
              .product-item {
                flex: 0 0 33.333%;
                max-width: 33.333%;
                padding: 10px;
                box-sizing: border-box;
                text-align: center;
              }
              .product-item img {
                max-width: 100%;
                height: auto;
              }
          </style>
          <div class="order">
            <h3>Order ID: ${record.id}</h3>
            <p>Order Date: ${record.order_date}</p>
            <p>Status: ${record.status}</p>
            <p>Total Price: ${record.total_price}$</p>
            <p>User: ${record.user.fullname}</p>
            <div class="product-list">
              ${products
                .map(
                  p => `
                <div class="product-item">
                  <p>${p.product.name}</p>
                  <img src="${p.product.product_image}" alt="${p.product.name}">
                </div>
              `,
                )
                .join('')}
            </div>
          </div>
          `;
          }),
        );
      },
    });
};
