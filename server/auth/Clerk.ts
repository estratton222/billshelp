import { Clerk } from "@clerk/nextjs/api";

if (typeof process.env.CLERK_API_KEY === "undefined") {
  throw "You forgot to set CLERK_API_KEY correctly as an environment variable!";
}

export const ClerkInstance = new Clerk({ apiKey: process.env.CLERK_API_KEY });
