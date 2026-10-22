// Lightweight bootstrap seeder to ensure minimal Toran data exists.
// This runs on Strapi startup in development and production environments.
export default {
  register() {},

  async bootstrap({ strapi }: { strapi: any }) {
    try {
      // Ensure `Toran` brand exists
      const existingBrand = await strapi.db.query('api::brand.brand').findOne({ where: { slug: 'toran' } });

      if (!existingBrand) {
        await strapi.entityService.create('api::brand.brand', {
          data: {
            name: 'Toran',
            slug: 'toran',
            description: 'Toran — minimal fashion for modern wardrobes.',
            website: '',
          },
        });
        strapi.log.info('Seeded brand: Toran');
      }

      // Ensure categories exist: Sarees, Kutis, IndoWestern
      const categoriesToCreate = [
        { name: 'Sarees', slug: 'sarees', description: 'Timeless silhouettes with modern drape.' },
        { name: 'Kutis', slug: 'kuti', description: 'Minimal everyday elegance for effortless styling.' },
        { name: 'IndoWestern', slug: 'indowestern', description: 'Contemporary fusion with a refined edge.' },
      ];

      for (const cat of categoriesToCreate) {
        const existing = await strapi.db.query('api::category.category').findOne({ where: { slug: cat.slug } });
        if (!existing) {
          await strapi.entityService.create('api::category.category', {
            data: {
              name: cat.name,
              slug: cat.slug,
              description: cat.description,
            },
          });
          strapi.log.info(`Seeded category: ${cat.name}`);
        }
      }
    } catch (err) {
      // Log but don't crash Strapi startup
      // eslint-disable-next-line no-console
      console.warn('Bootstrap seeder error:', err);
    }
  },
};
