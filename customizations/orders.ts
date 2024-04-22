import { CollectionCustomizer } from '@forestadmin/agent';

import { Schema } from '../typings';

export default (orders: CollectionCustomizer<Schema, 'orders'>) => {
  orders.addField('total_price', {
    columnType: 'Number',
    dependencies: ['id'],
    getValues: async (records, context) => {
      const orderIds = records.map(r => r.id);

      const orderProducts = await context.dataSource
        .getCollection('order_products')
        .list({ conditionTree: { field: 'order_id', operator: 'In', value: orderIds } }, [
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
  });
};
