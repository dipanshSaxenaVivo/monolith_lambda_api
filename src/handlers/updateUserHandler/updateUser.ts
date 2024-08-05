import { users } from "@prisma/client";
import { IDatabaseClient } from "models/interface";

export const updateUser = async (
  user:users,
  Prisma:IDatabaseClient
) => {
  let { id, ...restData } = user;
  const result = await Prisma.users.update({
    where: {
      id: id,
    },
    data: restData,
  });
  return result
}