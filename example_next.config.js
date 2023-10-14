/**
 * @type {import('next').NextConfig}
 */

const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
    // scope: '/app',
    // sw: 'service-worker.js',
});

const nextConfig = {
    async redirects() {
        return [
            {
                source: '/logout',
                destination: '/',
                permanent: true,
            },
        ];
    },
    reactStrictMode: true,
    poweredByHeader: false,
    compress: true,
    env: {
        mongoConnectionString:
            'mongodb://nnn:nnnn@nnnnnnnnnn:27017/nnn?nnnnnn=nnnnnn',
        JWT_SECRET:
            'JhbGciOiJIUzI1NiIsInR5dCI6IkpXVCJ9.eyJzdeIiOiIxMjM0NTY3ODkwIiwibmFtZSI4IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ',
        email_host: 'nnn.nnn.nn',
        email_port: 465,
        email_user: 'nnnn@nnnn.nnnn.nn',
        email_pass: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        ADMIN_PROJECT: 'admin',
        ADMIN_EMAIL: 'admin@report.com',
        ADMIN_PASSWORD: 'xY7zZ6yYsZ4xX8yY',
    },
};

module.exports = withPWA(nextConfig);
