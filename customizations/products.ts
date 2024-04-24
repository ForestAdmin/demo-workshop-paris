import { CollectionCustomizer } from '@forestadmin/agent';

import { Schema } from '../typings';

export default (products: CollectionCustomizer<Schema, 'products'>) => {
  return products.overrideDelete(async context => {
    return context.collection.update(context.filter, { is_active: false });
  });
};
