# Vercel Deployment Notes — CMS (Strapi)

This document explains how to prepare the `cms/` Strapi app for deployment to Vercel, with guidance to swap the default SQLite database for a managed Postgres database, required environment variables, file upload storage recommendations, and build/start settings.

-- Quick summary --
- Do not use SQLite on Vercel: the filesystem is ephemeral and will lose the SQLite file between invocations. Use a managed Postgres (Supabase, Neon, Railway, Render DB, AWS RDS).
- Use a remote object storage provider (S3, DigitalOcean Spaces, Cloudinary) for uploads — the local `public/uploads` folder is not persistent on serverless platforms.
- Provide secure secrets via Vercel Environment Variables: `DATABASE_URL`, `APP_KEYS`, `API_TOKEN_SALT`, `JWT_SECRET`, `ADMIN_JWT_SECRET`, etc.

## 1) Recommended stack

- Managed Postgres: Supabase / Neon / Railway / Render / AWS RDS
- Object Storage: AWS S3 or Cloudinary (Cloudinary quick to setup for images)
- Deploy Frontend (Next.js) to Vercel (recommended)
- Deploy CMS either to a small Node host (Render / Railway) or to Vercel (possible but requires care). See notes on caveats below.

## 2) Why replace SQLite

- SQLite stores data in a local file (usually `./data` or `./tmp`). Vercel's runtime is ephemeral; files written at runtime are not persisted across deployments or serverless invocations. Use Postgres for persistence.

## 3) Environment variables (required)

Create these as **Environment Variables** in your Vercel project (or your chosen host). Use strong random values for secrets.

- `DATABASE_URL` — Postgres connection string (example: `postgres://user:pass@db.example.com:5432/dbname`).
- `NODE_ENV` — `production`
- `APP_KEYS` — Comma-separated app keys. Example generator: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` (generate 4 values and join with commas).
- `API_TOKEN_SALT` — random string (32+ bytes). Use same generator as above.
- `JWT_SECRET` — random string for JWT signing.
- `ADMIN_JWT_SECRET` — random string for admin JWT (if used).
- `NEXT_PUBLIC_STRAPI_URL` — URL of the deployed CMS (used by the storefront). e.g. `https://cms-yourproject.vercel.app`
- `STRAPI_HOST` / `HOST` — optional override (usually leave default). If required set to `0.0.0.0`.
- `PORT` — optional (Vercel assigns ports; usually not necessary).

Optional/Provider-specific:
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_BUCKET` — for S3 uploads provider.
- `CLOUDINARY_URL` — if using Cloudinary 

Example `.env` snippet (local testing):

```
DATABASE_URL=postgres://user:pass@db.example.com:5432/toran_cms
NODE_ENV=production
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_random_salt
JWT_SECRET=your_jwt_secret
ADMIN_JWT_SECRET=your_admin_jwt_secret
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

Generate secrets:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 4) Update Strapi database config

Replace the SQLite config with a Postgres config that reads `DATABASE_URL`. Example `cms/config/database.ts` snippet:

```ts
import { parse } from 'pg-connection-string';

const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL is required');

const config = parse(url);

export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: config.host,
      port: Number(config.port || 5432),
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: { rejectUnauthorized: false },
    },
    pool: { min: 0, max: 10 },
  },
});
```

Note: Install `pg-connection-string` in the CMS if you use the snippet above, or parse the URL yourself.

## 5) File uploads (persistence)

Local uploads are not persisted on serverless. Use a provider plugin for Strapi (S3 or Cloudinary).

Example `cms/config/plugins.ts` snippet (S3):

```ts
export default ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
        region: env('AWS_REGION'),
        params: { Bucket: env('AWS_BUCKET') },
      },
    },
  },
});
```

Or use Cloudinary:

```ts
export default ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: { url: env('CLOUDINARY_URL') },
    },
  },
});
```

Install provider package as needed (e.g. `@strapi/provider-upload-aws-s3` or `@strapi/provider-upload-cloudinary`).

## 6) CORS and allowed origins

Update `cms/config/cors.ts` to include your production frontend origin and Vercel preview patterns, for example:

```ts
export default ({ env }) => ({
  origin: [
    env('NEXT_PUBLIC_WEBSITE_URL'),
    'https://your-frontend.vercel.app',
    /https:\/\/.+--yourproject\.vercel\.app$/,
  ],
});
```

## 7) Vercel project settings

- Create a Vercel project and point the **Root Directory** to `cms/` when creating the Strapi deployment (or create a separate project for the CMS).
- Set `Install Command`: `npm ci` (or leave default)
- Set `Build Command`: `npm run build`
- Set `Start Command`: `npm run start` (Strapi's `start` runs the server)
- Node version: ensure the Vercel environment uses a Node version compatible with native modules used by your app (set `engines.node` in `package.json` to `>=18`/`>=20` as appropriate). Strapi may need Node 18+ or 20+ depending on version.

Important: Vercel runs serverless by default; Strapi expects a Node server. You can deploy Strapi on Vercel as a Node server in the “Server” option, but it may not be the best fit for a persistent CMS. Consider using Render or Railway if you need an always-on server and easier DB integration.

## 8) Migration & seeding strategy

- If you already have data in SQLite locally, the simplest robust approach is:
  1. Provision the Postgres database in your chosen provider.
  2. Point `DATABASE_URL` to the new DB locally and run the Strapi server locally — Strapi will create the required tables.
  3. Use your `cms/src/index.ts` bootstrap seeder (already present) to create seed entries (brands/categories/products). This is simpler than attempting to migrate the SQLite DB structure and content directly.

If you must migrate existing data, use a database migration tool or export/import scripts (pgloader, sqlite-to-postgres, or custom scripts) and verify relationships.

## 9) CI / Build-time considerations

- The Strapi admin panel is built during `npm run build`. Ensure build environment variables are available at build time if the admin needs them.
- If you rely on seed scripts that run at `bootstrap`, they may execute on each start; guard them so they are idempotent (create-if-not-exists). That is already how the current bootstrap seeder works.

## 10) Post-deploy checklist

1. Deploy CMS and set `NEXT_PUBLIC_STRAPI_URL` in the frontend project to the CMS URL.
2. Verify uploads are served from S3/Cloudinary.
3. Verify admin access and content types.
4. Run a manual seed if needed to create initial content (or let bootstrap run once).

## 11) Alternatives and caveats

- Vercel is great for frontend apps. For backend CMS (Strapi), prefer Render, Railway, Fly, or a VM/container host when you need an always-on server and easier DB integration.
- If you must use Vercel, consider deploying Strapi as a microservice using Vercel's Serverless Functions or as a server with Vercel's new "Server" runtime but expect some platform-specific tuning.

---

If you want, I can:

- (A) Add an example `cms/config/database.ts` and `cms/config/plugins.ts` into the repo tuned for `DATABASE_URL` and S3/Cloudinary (I can create them and mark them for review).  
- (B) Add a short `README` deploy checklist for the website project explaining required `NEXT_PUBLIC_STRAPI_URL`.  
- (C) Create a Vercel environment variables export snippet that you can paste into the Vercel UI.
