import { Prisma } from "@prisma/client";
import { Controller, Inject } from "@tsed/di";
import { Authenticate } from "@tsed/passport";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Delete, Get, Post, Put, Summary } from "@tsed/schema";
import { ItemsService } from "src/services/Item";

@Controller("/items")
export class ItemsController {
  @Inject()
  service: ItemsService;

  @Get("/")
  @Summary("Return all items")
  @Authenticate("jwt")
  async getAllItems() {
    return this.service.findMany();
  }

  @Get("/:id")
  @Summary("Return a item by id")
  @Authenticate("jwt")
  async getItemById(@PathParams("id") id: string) {
    return this.service.findById(id);
  }

  @Post("/")
  @Summary("Create a new item")
  @Authenticate("jwt")
  async createItem(@BodyParams() data: Prisma.ItemUncheckedCreateInput) {
    return this.service.createItem(data);
  }

  @Put("/:id")
  @Summary("Update a item")
  @Authenticate("jwt")
  async updateItem(@PathParams("id") id: string, @BodyParams() data: Prisma.ItemUncheckedUpdateInput) {
    return this.service.updateItem(id, data);
  }

  @Delete("/:id")
  @Summary("Remove a item")
  @Authenticate("jwt")
  async removeItem(@PathParams("id") id: string) {
    return this.service.deleteItem(id);
  }
}
