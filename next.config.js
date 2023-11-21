/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "cdn.sanity.io",
            },
        ],
    },
}

const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl(nextConfig);