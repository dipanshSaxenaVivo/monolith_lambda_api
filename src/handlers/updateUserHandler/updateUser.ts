import { IUpdateUserHandlerRequest } from "models/HandlerSpecificTypes";
import { IDatabaseClient } from "models/interface";

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
