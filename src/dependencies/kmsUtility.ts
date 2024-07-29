import { IDependencyContainer, ICryptography } from "models/interface";
import { KMS as KMSClient, DecryptRequest, DecryptCommand, EncryptCommand } from "@aws-sdk/client-kms";
console.log('kms utility')

let kmsModule = new KMSClient();

/**
 * Decrypts the given cipherText using KMS.
 *
 * @param {string} CipherText - The base64-encoded ciphertext to decrypt.
 *
 * @returns {Promise<string | undefined>} A Promise resolving to the decrypted plaintext.
 *
 * @throws {Error} If decryption fails.
 */
const decrypt = async (CipherText: string): Promise<string | undefined> => {
  const params: DecryptRequest = {
    CiphertextBlob: Buffer.from(CipherText, 'base64'),
    EncryptionContext: {
      LambdaFunctionName: process.env.AWS_LAMBDA_FUNCTION_NAME || "",
    },
  };
  console.log(params, 'encoded')
  try {
    let decrypted;
    let decryptCommand = new DecryptCommand(params)
    const data = await kmsModule.send(decryptCommand)
    console.log(data, decryptCommand, 'kms decrypt utility')
    decrypted = data.Plaintext && Buffer.from(data.Plaintext).toString();
    console.log("Decrypted Key:", decrypted);
    return decrypted;
  } catch (error) {
    console.error("Error decrypting key:", error);
    throw new Error("Error decrypting key:", { cause: error });
  }
};
var DB_KMS_KEY_ID: string | undefined
if (process.env.DB_KMS_KEY_ID_ENC) {
  var DB_KMS_KEY_ID = await decrypt(process.env.DB_KMS_KEY_ID_ENC);
}

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
let encrypt = async (
  data: string,
  keyId?: string
): Promise<string | undefined> => {
  const params = {
    KeyId: keyId || (DB_KMS_KEY_ID ?? ""),
    Plaintext: Buffer.from(data),
    EncryptionContext: {
      LambdaFunctionName: process.env.AWS_LAMBDA_FUNCTION_NAME || "",
    },
  };
  console.log(params, 'encoded values');
  try {
    let encryptCommand = new EncryptCommand(params)
    const result = await kmsModule.send(encryptCommand);
    console.log(data, result, 'kms encrypt utility')
    let encrypted = Buffer.from(result?.CiphertextBlob as any).toString('base64')
    console.log(encrypted)
    return encrypted
  } catch (error) {
    throw new Error("Error encrypting:", { cause: error });
  }
};

/**
 * Retrieves an encrypted environment variable and decrypts it.
 *
 * @param {string} ENV_NAME - The name of the environment variable to retrieve.
 *
 * @returns {Promise<string | undefined>} The decrypted value of the environment variable or undefined.
 *
 * @throws {Error} If the environment variable is not found.
 */
const get_encrypted_environment_variable = (
  ENV_NAME: string
): Promise<string | undefined> => {
  let encryptedBase64Text = process.env[ENV_NAME];
  if (!encryptedBase64Text) {
    throw new Error(`Environment Variable ${ENV_NAME} not found.`);
  } else {
    return decrypt(encryptedBase64Text);
  }
};

const KMS: ICryptography = {
  decrypt,
  encrypt,
  get_encrypted_environment_variable,
};

/**
 * applies KMS dependency to the given dependency container
 *
 * @param {Omit<IDependencyContainer, 'KMS'>} DC
 * @returns {IDependencyContainer}
 */
export const apply_kms = (
  DC: Omit<IDependencyContainer, "KMS">
): IDependencyContainer => {
  console.log("apply kms called");
  return { ...DC, Cryptography: KMS };
};
