import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z.string().url(),
  API_URL: z.string().url(),
  
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRE: z.string().default('24h'),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_REFRESH_EXPIRE: z.string().default('7d'),
  
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  SMTP_FROM: z.string(),
  
  FRONTEND_URL: z.string().url(),
  FRONTEND_PROD_URL: z.string().url(),
  
  TELEGRAM_CHAT_ID: z.string(),
  TELEGRAM_BOT_RECHARGE: z.string(),
  TELEGRAM_BOT_WITHDRAWAL: z.string(),
  
  MIN_INVESTMENT: z.coerce.number().default(100),
  MAX_INVESTMENT: z.coerce.number().default(200),
  DAILY_RETURN_RATE: z.coerce.number().default(0.0005),
  REFERRAL_BONUS: z.coerce.number().default(1),
  MIN_REFERRALS_FOR_WITHDRAWAL: z.coerce.number().default(20),
  MIN_INVESTMENT_AGE_DAYS: z.coerce.number().default(30),
  
  ARGON2_ITERATIONS: z.coerce.number().default(3),
  ARGON2_MEMORY: z.coerce.number().default(65540),
  ARGON2_PARALLELISM: z.coerce.number().default(4),
  
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
});

type EnvConfig = z.infer<typeof envSchema>;

let config: EnvConfig;

try {
  config = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('❌ Environment validation failed:');
    error.errors.forEach(err => {
      console.error(`  ${err.path.join('.')}: ${err.message}`);
    });
  }
  process.exit(1);
}

export { config };
