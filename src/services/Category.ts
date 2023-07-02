import { Prisma } from "@prisma/client";
import { Service } from "@tsed/common";
import { CategoriesRepository } from "@tsed/prisma";

@Service()
export class CategoriesService extends CategoriesRepository {
  async findById(id: string) {
    return this.findUnique({ where: { id } });
  }

  async findByName(name: string) {
    return this.findFirst({ where: { name } });
  }

  async findAll(filters?: Prisma.CategoryWhereInput) {
    return this.findMany({ where: filters });
  }

  async createCategory(data: Prisma.CategoryCreateInput) {
    return this.create({ data });
  }

  async updateCategory(id: string, data: Prisma.CategoryUpdateInput) {
    return this.update({ where: { id }, data });
  }

  async deleteCategory(id: string) {
    return this.delete({ where: { id } });
  }
}
