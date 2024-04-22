/* eslint-disable */
import {
  CollectionCustomizer,
  TAggregation,
  TConditionTree,
  TPaginatedFilter,
  TPartialRow,
  TSortClause
} from '@forestadmin/agent';

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
      'body': string;
      'email': string;
      'id': number;
      'name': string;
      'postId': number;
    };
    nested: {};
    flat: {};
  };
  'api_post': {
    plain: {
      'body': string;
      'id': number;
      'title': string;
      'userId': number;
    };
    nested: {};
    flat: {};
  };
  'orders': {
    plain: {
      'created_at': string;
      'id': number;
      'order_date': string;
      'status': string;
      'updated_at': string;
      'user_id': number;
    };
    nested: {
      'user': Schema['users']['plain'] & Schema['users']['nested'];
    };
    flat: {
      'user:birthdate': string;
      'user:cellphone': string;
      'user:created_at': string;
      'user:email': string;
      'user:firstname': string;
      'user:fullname': string;
      'user:id': number;
      'user:identity_picture': string;
      'user:is_blocked': boolean;
      'user:lastname': string;
      'user:password': string;
      'user:signup_date': string;
      'user:updated_at': string;
    };
  };
  'products': {
    plain: {
      'added_date': string;
      'category': string;
      'created_at': string;
      'description': string;
      'id': number;
      'is_active': boolean;
      'name': string;
      'price': number;
      'product_image': string;
      'stock': number;
      'updated_at': string;
    };
    nested: {};
    flat: {};
  };
  'users': {
    plain: {
      'birthdate': string;
      'cellphone': string;
      'created_at': string;
      'email': string;
      'firstname': string;
      'fullname': string;
      'id': number;
      'identity_picture': string;
      'is_blocked': boolean;
      'lastname': string;
      'password': string;
      'signup_date': string;
      'updated_at': string;
    };
    nested: {};
    flat: {};
  };
};
