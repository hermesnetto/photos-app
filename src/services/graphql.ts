import ApolloClient from 'apollo-boost';

import { getToken } from '../services/auth';
import { TEST_URL } from '../constants';

export const client = new ApolloClient({
  uri: `${TEST_URL}/graphql`,

  request: async operation => {
    const token = await getToken();

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },

  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  },
});
