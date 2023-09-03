/**
 * @type {import('next').NextConfig}
 */

const withPWA = require('next-pwa')({
    dest: 'public',
    disable: false,//process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
    // scope: '/app',
    // sw: 'service-worker.js',
    mode: 'production',
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
        NEXTAUTH_URL: 'CCCCCCCCCCCCCCCCCCCCCCCC',
        mongoConnectionString:
            'mongodb://ZZZZZZZZZZZZZ:XXXXXXXXXX@YYYYYYYYYYYYYY:27017/XXXXXXXXXX?authSource=XXXXXXXXXXX',
        JWT_SECRET:
            'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        email_host: 'YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY',
        email_port: 465,
        email_user: 'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
        email_pass: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    },
};

module.exports = withPWA(nextConfig);
