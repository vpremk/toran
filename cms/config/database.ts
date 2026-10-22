/**
 * Example Postgres database config for Strapi, reading from DATABASE_URL.
 * Place this at `cms/config/database.ts` and set DATABASE_URL in your environment.
 */
import { parse } from 'pg-connection-string';

const url = process.env.DATABASE_URL || '';
let parsed: ReturnType<typeof parse> | null = null;
try {
  parsed = url ? parse(url) : null;
} catch (e) {
  // fall through
}

export default ({ env }: { env: any }) => {
  if (env('DATABASE_URL') && parsed) {
    return {
      connection: {
        client: 'postgres',
        connection: {
          host: parsed.host,
          port: Number(parsed.port || 5432),
          database: parsed.database,
          user: parsed.user,
          password: parsed.password,
          ssl: { rejectUnauthorized: false },
        },
        pool: { min: 0, max: 10 },
      },
    };
  }

  // Fallback to environment-based values if DATABASE_URL not present
  return {
    connection: {
      client: 'postgres',
      connection: {
        host: env('PG_HOST', '127.0.0.1'),
        port: env('PG_PORT', 5432),
        database: env('PG_DATABASE', 'toran_cms'),
        user: env('PG_USER', 'postgres'),
        password: env('PG_PASSWORD', ''),
        ssl: env('PG_SSL', false) ? { rejectUnauthorized: false } : false,
      },
      pool: { min: 0, max: 10 },
    },
  };
};
import path from 'path';
import type { Core } from '@strapi/strapi';
import { isDatabaseClientKind } from '@strapi/database';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Database => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  if (!isDatabaseClientKind(client)) {
    throw new Error(
      `Unsupported DATABASE_CLIENT: ${client}. Use "postgres", "mysql", or "sqlite".`
    );
  }

  const connections: Record<Core.Config.Database.ClientKind, Core.Config.Database['connection']> = {
    mysql: {
      client: 'mysql',
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    postgres: {
      client: 'postgres',
      connection: {
        connectionString: env('DATABASE_URL'),
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    sqlite: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};

export default config;
