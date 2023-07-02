import { Prisma } from "@prisma/client";
import { Controller, Inject } from "@tsed/di";
import { Authenticate } from "@tsed/passport";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Delete, Get, Post, Put, Summary } from "@tsed/schema";
import { CategoriesService } from "src/services/Category";

@Controller("/categories")
export class CategoriesController {
  @Inject()
  service: CategoriesService;

  @Get("/")
  @Summary("Return all categories")
  @Authenticate("jwt")
  async getAllCategories() {
    return this.service.findMany();
  }

  @Get("/:id")
  @Summary("Return a category by id")
  @Authenticate("jwt")
  async getCategoryById(@PathParams("id") id: string) {
    return this.service.findById(id);
  }

  @Post("/")
  @Summary("Create a new category")
  @Authenticate("jwt")
  async createCategory(@BodyParams() data: Prisma.CategoryCreateInput) {
    return this.service.createCategory(data);
  }

  @Put("/:id")
  @Summary("Update a category")
  @Authenticate("jwt")
  async updateCategory(@PathParams("id") id: string, @BodyParams() data: Prisma.CategoryUpdateInput) {
    return this.service.updateCategory(id, data);
  }

  @Delete("/:id")
  @Summary("Remove a category")
  @Authenticate("jwt")
  async removeCategory(@PathParams("id") id: string) {
    return this.service.deleteCategory(id);
  }
}
