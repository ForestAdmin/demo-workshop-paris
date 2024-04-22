import { CollectionCustomizer } from '@forestadmin/agent';

import { Schema } from '../typings';

export default (products: CollectionCustomizer<Schema, 'products'>) => {
  return products;
};
