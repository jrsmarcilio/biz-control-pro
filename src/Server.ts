import "@tsed/ajv";
import { PlatformApplication } from "@tsed/common";
import { Configuration, Inject } from "@tsed/di";
import "@tsed/passport";
import "@tsed/platform-express"; // /!\ keep this import
import session from "express-session";
import passport from "passport";
import { join } from "path";
import { config, sessionConfig } from "./config/index";
import * as rest from "./controllers/rest/index";
import { User } from "./models/User";
import "./protocols";

const rootDir = process.cwd();

@Configuration({
  rootDir,
  ...config,
  acceptMimes: ["application/json", "multipart/form-data"],
  httpPort: process.env.PORT ?? 8083,
  httpsPort: false, // CHANGE
  disableComponentsScan: false,
  mount: {
    "/rest": [...Object.values(rest)],
  },
  middlewares: [
    "cors",
    "cookie-parser",
    "compression",
    "method-override",
    "json-parser",
    { use: "urlencoded-parser", options: { extended: true } },
  ],
  views: {
    root: join(rootDir, "views"),
    extensions: {
      ejs: "ejs",
    },
  },
  exclude: ["**/*.spec.ts"],
  passport: {
    userInfoModel: User,
  },
  componentsScan: [
    `${rootDir}/src/services/**/*.ts`,
    `${rootDir}/src/protocols/**/*.ts`
  ],
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;

  $beforeRoutesInit(): void | Promise<any> {
    this.app
      .use(passport.initialize())
      .use(session(sessionConfig));
  }
}
