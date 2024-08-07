import { ICryptography } from "./iCryptography";
import { IDatabaseClient } from "./iDatabaseClient";
import { ILogger } from "./iLogger";
import { IEnvironmentVariables } from "./iEnvironmentVariables";

/**
 * Interface for the dependency container providing core services such as
 * logging, cryptography, and database access etc.
 *
 * @interface IDependencyContainer
 * @property {ILogger} logger - Logging service.
 * @property {ICryptography} cryptography - Cryptographic operations service.
 * @property {IDatabaseClient} db_client - Database client.
 * @property {IEnvironmentVariables} environmentVariables - all environment variables
 */
export interface IDependencyContainer {
  logger: ILogger;
  cryptography: ICryptography;
  db_client: IDatabaseClient;
  environmentVariables: IEnvironmentVariables
}
