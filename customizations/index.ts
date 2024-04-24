import { DataSourceCustomizer } from '@forestadmin/agent';
import users from './users';
import orders from './orders';
import products from './products';
import orderProducts from './order-products';
import createTypicode from './typicode-datasource';

export default {
  users,
  products,
  orders,
  orderProducts,
  removeTimestampPlugin: (dataSourceCustomizer: DataSourceCustomizer) => {
    dataSourceCustomizer.collections.forEach(currentCollection => {
      if (currentCollection.schema.fields.created_at) {
        currentCollection.removeField('created_at');
      }

      if (currentCollection.schema.fields.updated_at) {
        currentCollection.removeField('updated_at');
      }
    });
  },
  createTypicodeDataSource: createTypicode,
};
