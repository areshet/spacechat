module.exports = {
    devServer: {
        proxy: {
            '/*': {
                target: 'http://94.250.249.240:80/',
                changeOrigin: true,
                secure: false
            }
        }
    }
};