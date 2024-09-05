// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: Boolean(!process.env.DISABLE_INSTRUMENTATION),
  },
  reactStrictMode: true,
  transpilePackages: [
    '@frachtwerk/essencium-lib',
    '@frachtwerk/essencium-types',
  ],
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.frachtwerk.de',
        port: '',
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: '/healthcheck',
        destination: '/api/healthcheck',
      },
    ]
  },
}

module.exports = nextConfig
