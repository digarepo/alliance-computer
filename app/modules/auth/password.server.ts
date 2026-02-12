/**
 * Password hashing and verification utilities for Alliance.
 * Uses Argon2id (the winner of the Password Hashing Competition)
 * for maximum resistance against GPU/ASIC cracking.
 */

import argon2 from 'argon2';

/**
 * Argon2 configuration.
 * - memoryCost: 64MB (2 ** 16)
 * - timeCost: 3 iterations
 * - parallelism: 1 (conservative for single-core or shared hosting environments)
 */
const ARGON_OPTIONS: argon2.Options = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1
};

/**
 * Generates a secure Argon2id hash from a plaintext password.
 * * @param password - The plaintext password to be hashed.
 * @returns {Promise<string>} A secure hash string containing the salt and parameters.
 */
export async function hashPassword(password: string): Promise<string> {
    return argon2.hash(password, ARGON_OPTIONS);
};

/**
 * Verifies a plaintext password against a stored Argon2 hash.
 * * @param hash - The stored Argon2 hash from the database.
 * @param password - The plaintext password to verify.
 * @returns {Promise<boolean>} True if the password is valid, false otherwise.
 */
export async function verifyPassword(
    hash: string,
    password: string
): Promise<boolean> {
    try {
        /**
         * argon2.verify automatically extracts the salt and parameters
         * from the hash string itself.
         */
        return await argon2.verify(hash, password);
    } catch (error) {
        // Log error in development if needed, but return false for security.
        return false;
    }
}
