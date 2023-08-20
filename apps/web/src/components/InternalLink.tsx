import React from 'react';
import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';

type Props = {
  href: string;
  children: React.ReactNode;
};

const InternalLink: React.FC<Props> = ({ href, children }: Props) => (
  <NextLink href={href}>
    <Link color="red.500">{children}</Link>
  </NextLink>
);

export default InternalLink;
