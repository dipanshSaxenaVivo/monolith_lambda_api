import { IDeleteUserHandlerRequest } from "models/HandlerSpecificTypes";
import { IDatabaseClient } from "models/interface";

/**
 * Deletes a user from the database.
 *
 * This function removes a user record from the database based on the provided user ID.
 *
 * @param {IDeleteUserHandlerRequest} userID - The request object containing the identifier of the user to be deleted.
 * @param {IDatabaseClient} Prisma - The database client instance for interacting with the database.
 * @returns {Promise<any>} A promise that resolves to the result of the deletion operation.
 */
export const deleteUser = async (userID: IDeleteUserHandlerRequest, Prisma: IDatabaseClient) => {
  const result = await Prisma.users.delete({
    where: {
      id: userID.id
    }
  })

  return result
}