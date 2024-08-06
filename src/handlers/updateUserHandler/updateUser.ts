import { IUpdateUserHandlerRequest } from "models/HandlerSpecificTypes";
import { IDatabaseClient } from "models/interface";

/**
 * Updates user information in the database.
 *
 * This function updates an existing user record in the database with the provided user data.
 *
 * @param {IUpdateUserHandlerRequest} user - The request object containing the user ID and the fields to be updated.
 * @param {IDatabaseClient} Prisma - The database client instance used to interact with the database.
 * @returns {Promise<any>} A promise that resolves to the result of the update operation, including the updated user data.
 */
export const updateUser = async (
  user: IUpdateUserHandlerRequest,
  Prisma: IDatabaseClient
) => {
  let { id, ...restData } = user;
  const result = await Prisma.users.update({
    where: {
      id: id,
    },
    data: {
      email: restData.email && restData.email,
      name: restData.name && restData.name,
      phoneNumber: restData?.phoneNumber && restData.phoneNumber,
      role: restData.role && restData.role,
    },
  });
  return result;
};
