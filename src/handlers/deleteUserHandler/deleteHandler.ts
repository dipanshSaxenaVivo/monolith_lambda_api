import { IDatabaseClient } from "models/interface";
import { IdValidateModel } from "schema/idValidateSchema";

export const deleteUser = (userID: IdValidateModel, Prisma: IDatabaseClient) => {
  const result = Prisma.users.delete({
    where: {
      id: userID.id
    }
  })

  return result
}