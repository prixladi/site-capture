import startTokenFetching from './tokenFetcher';
import { getConfig } from './tokenFetcher';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

type PayloadType = {
  iat: number;
  jti: string;
  name: string;
  username: string;
  email: string;
  grant: string;
  given_name: string;
  family_name: string;
  nbf: string;
  exp: string;
  iss: string;
  aud: string;
};

const createPublicKey = (infoKey: string) => `-----BEGIN PUBLIC KEY-----\n${infoKey}\n-----END PUBLIC KEY-----`;

const validateToken = (token: string): PayloadType | null => {
  const config = getConfig();
  if (!config) {
    throw new Error('Unable to retrieve token config.');
  }

  try {
    return jwt.verify(token, createPublicKey(config.publicKey), {
      issuer: config.issuer,
      audience: config.audience,
      algorithms: [config.signatureAlgorithm],
    }) as PayloadType;
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return null;
    }

    throw err;
  }
};

export { validateToken, startTokenFetching };
