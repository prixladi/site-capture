import { Flex, Icon, Button, Tag, Grid, Box, Heading, Divider, HStack } from '@chakra-ui/react';
import React from 'react';
import { NarrowContent } from '../../components/Content';
import Text from '../../components/Text';
import { useMeQuery } from '../../graphql';
import withAuthentication from '../../hoc/withAuthentication';
import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { NewTemplateRoute, TemplateRoute } from '../../routes';
import DefaultSkeleton from '../../components/DefaultSkeleton';
import useApolloErrorHandling from '../../hooks/useApolloErrorHandling';
import ListItemHeading from '../../components/ListItemHeading';

const Templates: React.FC = () => {
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
          Your Templates
        </Heading>
        <Text>List of your predefined site templates. Click on concerete template to show detail or edit.</Text>
      </Box>
      <Grid gridGap="1em">
        <Button onClick={() => router.push(NewTemplateRoute)} minW="8em" fontSize="1.3em" colorScheme="yellow">
          Add new template <Icon ml="0.2em" as={FaPlus} />
        </Button>
        <Divider />
        {data.me.templates.map((template) => (
          <Grid key={template.id} gridGap="0.5em">
            <HStack gridGap="0.5em">
              <ListItemHeading onClick={() => router.push(TemplateRoute(template.id))} name={template.name} />
              <Flex gridGap="0.5em">
                <Tag fontSize="0.8em" colorScheme="blue">
                  {template.viewports.length} Viewports
                </Tag>
              </Flex>
            </HStack>
            <Divider mt="1em" />
          </Grid>
        ))}
      </Grid>
    </NarrowContent>
  );
};

// This is here for Fast refresh to work as intended
// https://github.com/vercel/next.js/issues/13024
const AuthenticatedPage = withAuthentication(Templates, DefaultSkeleton);
const TemplatesPage: React.FC = () => <AuthenticatedPage />;

export default TemplatesPage;
