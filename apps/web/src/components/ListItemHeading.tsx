import React from 'react';
import { Heading } from '@chakra-ui/react';

type Props = {
  name: string;
  onClick: () => unknown | Promise<unknown>;
};

const trimName = (name: string): string => {
  if (name.length < 20) {
    return name;
  }

  return `${name.substring(0, 17)}...`;
};

const ListItemHeading: React.FC<Props> = ({ onClick, name }: Props) => (
  <Heading onClick={onClick} fontSize="1.9em" cursor="pointer" as="h2">
    {trimName(name)}
  </Heading>
);

export default ListItemHeading;
