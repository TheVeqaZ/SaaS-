import { gql } from 'graphql-tag';

export const typeDefs = gql`
  scalar JSON

  type Query {
    hello: String
    m365Usage: JSON
  }
`;
