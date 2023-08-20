import React, { useEffect, useState } from 'react';
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
import { getGoogleConfig } from '../configs';
import { defaultCallbacks, onSignIn } from '../services/authorityService';
import useEssentials from '../hooks/useEssentials';

type Props = {
  render: (props: { onClick: () => void; disabled?: boolean; isLoading: boolean }) => JSX.Element;
};

const GoogleButton: React.FC<Props> = ({ render }: Props) => {
  const { router, authManager, apollo } = useEssentials();
  const [isLoading, setIsLoading] = useState(false);
  const [googleClientId, setGoogleClientId] = useState(null as string | null);

  // Dont generate google button during SSG.
  useEffect(() => {
    if (!googleClientId) {
      setGoogleClientId(getGoogleConfig().clientId);
    }
  }, [googleClientId, setGoogleClientId]);

  if (!googleClientId) {
    return null;
  }

  return (
    <GoogleLogin
      clientId={googleClientId}
      render={(props) => render({ isLoading, ...props })}
      onRequest={() => {
        setIsLoading(true);
      }}
      onSuccess={async (response) => {
        const result = await authManager.googleLogin({ idToken: (response as GoogleLoginResponse).tokenId }, defaultCallbacks(router));
        if (result.ok) {
          await onSignIn(router, apollo);
        } else {
          console.error('Error while logging in.', result);
        }
        setIsLoading(false);
      }}
      onFailure={(err) => {
        console.error(err);
        setIsLoading(false);
      }}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleButton;
