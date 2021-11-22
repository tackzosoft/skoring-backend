import config from "../config";
import crypto from "crypto";
import { nanoid, customAlphabet } from "nanoid/non-secure";
import session from "../utility/session";

/**
 * generates random string
 * @param type
 */
export const generateRandom = function (type: string) {
  switch (type) {
    case 'user_id': return `user_${customAlphabet('1234567890abcdef', 12)()}`;
    case 'class_id': return `class_${customAlphabet('1234567890abcdef', 12)()}`;
    case 'req_id': return `req_${customAlphabet('1234567890abcdef', 12)()}`;
    case 'chp_id': return `chp_${customAlphabet('1234567890abcdef', 12)()}`;
    case 'attendence_id': return `attendence_${customAlphabet('1234567890abcdef', 12)()}`;
    case 'assigment_id': return `assigment_${customAlphabet('1234567890abcdef', 12)()}`;
    case 'assigment_question_id': return `assgn_qstn_${customAlphabet('1234567890abcdef', 12)()}`;
    case 'assigment_option_id': return `assgn_opt_${customAlphabet('1234567890abcdef', 12)()}`;
    case 'assigment_answer_id': return `assgn_ans_${customAlphabet('1234567890abcdef', 12)()}`;
    case 'topic_id': return `topic_${customAlphabet('1234567890abcdef', 12)()}`;
    case 'unique_code': return customAlphabet('123456', 6)();
    case 'salt': return customAlphabet('1234567890abcdef', 12)();
    case 'otp': {
      if (config.api.check.isOTPBypassEnabled) return "1010";
      return Math.floor(Math.random() * 8888 + 1111).toString();
    }
    case 'user_activation': return nanoid();
    case 'resetpassword_key': return nanoid();

    default: return nanoid();
  }
}

/**
 * generates hash from a string using salt
 * @param text
 * @param salt
 */
export const generateHash = function (text: string, salt: string): string {
  return crypto.createHmac('sha256', salt).update(text).digest('hex');
}


/**
 * generates token for authorized user
 * @param text
 * @param salt
 */
export const generateToken = function (userData: any): string {
  return session.set({
    user_id: userData.data.user_id,
    email: userData.data.email,
    mobile_no: userData.data.mobile_no || null,
  });
}


/**
 * authorize userdata using provided payload
 * @param userData
 * @param userIdData
 * @param payload
 */
export const authorize = function (userData: any, payload: any): boolean {
  return ((userData.data.email === payload.email) && userData.data.password === generateHash(payload.password, userData.data.password_salt))
}

export const change_password_authrize = function (userData: any, userIdData: any, payload: any): boolean {
  return ((userData.data.email || userData.data.email === payload.email) && userIdData.data.password === generateHash(payload.old_password, userIdData.data.password_salt))
}


