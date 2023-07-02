import { Prisma } from "@prisma/client";
import { Controller, Inject } from "@tsed/di";
import { Authenticate } from "@tsed/passport";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Delete, Get, Post, Put, Summary } from "@tsed/schema";
import { ProductsService } from "src/services/Product";

@Controller("/products")
export class ProductsController {
  @Inject()
  service: ProductsService;

  @Get("/")
  @Summary("Return all products")
  @Authenticate("jwt")
  async getAllProducts() {
    return await this.service.findMany();
  }

  @Get("/:id")
  @Summary("Return a product by id")
  @Authenticate("jwt")
  async getProductById(@PathParams("id") id: string) {
    return await this.service.findById(id);
  }

  @Post("/")
  @Summary("Create a new product")
  @Authenticate("jwt")
  async createProduct(@BodyParams() data: Prisma.ProductCreateInput) {
    return await this.service.createProduct(data);
  }

  @Put("/:id")
  @Summary("Update a product")
  @Authenticate("jwt")
  async updateProduct(@PathParams("id") id: string, @BodyParams() data: Prisma.ProductUpdateInput) {
    return await this.service.updateProduct(id, data);
  }

  @Delete("/:id")
  @Summary("Remove a product")
  @Authenticate("jwt")
  async removeProduct(@PathParams("id") id: string) {
    return await this.service.deleteProduct(id);
  }
}
