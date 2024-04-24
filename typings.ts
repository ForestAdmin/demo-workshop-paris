/* eslint-disable */
import {
  CollectionCustomizer,
  TAggregation,
  TConditionTree,
  TPaginatedFilter,
  TPartialRow,
  TSortClause
} from '@forestadmin/agent';

export type OrderProductsCustomizer = CollectionCustomizer<Schema, 'order_products'>;
export type OrderProductsRecord = TPartialRow<Schema, 'order_products'>;
export type OrderProductsConditionTree = TConditionTree<Schema, 'order_products'>;
export type OrderProductsFilter = TPaginatedFilter<Schema, 'order_products'>;
export type OrderProductsSortClause = TSortClause<Schema, 'order_products'>;
export type OrderProductsAggregation = TAggregation<Schema, 'order_products'>;

export type OrdersCustomizer = CollectionCustomizer<Schema, 'orders'>;
export type OrdersRecord = TPartialRow<Schema, 'orders'>;
export type OrdersConditionTree = TConditionTree<Schema, 'orders'>;
export type OrdersFilter = TPaginatedFilter<Schema, 'orders'>;
export type OrdersSortClause = TSortClause<Schema, 'orders'>;
export type OrdersAggregation = TAggregation<Schema, 'orders'>;

export type ProductsCustomizer = CollectionCustomizer<Schema, 'products'>;
export type ProductsRecord = TPartialRow<Schema, 'products'>;
export type ProductsConditionTree = TConditionTree<Schema, 'products'>;
export type ProductsFilter = TPaginatedFilter<Schema, 'products'>;
export type ProductsSortClause = TSortClause<Schema, 'products'>;
export type ProductsAggregation = TAggregation<Schema, 'products'>;

export type UsersCustomizer = CollectionCustomizer<Schema, 'users'>;
export type UsersRecord = TPartialRow<Schema, 'users'>;
export type UsersConditionTree = TConditionTree<Schema, 'users'>;
export type UsersFilter = TPaginatedFilter<Schema, 'users'>;
export type UsersSortClause = TSortClause<Schema, 'users'>;
export type UsersAggregation = TAggregation<Schema, 'users'>;

export type ApiPostCustomizer = CollectionCustomizer<Schema, 'api_post'>;
export type ApiPostRecord = TPartialRow<Schema, 'api_post'>;
export type ApiPostConditionTree = TConditionTree<Schema, 'api_post'>;
export type ApiPostFilter = TPaginatedFilter<Schema, 'api_post'>;
export type ApiPostSortClause = TSortClause<Schema, 'api_post'>;
export type ApiPostAggregation = TAggregation<Schema, 'api_post'>;

export type ApiCommentCustomizer = CollectionCustomizer<Schema, 'api_comment'>;
export type ApiCommentRecord = TPartialRow<Schema, 'api_comment'>;
export type ApiCommentConditionTree = TConditionTree<Schema, 'api_comment'>;
export type ApiCommentFilter = TPaginatedFilter<Schema, 'api_comment'>;
export type ApiCommentSortClause = TSortClause<Schema, 'api_comment'>;
export type ApiCommentAggregation = TAggregation<Schema, 'api_comment'>;


export type Schema = {
  'api_comment': {
    plain: {
      'body': string | null;
      'email': string | null;
      'id': number;
      'name': string | null;
      'postId': number | null;
    };
    nested: {};
    flat: {};
  };
  'api_post': {
    plain: {
      'body': string | null;
      'id': number;
      'title': string | null;
      'userId': number | null;
    };
    nested: {};
    flat: {};
  };
  'order_products': {
    plain: {
      'id': number;
      'order_id': number;
      'product_id': number;
      'product@@@added_date': string | null;
      'product@@@category': string | null;
      'product@@@created_at': string | null;
      'product@@@description': string | null;
      'product@@@id': number | null;
      'product@@@is_active': boolean | null;
      'product@@@name': string | null;
      'product@@@price': number | null;
      'product@@@product_image': string | null;
      'product@@@stock': number | null;
      'product@@@updated_at': string | null;
      'quantity': number;
    };
    nested: {
      'order': Schema['orders']['plain'] & Schema['orders']['nested'];
      'product': Schema['products']['plain'] & Schema['products']['nested'];
    };
    flat: {
      'order:coupon': string | null;
      'order:created_at': string | null;
      'order:id': number;
      'order:order_date': string;
      'order:status': 'cancelled' | 'delivered' | 'pending' | 'shipped' | null;
      'order:summary': string | null;
      'order:total_price': number | null;
      'order:updated_at': string | null;
      'order:user_id': number;
      'product:added_date': string | null;
      'product:category': string | null;
      'product:created_at': string | null;
      'product:description': string | null;
      'product:id': number;
      'product:is_active': boolean | null;
      'product:name': string;
      'product:price': number;
      'product:product_image': string | null;
      'product:stock': number;
      'product:updated_at': string | null;
      'order:user:birthdate': string | null;
      'order:user:cellphone': string | null;
      'order:user:created_at': string | null;
      'order:user:email': string;
      'order:user:firstname': string | null;
      'order:user:fullname': string | null;
      'order:user:id': number;
      'order:user:identity_picture': string | null;
      'order:user:is_blocked': boolean | null;
      'order:user:lastname': string | null;
      'order:user:password': string;
      'order:user:signup_date': string | null;
      'order:user:updated_at': string | null;
    };
  };
  'orders': {
    plain: {
      'coupon': string | null;
      'created_at': string | null;
      'id': number;
      'order_date': string;
      'status': 'cancelled' | 'delivered' | 'pending' | 'shipped' | null;
      'summary': string | null;
      'total_price': number | null;
      'updated_at': string | null;
      'user_id': number;
    };
    nested: {
      'user': Schema['users']['plain'] & Schema['users']['nested'];
    };
    flat: {
      'user:birthdate': string | null;
      'user:cellphone': string | null;
      'user:created_at': string | null;
      'user:email': string;
      'user:firstname': string | null;
      'user:fullname': string | null;
      'user:id': number;
      'user:identity_picture': string | null;
      'user:is_blocked': boolean | null;
      'user:lastname': string | null;
      'user:password': string;
      'user:signup_date': string | null;
      'user:updated_at': string | null;
    };
  };
  'products': {
    plain: {
      'added_date': string | null;
      'category': string | null;
      'created_at': string | null;
      'description': string | null;
      'id': number;
      'is_active': boolean | null;
      'name': string;
      'price': number;
      'product_image': string | null;
      'stock': number;
      'updated_at': string | null;
    };
    nested: {};
    flat: {};
  };
  'users': {
    plain: {
      'birthdate': string | null;
      'cellphone': string | null;
      'created_at': string | null;
      'email': string;
      'firstname': string | null;
      'fullname': string | null;
      'id': number;
      'identity_picture': string | null;
      'is_blocked': boolean | null;
      'lastname': string | null;
      'password': string;
      'signup_date': string | null;
      'updated_at': string | null;
    };
    nested: {};
    flat: {};
  };
};
