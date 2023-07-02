import { BodyParams, Constant, Inject, Req } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import { OnInstall, OnVerify, Protocol } from "@tsed/passport";
import * as jwt from "jsonwebtoken";
import { IStrategyOptions, Strategy } from "passport-local";
import { Credentials } from "src/interfaces/User";
import { User } from "src/models/User";
import { UsersService } from "../services/User";
import { exclude } from "../utils/excludePassword";

@Protocol<IStrategyOptions>({
  name: "login",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password",
  },
})
export class LoginLocalProtocol implements OnVerify, OnInstall {
  @Inject()
  usersService: UsersService;

  @Constant("passport.protocols.jwt.settings")
  jwtSettings: any;

  async $onVerify(@Req() request: Req, @BodyParams() credentials: Credentials) {
    const { email, password } = credentials;

    const user = await this.usersService.findByEmail(email);
    console.log("🚀 ~ file: LoginLocal.ts:30 ~ user:", user)

    if (!user) {
      throw new Unauthorized("User not found");
    }

    if (user?.password !== password) {
      throw new Unauthorized("Wrong password");
    }

    const token = this.createJwtToken(user);

    const userOmitKeys = exclude(user, ["password", "createdAt", "updatedAt"]);

    return { ...userOmitKeys, token };
  }

  createJwtToken(user: User) {
    const { issuer, audience, secretOrKey, maxAge = 3600 } = this.jwtSettings;
    const now = Date.now();

    return jwt.sign(
      {
        iss: issuer,
        aud: audience,
        sub: user.id,
        exp: now + maxAge * 1000, // 1 hours
        iat: now,
      },
      secretOrKey
    );
  }

  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
  }
}
