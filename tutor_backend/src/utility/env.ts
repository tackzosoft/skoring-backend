/**
 * env
 * 
 * utility for .env file
 */

/**
 * readFileSync
 * 
 * method readFileSync from defaukt node module fs
 */
import {readFileSync} from 'fs';

/**
 * join
 * 
 * method join from default node module path
 */
import {join} from 'path';

/**
 * parse
 * 
 * method parse from dotenv module
 * @url https://www.npmjs.com/package/dotenv
 */
import {parse} from 'dotenv';

/**
 * all
 * 
 * parsed .env file content into object
 */
const all = parse(readFileSync(join(process.cwd(), '.env')));

/**
 * env
 * 
 * method to retrive value from .env file
 * @param {string} key 
 * @param {string} d 
 */
const env: Function = (key: string, d: string = ""): string => {
  if(all[key]) return all[key];
  return d;
};
export default env;
