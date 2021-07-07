const withPWA = require('next-pwa')

module.exports = withPWA({
    pwa: {
        disable: process.env.NODE_ENV === 'development',
        dest: 'public'
    },
    images: {
        domains: ['cdn.pixabay.com']
    },
    env: {
        GITHUB_TOKEN: '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'
    }
})