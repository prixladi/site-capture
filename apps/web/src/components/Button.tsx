import React, { ButtonHTMLAttributes } from 'react';
import { Button, ButtonOptions, Flex, LayoutProps } from '@chakra-ui/react';

type Props = ButtonOptions &
  LayoutProps &
  ButtonHTMLAttributes<unknown> & {
    submit?: boolean;
    children: React.ReactNode;
  };

const SubmitButton: React.FC<Props> = ({ children, submit, ...rest }: Props) => (
  <Flex justifyContent="center">
    <Button minW="8em" fontSize="1.3em" type={submit ? 'submit' : undefined} colorScheme="yellow" {...rest}>
      {children}
    </Button>
  </Flex>
);

export default SubmitButton;
