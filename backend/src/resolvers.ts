import GraphQLJSON from 'graphql-type-json';
import { fetchM365Usage } from './services/m365';

export const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    hello: () => 'Hello World',
    m365Usage: async () => fetchM365Usage(),
  },
};
