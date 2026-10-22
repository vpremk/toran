/**
 * Example `plugins.ts` showing upload provider configuration for S3 and Cloudinary.
 * Install provider packages as needed:
 * - S3: @strapi/provider-upload-aws-s3
 * - Cloudinary: @strapi/provider-upload-cloudinary
 */

export default ({ env }: { env: any }) => ({
  // AWS S3 provider example
  upload: {
    config: {
      provider: env('UPLOAD_PROVIDER', 'aws-s3'),
      providerOptions: env('UPLOAD_PROVIDER', 'aws-s3') === 'aws-s3' ? {
        accessKeyId: env('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
        region: env('AWS_REGION'),
        params: {
          Bucket: env('AWS_BUCKET'),
        },
      } : {
        // Cloudinary fallback: set CLOUDINARY_URL in env
        url: env('CLOUDINARY_URL'),
      },
    },
  },
});
import type { Core } from '@strapi/strapi';

const allowedMediaTypes = [
  'image/*',
  'video/*',
  'audio/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.*',
  'text/plain',
  'text/csv',
];

const deniedTypes = [
  'image/svg+xml',
  'application/vnd.microsoft.portable-executable',
  'application/x-msdownload',
  'application/x-msdos-program',
  'application/x-executable',
  'application/x-dosexec',
  'application/x-sh',
  'text/x-shellscript',
  'application/x-mach-binary',
];

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'users-permissions': {
    config: {
      jwtManagement: 'refresh',
      sessions: {
        httpOnly: true,
      },
    },
  },
  upload: {
    config: {
      security: {
        allowedTypes: allowedMediaTypes,
        deniedTypes,
      },
    },
  },
});

export default config;
