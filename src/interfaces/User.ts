import { Prisma } from "@prisma/client";

export type Credentials = {
  email: string;
  password: string;
};

export type UserCreate = Omit<Prisma.UserCreateInput, "id" | "createdAt" | "updatedAt">;

export type UserType = {
  id: string;
  email: string;
  password: string;
  token?: string;
};