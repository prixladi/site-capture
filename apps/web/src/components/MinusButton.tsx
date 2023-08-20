import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { FaMinus } from 'react-icons/fa';

type Props = {
  onClick: () => void | Promise<void>;
};

const MinusButton: React.FC<Props> = ({ onClick }: Props) => (
  <IconButton
    onClick={onClick}
    background="transparent"
    _hover={{ background: 'transparent' }}
    aria-label="remove-button"
    as={FaMinus}
    fontSize="2em"
    color="red.500"
  />
);

export default MinusButton;
