import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";

@Controller("/health")
export class HealthCheckController {
  @Get("/")
  get() {
    return {
      status: "ok",
      version: "1.0.0",
      uptime: process.uptime(),
      started: new Date(Date.now() - process.uptime() * 1000),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timestamp: Date.now(),
      node_version: process.version,
      platform: process.platform,
      arch: process.arch,
      cpu: process.cpuUsage(),
      memory: process.memoryUsage(),
      pid: process.pid,
    };
  }
}
