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