# Solstice Commerce

A multi-category ecommerce project with:

- Strapi CMS in `cms/`
- Next.js storefront in `website/`

## Project structure

- `cms/` — headless ecommerce CMS for categories, products, and brands
- `website/` — storefront frontend for browsing and buying products

## Tech stack

- Strapi 5
- Next.js 16
- React 19
- Tailwind CSS
- Vercel-ready deployment

## Local development

Start the CMS:

```bash
cd cms
npm install
npm run develop
```

Visit:

- http://localhost:1337/admin

Then start the storefront:

```bash
cd website
npm install
npm run dev
```

Visit:

- http://localhost:3000

## CMS content model

The CMS includes these collection types:

- Categories
- Products
- Brands

The storefront fetches data from:

- `/api/categories`
- `/api/products`
- `/api/brands`

## Production deployment

- Deploy the CMS to Vercel as a Node app
- Deploy the storefront to Vercel as a Next.js app
- Use environment variables for Strapi secrets and frontend URL configuration
- Use a managed database in production instead of SQLite

## Notes

This project is designed as a modern headless commerce setup where the CMS drives product catalog data and the storefront renders it in a clean ecommerce experience.
