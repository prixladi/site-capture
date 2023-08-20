import React, { useEffect } from 'react';
import { Heading } from '@chakra-ui/react';
import Text from '../components/Text';
import { HomeRoute } from '../routes';
import InternalLink from '../components/InternalLink';
import { NarrowContent } from '../components/Content';
import { notFoundNotification } from '../services/notificationService';

const NotFound: React.FC = () => {
  useEffect(() => {
    notFoundNotification();
  }, []);

  return (
    <NarrowContent>
      <Heading mt="3em" as="h1" textAlign="center">
        Page not found
      </Heading>
      <Text textAlign="center">
        Requested page was not found, <InternalLink href={HomeRoute}>back to the home page?</InternalLink>
      </Text>
    </NarrowContent>
  );
};

export default NotFound;
