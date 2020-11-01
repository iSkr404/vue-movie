module.exports = {
    devServer: {
        proxy: {
            '/gateway': {
                target: 'https://m.maizuo.com',
                changeOrigin: true
            }
        }
    },
    publicPath: './'
}