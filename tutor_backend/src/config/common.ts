import env from '../utility/env';

import { CommonInterface } from './configTypes';

const common: CommonInterface = {
  secret: env('SECRET', 'ANJPV4070F'),
  privateKey: "key/private.key",
  publicKey: "key/public.key",
  jwtValidity: env('JWT_VALIDITY', '1h'),
  jwtIssuer: env('JWT_ISSUER', 'Recruit'),
};

export default common;
