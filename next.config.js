const withPWA = require('next-pwa')

module.exports = withPWA({
    pwa: {
        disable: process.env.NODE_ENV === 'development',
        dest: 'public'
    },
    images: {
        domains: ['cdn.pixabay.com']
    },
    //token will not working if i commit it to GitHub
    env: {
        GITHUB_TOKEN: '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'
    }
})