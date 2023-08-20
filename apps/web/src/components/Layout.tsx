import React from 'react';
import { Box, Container, Grid } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Navigation from './Navigation';
import Footer from './Footer';
import useCompactLayout from '../hooks/useCompactLayout';

const Layout: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const isCompact = useCompactLayout();
  const navSize = ['100%', '42.5em', '53em', '63em'];

  return (
    <Box position="relative" minH="100vh">
      <Grid pb={['4em', '5em', '6em', '6em']} gridGap="1em" templateColumns={['1fr', '1fr', '1fr', '3fr 1fr']}>
        {isCompact && (
          <Container maxW={navSize} marginTop={['1.5em']}>
            <Navigation />
          </Container>
        )}

        <Container maxW="100%" marginTop={['1em', '1em', '1em', '3em']}>
          <Component {...pageProps} />
        </Container>

        {!isCompact && (
          <Container maxW={navSize} marginTop={['2.5em']}>
            <Navigation />
          </Container>
        )}
      </Grid>

      <Box position="absolute" w="100%" h={['3em', '3em', '4em', '4em']} bottom="0">
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
