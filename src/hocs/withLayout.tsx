import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'react-native-elements';

import { client } from '../services/graphql';

/** @TODO Move this to {index.tsx} */
export const withLayout = <P extends object>(Wrapped: React.ComponentType<P>): React.FC<P> => {
  const WithLayout = (props: P) => {
    return (
      <ThemeProvider>
        <ApolloProvider client={client}>
          <Wrapped {...props} />
        </ApolloProvider>
      </ThemeProvider>
    );
  };

  return WithLayout;
};
