import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import useApollo from '../apollo/useApollo';
import Layout from '../components/Layout';
import { useAuthority } from '../authority';
import { getAuthApiConfig } from '../configs';
import { AuthorityProvider } from '../authority';

const App: React.FC<AppProps> = (props: AppProps): JSX.Element => {
  const manager = useAuthority(getAuthApiConfig);
  const apollo = useApollo(manager, props.pageProps.initialApolloState);

  return (
    <>
      <Head>
        <title>Site Capture</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="/config.js"></script>
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        <AuthorityProvider manager={manager}>
          <ApolloProvider client={apollo.apolloClient}>
            <Layout {...props} />
          </ApolloProvider>
        </AuthorityProvider>
      </ChakraProvider>
    </>
  );
};

export default App;
