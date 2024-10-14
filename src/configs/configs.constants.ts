import { config } from 'dotenv';
config();

export const databaseConfig = {
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  synchronize: process.env.DB_SYNCHRONIZE,
  autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES,
};

export const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
};

export const discordConfig = {
  webhookUrl: process.env.DISCORD_WEBHOOK_URL,
};

export const gmailConfig = {
  user: process.env.GMAIL_USER,
  password: process.env.GMAIL_PASS,
  host: process.env.GMAIL_HOST,
  port: process.env.GMAIL_PORT,
  tls: process.env.GMAIL_TLS,
  authTimeout: process.env.GMAIL_AUTH_TIMEOUT,
};

export const appConfig = {
  port: process.env.APP_PORT,
  apiPrefix: process.env.API_PREFIX,
};

export const bcryptConfig = {
  saltRound: parseInt(process.env.BCRYPT_SALT_ROUNDS),
};

export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
  refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
};

export const redisConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  ttl: process.env.REDIS_TTL,
};

export const otpConfig = {
  length: process.env.OTP_LENGTH,
  expiresIn: process.env.OTP_EXPIRES_IN,
};

export const bullConfig = {
  name: process.env.BULL_NAME,
  host: process.env.BULL_HOST,
  port: process.env.PORT_BULL,
  password: process.env.BULL_PASSWORD,
};
