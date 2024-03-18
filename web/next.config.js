/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    output: 'standalone'

}

const nextConfig = {
    experimental: {
        appDir: true,
    },
}