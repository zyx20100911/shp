module.exports = {
    lintOnSave: false,
    //代理跨域
    devServer: {
        proxy: {
            '/api': {//每个/api路径的IP都会转到↓这个目标服务器
                target: 'http://39.98.123.211/'
            },
        },
    }
}
