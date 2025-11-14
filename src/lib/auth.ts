import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { reactStartCookies } from "better-auth/react-start";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [reactStartCookies()],
  // If your application runs on a port other than 3000, you must add it to the trustedOrigins in your auth.ts configuration to avoid CORS errors during authentication requests.
  // trustedOrigins: ['http://localhost:3000'],
});