import { CollectionCustomizer } from '@forestadmin/agent';

import { Schema } from '../typings';

export default (users: CollectionCustomizer<Schema, 'users'>) => {
  users
    .addField('fullname', {
      columnType: 'String',
      dependencies: ['firstname', 'lastname'],
      getValues: records => records.map(record => `${record.firstname} ${record.lastname}`),
    })
    .replaceFieldOperator('fullname', 'Contains', value => ({
      aggregator: 'Or',
      conditions: [
        {
          field: 'firstname',
          operator: 'Contains',
          value,
        },
        {
          field: 'lastname',
          operator: 'Contains',
          value,
        },
      ],
    }))
    .removeField('firstname')
    .removeField('lastname')
    .replaceFieldWriting('fullname', value => {
      const [firstname, lastname] = value.split(' ');
      return {
        firstname,
        lastname,
      };
    })
    .replaceFieldSorting('fullname', [
      { field: 'firstname', ascending: true },
      { field: 'lastname', ascending: true },
    ])
    .addAction('Anonymize user', {
      scope: 'Bulk',
      execute: async (context, resultBuilder) => {
        try {
          const records = await context.getRecords(['id']);
          const userIds = records.map(record => record.id);
          await context.collection.update(
            {
              conditionTree: {
                field: 'id',
                operator: 'In',
                value: userIds,
              },
            },
            {
              firstname: 'Anonymous',
              lastname: 'Anonymous',
              email: 'anonymous@anonymous.anonymous',
              identity_picture: null,
              cellphone: 'Unknown',
              password: '',
              is_blocked: true,
              signup_date: null,
            },
          );
          return resultBuilder.success('User(s) anonymized!');
        } catch (error) {
          return resultBuilder.error(`Failed to anonymize user(s) ${error.message}.`);
        }
      },
    })
    .addHook('After', 'Create', async context => {
      if (context.records[0]) console.info(`Sending an email at ${context.records[0]?.email}`);
      else context.throwValidationError('User is missing email address');
    })
    .addOneToManyRelation('posts', 'api_post', {
      originKey: 'userId',
      originKeyTarget: 'id',
    });
};
