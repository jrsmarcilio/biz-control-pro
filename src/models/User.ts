import { UserModel } from "@tsed/prisma";
import { Property, Required } from "@tsed/schema";
import { UserType } from "src/interfaces/User";

export class User extends UserModel implements UserType {
  @Property()
  @Required(false)
  token?: string;
}
