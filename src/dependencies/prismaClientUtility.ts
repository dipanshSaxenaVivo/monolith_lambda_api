import * as Prisma from "@prisma/client";
import { IDependencyContainer } from "models/interface";
console.log("prisma utility");

/**
 * applies database dependency to the given dependency container.
 * we store our connection string in environment variable of lambda and we encrypt it via a kms key,
 * so, we would have to decrypt our connection string before using it and then pass it in apply database
 * function to connect to db.
 *
 * @param {Omit<IDependencyContainer, 'db_client'>} DC
 * @param {String} decrypted_env_string
 * @returns {IDependencyContainer}
 */
export const apply_prisma = (
  DC: Omit<IDependencyContainer, "db_client">,
  decrypted_env_string: string
): IDependencyContainer => {
  /**
   * instantiates prisma client with the decrypted mongodb connection string
   */
  let prisma = new Prisma.PrismaClient({
    datasourceUrl: decrypted_env_string,
  });

  console.log("prisma client instantiated");
  return { ...DC, db_client: prisma };
};
