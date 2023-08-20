import React from 'react';
import { Icon, Link, Text } from '@chakra-ui/react';
import Button from '../Button';
import { FaGoogle } from 'react-icons/fa';
import GoogleButton from '../GoogleButton';

type GButtonProps = {
  isSubmitting: boolean;
};

type Page = 'Login' | 'Register' | 'ForgottenPassword';

const GButton: React.FC<GButtonProps> = ({ isSubmitting }: GButtonProps) => (
  <GoogleButton
    render={({ disabled, isLoading, onClick }) => (
      <Button onClick={onClick} isDisabled={disabled} minW="100%" isLoading={isLoading || isSubmitting}>
        Sign in with Google
        <Icon ml="0.2em" as={FaGoogle} />
      </Button>
    )}
  />
);

type CenterLinkProps = {
  onClick: () => void;
  children: React.ReactNode;
};

const CenterLink: React.FC<CenterLinkProps> = ({ children, onClick }: CenterLinkProps) => (
  <Text textAlign="center" opacity="0.7">
    <Link onClick={onClick} color="red.500">
      {children}
    </Link>
  </Text>
);

export type { Page };
export { GButton, CenterLink };
