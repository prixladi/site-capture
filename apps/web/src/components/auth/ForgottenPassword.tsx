import React from 'react';
import { Box, Container, Grid, Heading, Icon } from '@chakra-ui/react';
import Text from '../Text';
import EmailInput from '../EmailInput';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import { FaLockOpen } from 'react-icons/fa';
import { useAuthorityManager } from '../../authority';
import { useRouter } from 'next/dist/client/router';
import { defaultCallbacks } from '../../services/authorityService';
import { CenterLink, Page } from './Shared';
import { forgottenPasswordSentNotification } from '../../services/notificationService';

type Values = {
  email: string;
};

type Props = {
  goto: (newPage: Page) => void;
};

const ForgottenPassword: React.FC<Props> = ({ goto }: Props) => {
  const { handleSubmit, register, errors, formState } = useForm<Values>();
  const router = useRouter();
  const manager = useAuthorityManager();

  const onSubmit = async (values: Values) => {
    const result = await manager.sendForgottenPassword(values.email, defaultCallbacks(router));
    if (result.ok) {
      forgottenPasswordSentNotification();
      goto('Login');
    }
  };

  return (
    <Container>
      <Box mb="2em">
        <Heading as="h1" mb="0.5em">
          Forgotten password
        </Heading>
        <Text>Enter your email to send reset action to.</Text>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid gridGap="1em">
          <EmailInput errorMessage={errors.email?.message} register={register} />
          <Button submit minW="100%" isLoading={formState.isSubmitting}>
            Send forgotten password
            <Icon ml="0.2em" as={FaLockOpen} />
          </Button>
          <CenterLink onClick={() => goto('Login')}>Remembered?</CenterLink>
        </Grid>
      </form>
    </Container>
  );
};

export default ForgottenPassword;
