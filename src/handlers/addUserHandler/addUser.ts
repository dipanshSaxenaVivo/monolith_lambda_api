import { users } from "@prisma/client";
import { IDatabaseClient } from "models/interface";


export const addUser = async(user:users,Prisma:IDatabaseClient)=>{
  let result = Prisma.users.create({
    data:{
      email: user.email && user.email,
      name: user.name && user.name,
      role: user.role,
      phoneNumber: user.phoneNumber && user.phoneNumber,
    }
  })

  return result
}