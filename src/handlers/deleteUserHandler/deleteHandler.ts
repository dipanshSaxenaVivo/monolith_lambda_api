import { IDeleteUserHandlerRequest } from "models/HandlerSpecificTypes";
import { IDatabaseClient } from "models/interface";

export const deleteUser = async (userID: IDeleteUserHandlerRequest, Prisma: IDatabaseClient) => {
  const result = await Prisma.users.delete({
    where: {
      id: userID.id
    }
  })

  return result
}