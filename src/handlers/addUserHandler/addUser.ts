import { IAddUserHandlerRequest } from "models/HandlerSpecificTypes";
import { IDatabaseClient } from "models/interface";

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
