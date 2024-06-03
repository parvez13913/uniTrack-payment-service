import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVarsZodSchema = z.object({
  NODE_ENV: z.string(),
  PORT: z
    .string()
    .default('3000')
    .refine((val) => Number(val)),
  DATABASE_URL: z.string(),
  REDIS_URL: z.string(),
  JWT_SECRET: z.string(),
  STORE_ID: z.string(),
  STORE_PASSWORD: z.string(),
  SSL_PAYMENT_URL: z.string(),
  SSL_VALIDATION_URL: z.string(),
});

const envVars = envVarsZodSchema.parse(process.env);

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  db: {
    url: envVars.DATABASE_URL
  },
  redis: {
    url: envVars.REDIS_URL
  },
  jwt: {
    secret: envVars.JWT_SECRET
  },
  ssl:{
    storeId:envVars.STORE_ID,
    storePassword:envVars.STORE_PASSWORD,
    sslPaymentUrl:envVars.SSL_PAYMENT_URL,
    sslValidationUrl:envVars.SSL_VALIDATION_URL,
  }
};
