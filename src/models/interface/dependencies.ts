import { ICryptography } from "./ICryptography"
import { IDatabaseClient } from "./iDatabaseClient"
import { ILogger } from "./iLogger"

export interface IDependencyContainer {
  logger: ILogger,
  KMS: ICryptography,
  db_client: IDatabaseClient
}