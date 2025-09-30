import { PrismaClient } from "$/generated/prisma";

const prismaCLientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaCLientSingleton>;
} & typeof global;

const db = globalThis.prismaGlobal ?? prismaCLientSingleton();

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;
