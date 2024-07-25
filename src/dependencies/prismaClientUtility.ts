import * as Prisma from "@prisma/client";
import { IDependencyContainer } from "models/interface";
console.log("prisma utility");

/**
 * applies database dependency to the given dependency container
 *
 * @param {Omit<IDependencyContainer, 'db_client'>} DC
 * @returns {IDependencyContainer}
 */
export const apply_prisma = async (
  DC: Omit<IDependencyContainer, "db_client">
): Promise<IDependencyContainer> => {

  /**
   * we store our connection string in environment variable of lambda and we encrypt it via a kms key,
   * so, we would have to decrypt our connection string before using it.
   */
  let decrypted_env_string = await DC.KMS.get_encrypted_environment_variable(
    "MONGO_DB_URI"
  );

  /**
   * instantiates prisma client with the decrypted mongodb connection string
   */
  let prisma = new Prisma.PrismaClient({
    datasourceUrl: decrypted_env_string,
  });

  console.log("prisma client instantiated");
  return { ...DC, db_client: prisma };
};
