const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    // 基本路径
    publicPath: '/',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    runtimeCompiler: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: (config) => {
        config.resolve.alias.set('@/', resolve('src'))
        // config.plugins.delete('prefetch')
        // 修复HMR
        config.resolve.symlinks(true);
        config.plugin('html').tap(args => {
            args[0].title= 'SKY-BLADE'
            return args
        })
    },
    configureWebpack: () => {},
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        // extract: true,
        // 开启 CSS source maps?
        // sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            less: {
                modifyVars: {},
                javascriptEnabled: true,
            }
        },
        // 启用 CSS modules for all css / pre-processor files.
        // modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        // open: process.platform === 'darwin',
        //将服务启动后默认打开浏览器
        open: true,
        port: 8085,
        overlay: {
            warnings: false,
            errors: false
        },
        // proxy: {// 设置代理
        //     '/api': {
        //         target: '',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/api': '/'
        //         }
        //     }
        // },
        before: app => {}
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
}