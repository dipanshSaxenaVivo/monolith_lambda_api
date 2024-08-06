import { IAddUserHandlerRequest } from "models/HandlerSpecificTypes";
import { IDatabaseClient } from "models/interface";

/**
 * Adds a new user to the database.
 *
 * This function creates a new user record in the database using the provided user details.
 *
 * @param {IAddUserHandlerRequest} user - The user details for the new user to be added.
 * @param {IDatabaseClient} Prisma - The database client instance for interacting with the database.
 * @returns {Promise<any>} A promise that resolves to the newly created user record.
 */
export const addUser = async (
  user: IAddUserHandlerRequest,
  Prisma: IDatabaseClient
) => {
  let result = await Prisma.users.create({
    data: {
      email: user.email && user.email,
      name: user.name && user.name,
      role: user.role,
      phoneNumber: user.phoneNumber && user.phoneNumber,
    },
  });

  return result;
};
