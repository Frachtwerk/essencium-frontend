// eslint-disable-next-line @typescript-eslint/no-var-requires

/** @type {import('next').NextConfig} */
const nextConfig = {
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
      {
        source: '/oauth2/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
