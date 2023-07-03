import { Inject, Req } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import { Arg, OnVerify, Protocol } from "@tsed/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { exclude } from "src/utils/excludePassword";
import { UsersService } from "../services/User";

@Protocol({
  name: "jwt",
  useStrategy: Strategy,
  settings: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET ?? "secret",
    issuer: "localhost",
    audience: "localhost",
  },
})
export class JwtProtocol implements OnVerify {
  @Inject()
  usersService: UsersService;

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: any) {
    const user = await this.usersService.findById(jwtPayload.sub);

    if (!user) {
      throw new Unauthorized("Invalid token");
    }

    req.user = exclude(user, ["password", "createdAt", "updatedAt"]);

    return req.user;
  }
}
