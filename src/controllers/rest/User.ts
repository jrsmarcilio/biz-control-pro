import { BodyParams, Controller, Get, Post, Req } from "@tsed/common";
import { Authenticate } from "@tsed/passport";
import { Returns, Security, Summary } from "@tsed/schema";
import { Credentials, UserCreate } from "src/interfaces/User";
import { User } from "src/models/User";

@Controller("/auth")
export class UsersController {
  @Post("/login")
  @Authenticate("login")
  @Returns(200, User)
  @Summary("User login")
  login(@Req("user") user: User, @BodyParams() credentials: Credentials) {
    // FACADE
    return { ...user, };
  }

  @Post("/signup")
  @Returns(201, User)
  @Authenticate("signup")
  @Summary("User signup")
  signup(@Req() request: Req, @BodyParams() user: UserCreate) {
    // FACADE
    return request.user
  }

  @Get("/userinfo")
  @Authenticate("jwt")
  @Security("jwt")
  @Returns(200, User)
  @Summary("Get user info")
  getUserInfo(@Req() request: Req): any {
    // FACADE
    return request.user;
  }

  @Get("/logout")
  @Summary("User logout")
  logout(@Req() request: Req) {
    request.logout({ keepSessionInfo: true }, () => {});
  }
}
