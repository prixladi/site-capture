import React from 'react';
import { Box, Container, Grid, Heading, Icon, Text as ChakraText } from '@chakra-ui/react';
import Text from '../Text';
import EmailInput from '../EmailInput';
import PasswordInput from '../PasswordInput';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import { FaEnvelope } from 'react-icons/fa';
import { defaultCallbacks, onSignIn } from '../../services/authorityService';
import { CenterLink, GButton, Page } from './Shared';
import { StatusCodes } from 'http-status-codes';
import useEssentials from '../../hooks/useEssentials';

type Values = {
  email: string;
  password: string;
};

type Props = {
  goto: (newPage: Page) => void;
};

const emailErrorMessage = 'Invalid email or password';

const Login: React.FC<Props> = ({ goto }: Props) => {
  const { handleSubmit, register, errors, setError, setValue, formState } = useForm<Values>();
  const { router, authManager, apollo } = useEssentials();

  const onSubmit = async (values: Values) => {
    const result = await authManager.passwordLogin(values, defaultCallbacks(router));
    if (result.ok) {
      await onSignIn(router, apollo);
    } else {
      if (result.status === StatusCodes.BAD_REQUEST) {
        setError('email', { message: emailErrorMessage });
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
          Login
        </Heading>
        <Text>Sign in to use advanced features.</Text>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid gridGap="1em">
          <EmailInput errorMessage={errors.email?.message} register={register} />
          <PasswordInput errorMessage={errors.password?.message} register={register} />
          <CenterLink onClick={() => goto('ForgottenPassword')}>Don{"'"}t remember your password?</CenterLink>
          <Button submit minW="100%" isLoading={formState.isSubmitting}>
            Sign in with Email
            <Icon ml="0.2em" as={FaEnvelope} />
          </Button>
          <ChakraText textAlign="center" opacity="0.6">
            or
          </ChakraText>

          <GButton isSubmitting={formState.isSubmitting} />
          <CenterLink onClick={() => goto('Register')}>Create new account.</CenterLink>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
