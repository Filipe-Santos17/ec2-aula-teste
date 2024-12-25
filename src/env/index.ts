import { config } from "dotenv";
import { z } from "zod";

if (process.env.NODE_ENV === "test") {
  config({ path: '.env.test' })
} else {
  config()
}

const zodSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DB_USER: z.string(),
  //PATH_PRODUCTION: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().default(5432),
  DB_CLIENT: z.enum(["mysql","pg", "sqlite3"]),
  DB_NAMEDB: z.string(),
  PORT: z.coerce.number().default(3003),
  PRIVATE_SECRET: z.string(),
})

const _env = zodSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data