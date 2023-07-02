import { Prisma } from "@prisma/client";

export type CategoryCreate = Omit<Prisma.CategoryCreateInput, "id" | "createdAt" | "updatedAt" | "products">;
