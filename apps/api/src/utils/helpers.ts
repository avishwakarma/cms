import {hash, compare, genSalt} from 'bcrypt';

/**
 * generateSalt
 * 
 * @param factor number 
 */
export const generateSalt = (factor: number): Promise<string> => {
  return genSalt(factor);
}

/**
 * toHash
 * 
 * @param {*} pass 
 * 
 * password hashing
 */
export const toHash = async (pass: string): Promise<string> => {
  return hash(pass, 10);
};

/**
 * checkHash
 * 
 * @param {*} plain
 * @param {*} encrypted 
 * 
 * compare password hash with plain text
 */
export const checkHash = (plain: string, encrypted: string): Promise<boolean> => {
  return compare(plain, encrypted);
};