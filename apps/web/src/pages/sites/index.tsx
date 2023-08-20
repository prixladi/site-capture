import { Flex, Icon, Button, Tag, Grid, Box, Text as ChakraText, Heading, Divider } from '@chakra-ui/react';
import React from 'react';
import { NarrowContent } from '../../components/Content';
import Text from '../../components/Text';
import { useMeQuery } from '../../graphql';
import withAuthentication from '../../hoc/withAuthentication';
import { FaPlus } from 'react-icons/fa';
import ExternalLink from '../../components/ExternalLink';
import { useRouter } from 'next/router';
import { NewSiteRoute, SiteRoute } from '../../routes';
import DefaultSkeleton from '../../components/DefaultSkeleton';
import useApolloErrorHandling from '../../hooks/useApolloErrorHandling';
import ListItemHeading from '../../components/ListItemHeading';

const trimUrl = (url: string): string => {
  if (url.length < 50) {
    return url;
  }

  return `${url.substring(0, 47)}...`;
};

const Sites: React.FC = () => {
  const { data, error } = useMeQuery();

  const router = useRouter();
  useApolloErrorHandling(error);

  if (!data) {
    return <DefaultSkeleton />;
  }

  return (
    <NarrowContent>
      <Box mb="2em">
        <Heading as="h1" mb="0.5em">
          Your Sites
        </Heading>
        <Text>List of your predefined sites. Click on concerete template to show detail, edit or run capturing.</Text>
      </Box>
      <Grid gridGap="1em">
        <Button onClick={() => router.push(NewSiteRoute)} minW="8em" fontSize="1.3em" colorScheme="yellow">
          Add new site <Icon ml="0.2em" as={FaPlus} />
        </Button>
        <Divider />
        {data.me.sites.map((site) => (
          <Grid key={site.id} gridGap="0.5em">
            <ListItemHeading onClick={() => router.push(SiteRoute(site.id))} name={site.name} />
            <Flex gridGap="0.5em">
              <Tag fontSize="0.8em" colorScheme="blue">
                {site.viewports.length} Viewports
              </Tag>
              <Tag fontSize="0.8em" colorScheme="yellow">
                {site.subsites.length} Subsites
              </Tag>
            </Flex>
            <ChakraText fontSize="1.2em" opacity="0.7" key={site.id}>
              <ExternalLink href={site.url}>{trimUrl(site.url)}</ExternalLink>
            </ChakraText>
            <Divider mt="1em" />
          </Grid>
        ))}
      </Grid>
    </NarrowContent>
  );
};

// This is here for Fast refresh to work as intended
// https://github.com/vercel/next.js/issues/13024
const AuthenticatedPage = withAuthentication(Sites, DefaultSkeleton);
const SitesPage: React.FC = () => <AuthenticatedPage />;

export default SitesPage;
