import { Skeleton } from '@chakra-ui/react';
import React from 'react';

const DefaultSkeleton: React.FC = () => (
  <>
    <Skeleton heigth="1px" width="5px" />
    <Skeleton heigth="1px" width="5em" />
    <Skeleton heigth="1px" width="5em" />
    <Skeleton heigth="1em" width="5em" />
  </>
);

export default DefaultSkeleton;
