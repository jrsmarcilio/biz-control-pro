import { Logger, MulterOptions } from "@tsed/common";
import { join } from "path";

const logger = new Logger("MulterOptions");

const multerOptions = MulterOptions({
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB,
  },
  
  storage: {
    _handleFile: (req, file, cb) => {
      const mimetype = file.mimetype.split("/")[1];
      const path = file.path + "." + mimetype;
      logger.info(`File uploaded to ${path}`);
      cb(null, { path });
    },
    _removeFile: (req, file, cb) => {
      cb(null);
    },
  },
});

const multerConfig = {
  ...multerOptions,
  dest: join(process.cwd(), "uploads"), // process.cwd() returns the current working directory
};

export default multerConfig;
