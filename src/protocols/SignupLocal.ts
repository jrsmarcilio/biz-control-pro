import { BodyParams, Req } from "@tsed/common";
import { Inject, Injectable } from "@tsed/di";
import { Forbidden } from "@tsed/exceptions";
import { OnInstall, OnVerify, Protocol } from "@tsed/passport";
import { Strategy } from "passport-local";
import { UserCreate } from "src/interfaces/User";
import { UsersService } from "../services/User";

@Protocol({
  name: "signup",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password"
  }
})
@Injectable()
export class SignupLocalProtocol implements OnVerify, OnInstall {
  
  @Inject()
  usersService: UsersService

  async $onVerify(@Req() request: Req, @BodyParams() user: UserCreate) {
    const {email} = user;
    const found = await this.usersService.findByEmail(email);

    if (found) {
      throw new Forbidden("Email is already registered");
    }

    return this.usersService.create({ data: user });
  }

  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
  }
}
