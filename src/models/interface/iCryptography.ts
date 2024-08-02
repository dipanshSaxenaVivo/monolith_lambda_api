export interface ICryptography {
  /**
 * Decrypts the given cipherText using KMS.
 *
 * @param {string} CipherText - The base64-encoded ciphertext to decrypt.
 * 
 * @returns {Promise<string | undefined>} A Promise resolving to the decrypted plaintext.
 * 
 * @throws {Error} If decryption fails.
 */
  decrypt: (CipherText: string) => Promise<string | undefined>,
  /**
 * Encrypts the given data using KMS.
 *
 * @param {string} data - The data to be encrypted.
 * 
 * @param {string} [keyId] - Optional KMS key ID. 
 * If not provided, `DB_KMS_KEY_ID` environment variable will be used.
 * 
 * @returns {Promise<string | undefined>} A Promise resolving to the base64-encoded encrypted data.
 * 
 * @throws {Error} If encryption fails or required parameters are missing.
 */
  encrypt: (PlainTexts: string, kmsKeyId?: string) => Promise<string | undefined>,
  /**
 * Retrieves an encrypted environment variable and decrypts it.
 *
 * @param {string} ENV_NAME - The name of the environment variable to retrieve.
 * 
 * @returns {Promise<string | undefined>} The decrypted value of the environment variable or undefined.
 * 
 * @throws {Error} If the environment variable is not found.
 */
  getEnvironmentVariable: (ENV_NAME: string) => Promise<string | undefined>
}
