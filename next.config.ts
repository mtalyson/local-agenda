import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "better-auth",
  ],
  turbopack: {
    ignoreIssue: [
      // Better Auth's kysely-adapter imports SQLite dialect modules that
      // reference removed exports (DEFAULT_MIGRATION_TABLE, etc.) from
      // kysely 0.29+. These dialects are unused since we use PostgreSQL.
      { path: "**/better-auth/kysely-adapter/dist/**" },
    ],
  },
};

export default nextConfig;
