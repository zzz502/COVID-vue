
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const webpack = require('webpack')
module.exports = {
    chainWebpack: config => {
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule
            .test(/\.svg$/)
            .include.add(path.resolve(__dirname, './src/icons')).end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
        const fileRule = config.module.rule('file')
        fileRule.uses.clear()
        fileRule
            .test(/\.svg$/)
            .exclude.add(path.resolve(__dirname, './src/icons'))
            .end()
            .use('file-loader')
            .loader('file-loader')
    },
    configureWebpack: (config) => {
        const svgRule = config.module.rule('svg');
        // 清空默认svg规则
        svgRule.uses.clear();
        //针对svg文件添加svg-sprite-loader规则
        svgRule
            .test( /\.svg$/)
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
        config.plugins.push(
            AutoImport({
                resolvers: [ElementPlusResolver()]
            })
        )
        config.plugins.push(
            Components({
                resolvers: [ElementPlusResolver()]
            })
        )
    },
    chainWebpack(config) {
        // 设置 svg-sprite-loader
        // config 为 webpack 配置对象
        // config.module 表示创建一个具名规则，以后用来修改规则
        config.module
            // 规则
            .rule('svg')
            // 忽略
            .exclude.add(resolve('src/icons'))
            // 结束
            .end()
        // config.module 表示创建一个具名规则，以后用来修改规则
        config.module
            // 规则
            .rule('icons')
            // 正则，解析 .svg 格式文件
            .test(/\.svg$/)
            // 解析的文件
            .include.add(resolve('src/icons'))
            // 结束
            .end()
            // 新增了一个解析的loader
            .use('svg-sprite-loader')
            // 具体的loader
            .loader('svg-sprite-loader')
            // loader 的配置
            .options({
                symbolId: 'icon-[name]'
            })
            // 结束
            .end()
        config
            .plugin('ignore')
            .use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/))
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    }}
module.exports = {
    devServer: {
        // 项目运行时候的端口号
        port: 8080
    }
}