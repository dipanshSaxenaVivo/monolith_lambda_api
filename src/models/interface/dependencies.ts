import { ICryptography } from "./iCryptography"
import { IDatabaseClient } from "./iDatabaseClient"
import { ILogger } from "./iLogger"

export interface IDependencyContainer {
  logger: ILogger,
  Cryptography: ICryptography,
  db_client: IDatabaseClient
}