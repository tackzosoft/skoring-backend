import { sign, verify } from 'jsonwebtoken';
import { readFileSync } from 'fs';

import config from '../config';

const privateKey = readFileSync(config.common.privateKey, 'utf8');
const publicKey = readFileSync(config.common.publicKey, 'utf8');

import { ERROR_MESSAGES } from './constants';

// import logger from './logger';

class Session {
    constructor() {
    }

    get(token: string): any {
        try {
            const payload = verify(token, publicKey, {
                algorithms: ['RS256']
            });
            if (payload) return payload;
        } catch (err) {
            console.log(err);
            throw ({
                message: ERROR_MESSAGES.INVALID_TOKEN,
                name: 'Authorization Error'
            });
        }
    }

    set(user: any): string {
        try {
            const payload = {
                id: user.user_id,
                user_id: user.user_id,
                email: user.email,
                mobile_no: user.mobile_no,
                loginTime: Date.now(),
                generated_at: Date.now()
            }

            return sign(payload, privateKey, {
                algorithm: 'RS256',
                expiresIn: config.common.jwtValidity,
                issuer: config.common.jwtIssuer
            });
        } catch (err) {
            console.log(err)
            throw ({
                message: ERROR_MESSAGES.INVALID_TOKEN,
                name: 'Authorization Error'
            });
        }
    }
}

export default new Session();
