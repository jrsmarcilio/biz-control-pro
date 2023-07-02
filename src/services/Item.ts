import { Prisma } from "@prisma/client";
import { Service } from "@tsed/common";
import { ItemsRepository } from "@tsed/prisma";

@Service()
export class ItemsService extends ItemsRepository {
  async findById(id: string) {
    return this.findUnique({ where: { id } });
  }

  async findAll(filters?: Prisma.ItemWhereInput) {
    return this.findMany({ where: filters });
  }

  async createItem(data: Prisma.ItemUncheckedCreateInput) {
    return this.create({ data });
  }

  async updateItem(id: string, data: Prisma.ItemUncheckedUpdateInput) {
    return this.update({ where: { id }, data });
  }

  async deleteItem(id: string) {
    return this.delete({ where: { id } });
  }
}
