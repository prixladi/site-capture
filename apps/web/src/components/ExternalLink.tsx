import React from 'react';
import { Link } from '@chakra-ui/react';

type Props = {
  href: string;
  children: React.ReactNode;
};

const ExternalLink: React.FC<Props> = ({ href, children }: Props) => (
  <Link isExternal href={href} color="red.500">
    {children}
  </Link>
);

export default ExternalLink;
