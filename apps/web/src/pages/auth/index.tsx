import React, { useState } from 'react';
import { Collapse } from '@chakra-ui/react';
import Login from '../../components/auth/Login';
import Register from '../../components/auth/Register';
import { Page } from '../../components/auth/Shared';
import ForgottenPassword from '../../components/auth/ForgottenPassword';
import { NarrowContent } from '../../components/Content';

const Auth: React.FC = () => {
  const [page, setPage] = useState('Login' as Page);
  const goto = (newPage: Page) => setPage(newPage);

  return (
    <>
      <NarrowContent>
        <Collapse animateOpacity in={page === 'Login'}>
          <Login goto={goto} />
        </Collapse>
        <Collapse animateOpacity in={page === 'Register'}>
          <Register goto={goto} />
        </Collapse>
        <Collapse animateOpacity in={page === 'ForgottenPassword'}>
          <ForgottenPassword goto={goto} />
        </Collapse>
      </NarrowContent>
    </>
  );
};

export default Auth;
