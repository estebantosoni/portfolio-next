/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.sanity.io"],
    }
}

const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl(nextConfig);