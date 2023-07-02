import { Req } from "@tsed/common";
import { Inject, Injectable } from "@tsed/di";
import { Unauthorized } from "@tsed/exceptions";
import { Arg, OnInstall, OnVerify, Protocol } from "@tsed/passport";
import { Strategy } from "passport";
import { BasicStrategy } from "passport-http";
import { UsersService } from "../services/User";
import { checkEmail } from "../utils/checkEmail";

@Protocol({
  name: "basic",
  useStrategy: BasicStrategy,
  settings: {}
})
@Injectable()
export class BasicProtocol implements OnVerify, OnInstall {

  @Inject()
  usersService: UsersService

  async $onVerify(@Req() request: Req, @Arg(0) email: string, @Arg(1) password: string) {
    checkEmail(email);

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new Unauthorized("User not found");
    }

    if (!this.usersService.verifyPassword(password, email)) {
      throw new Unauthorized("Wrong password");
    }

    return user;
  }

  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
  }
}
