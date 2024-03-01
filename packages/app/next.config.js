// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@frachtwerk/essencium-lib',
    '@frachtwerk/essencium-types',
  ],
  i18n,
  rewrites: async () => {
    return [
      {
        source: '/healthcheck',
        destination: '/api/healthcheck',
      },
      {
        source: '/oauth2/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
