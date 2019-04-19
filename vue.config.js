module.exports = {
    devServer: {
        open: true,
        host: "0.0.0.0",
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://192.168.85.1:8080',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': '/mock'
                }
            }
        }
    }
}