import { betterAuth } from 'better-auth';
import { Pool } from 'pg';

const databaseUrl = process.env.DATABASE_URL;
export const auth = betterAuth({
  ...(databaseUrl ? { database: new Pool({ connectionString: databaseUrl }) } : {}),
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  secret: process.env.BETTER_AUTH_SECRET || 'local-development-secret-change-me-please-32',
  emailAndPassword: { enabled: true, minPasswordLength: 8 },
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? { google: { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET } } : {}),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET ? { github: { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET } } : {})
  }
});
