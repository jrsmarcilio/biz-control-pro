import { Prisma } from "@prisma/client";
import { Service } from "@tsed/common";
import { ProductsRepository } from "@tsed/prisma";

@Service()
export class ProductsService extends ProductsRepository {
  async findById(id: string) {
    return await this.findUnique({ where: { id } });
  }

  async findByName(name: string) {
    return await this.findFirst({ where: { name } });
  }

  async findAll(filters?: Prisma.ProductWhereInput) {
    return await this.findMany({ where: filters });
  }

  async createProduct(data: Prisma.ProductCreateInput) {
    return await this.create({ data });
  }

  async updateProduct(id: string, data: Prisma.ProductUpdateInput) {
    return await this.update({ where: { id }, data });
  }

  async deleteProduct(id: string) {
    return await this.delete({ where: { id } });
  }
}
