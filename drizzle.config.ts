import { defineConfig } from "drizzle-kit";
import { config } from "./src/config/env";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
    out: "./src/db/migrations",
    dbCredentials: {
      url: config.DATABASE_URL!
  }
});
