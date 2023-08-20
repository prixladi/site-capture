import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

type Props = {
  onClick: () => void | Promise<void>;
};

const PlusButton: React.FC<Props> = ({ onClick }: Props) => (
  <IconButton
    onClick={onClick}
    background="transparent"
    _hover={{ background: 'transparent' }}
    aria-label="add-button"
    as={FaPlus}
    fontSize="2em"
    color="green.500"
  />
);

export default PlusButton;
