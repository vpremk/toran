# Ecommerce CMS

This Strapi project is configured as a CMS for a multi-category ecommerce storefront and is intended to be deployed on Vercel.

## Included content types

- Categories
- Products
- Brands

## Local development

```bash
npm install
npm run develop
```

Open http://localhost:1337/admin and create an admin user.

## Production / Vercel

1. Set the environment variables in your Vercel project using the values from `.env.production`.
2. Use the included `vercel.json` configuration.
3. Deploy the project from the `cms` folder.

## Notes

- The content types expose public read endpoints at `/api/categories`, `/api/products`, and `/api/brands`.
- Strapi will run on a single Node service under Vercel, which is suitable for a headless CMS with a separate storefront frontend.
- For a production deployment, replace placeholder secret values with secure random strings and use a managed database instead of SQLite.
