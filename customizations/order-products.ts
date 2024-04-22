import { CollectionCustomizer } from '@forestadmin/agent';
import { flattenRelation } from '@forestadmin/plugin-flattener';
import { Schema } from '../typings';

export default (orderProducts: CollectionCustomizer<Schema, 'order_products'>) => {
  return orderProducts.use(flattenRelation, {
    relationName: 'product',
  });
};
