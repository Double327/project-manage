const port = process.env.port || process.env.npm_config_port || 80; // 端口

module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: port,
        proxy: {
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            [process.env.VUE_APP_BASE_API]: {
                target: `http://129.204.116.106:8888`,
                // target: `http://localhost:8888`,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        disableHostCheck: true
    },

}
