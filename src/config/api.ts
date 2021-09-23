import env from '../utility/env';
import { APIInterface } from './configTypes';

const api: APIInterface = {
  version: env('API_VERSION', '1.0'),
  name: env('NAME', ' Coreyoo APIs'),
  host: env('API_HOST', '0.0.0.0'),
  port: env('API_PORT', '4444'),
  check: {
    isEmailEnabled: <boolean>env('IS_EMAIL_ENABLED', false),
    isOTPBypassEnabled: <boolean>env('IS_OTP_BYPASS_ENABLED', true)
  }
};

api.base = env('API_BASE', `//${api.host}:${api.port}`);

export default api;