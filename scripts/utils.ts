import { Knex } from 'knex';

export default async function populate(
  client: Knex,
  tableName: string,
  numberOfElements: number,
  elementBuilder: (i: number) => unknown,
): Promise<number[]> {
  const elements = [];

  for (let i = 0; i < numberOfElements; i += 1) {
    const element = elementBuilder(i);
    elements.push(element);
  }

  const results = await client.insert(elements).into(tableName).returning('id');

  return results.map(row => row.id.toString());
}
