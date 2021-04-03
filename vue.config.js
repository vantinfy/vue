module.exports = {
    productionSourceMap: true, //定位js、css出错位置，交付打包时改为false
    configureWebpack: {},
    devServer: {
        port: 2233,
        open: true, //自动打开2233端口
        //Mock数据
        // before(app) {}
    },
}