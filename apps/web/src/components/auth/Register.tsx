import React from 'react';
import { Box, Container, Grid, Heading, Icon, Text as ChakraText } from '@chakra-ui/react';
import Text from '../Text';
import EmailInput from '../EmailInput';
import PasswordInput from '../PasswordInput';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import { FaUserAlt } from 'react-icons/fa';
import { defaultCallbacks, onSignIn } from '../../services/authorityService';
import { CenterLink, GButton, Page } from './Shared';
import { StatusCodes } from 'http-status-codes';
import { registeredNotification } from '../../services/notificationService';
import useEssentials from '../../hooks/useEssentials';

type Values = {
  email: string;
  password: string;
};

type Props = {
  goto: (newPage: Page) => void;
};

const emailErrorMessage = 'Account with this email already exist';

const Register: React.FC<Props> = ({ goto }: Props) => {
  const { handleSubmit, register, errors, setError, setValue, formState } = useForm<Values>();
  const { router, authManager, apollo } = useEssentials();

  const onSubmit = async (values: Values) => {
    const callbacks = defaultCallbacks(router);
    const result = await authManager.register(values, callbacks);
    if (result.ok) {
      registeredNotification();
      const loginResult = await authManager.passwordLogin(values, callbacks);
      if (loginResult.ok) {
        await onSignIn(router, apollo);
      } else {
        console.error(loginResult);
      }
    } else {
      if (result.status === StatusCodes.CONFLICT) {
        setError('email', { message: emailErrorMessage, type: 'Conflict' });
        setValue('password', '');
      } else {
        console.error('Error while logging in.', result);
      }
    }
  };

  return (
    <Container>
      <Box mb="2em">
        <Heading as="h1" mb="0.5em">
          Register
        </Heading>
        <Text>Sign up to use advanced features.</Text>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid gridGap="1em">
          <EmailInput errorMessage={errors.email?.message} register={register} />
          <PasswordInput errorMessage={errors.password?.message} register={register} />
          <ChakraText textAlign="center" opacity="0.7">
            By signing up, you agree to our terms of service and privacy policy.
          </ChakraText>
          <Button submit minW="100%" isLoading={formState.isSubmitting}>
            Register
            <Icon ml="0.2em" as={FaUserAlt} />
          </Button>

          <ChakraText textAlign="center" opacity="0.6">
            or
          </ChakraText>

          <GButton isSubmitting={formState.isSubmitting} />
          <CenterLink onClick={() => goto('Login')}>Already have an account?</CenterLink>
        </Grid>
      </form>
    </Container>
  );
};

export default Register;
