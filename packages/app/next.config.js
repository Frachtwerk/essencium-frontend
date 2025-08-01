// eslint-disable-next-line @typescript-eslint/no-var-requires

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      '@mantine/core',
      '@mantine/hooks',
      '@mantine/dates',
      '@mantine/modals',
      '@mantine/notifications',
      '@mantine/spotlight',
    ],
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
  output: 'standalone',
}

module.exports = nextConfig
