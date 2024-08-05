import * as Prisma from "@prisma/client";
import * as PrismaType from "@prisma/client/runtime/library";

/**
 * Pre configured Database client instance.
 */
export interface IDatabaseClient
  extends Prisma.PrismaClient<{
    datasourceUrl: string;
}, never, PrismaType.DefaultArgs> { }
