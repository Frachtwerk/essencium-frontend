// eslint-disable-next-line @typescript-eslint/no-var-requires

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: Boolean(
      !process.env.NEXT_PUBLIC_DISABLE_INSTRUMENTATION,
    ),
  },
  reactStrictMode: true,
  transpilePackages: [
    '@frachtwerk/essencium-lib',
    '@frachtwerk/essencium-types',
  ],
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
