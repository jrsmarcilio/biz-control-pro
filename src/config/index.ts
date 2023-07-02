import { readFileSync } from "fs";
import { envs } from "./envs";
import loggerConfig from "./logger";
import multerConfig from "./multer";
import sessionConfig from "./passport";

const pkg = JSON.parse(readFileSync("./package.json", {encoding: "utf8"}));

export const config: Partial<TsED.Configuration> = {
  version: pkg.version,
  envs,
  logger: loggerConfig,
  multer: multerConfig,
  // additional shared configuration
};

export { sessionConfig };
