const path = require("path");
const webpack = require("webpack");
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');

const options = {
    antDir: path.join(__dirname, './node_modules/ant-design-vue'),
    stylesDir: path.join(__dirname, './src'),
    varFile: path.join(__dirname, './node_modules/ant-design-vue/lib/style/themes/default.less'),
    themeVariables: ['@primary-color'],
    generateOnce: false,
}

const themePlugin = new AntDesignThemePlugin(options);

module.exports = {
    css: {
        loaderOptions: {
            less: {
                // If you are using less-loader@5 please spread the lessOptions to options directly
                modifyVars: {
                    'primary-color': '#1DA57A',
                },
                javascriptEnabled: true,
            }
        }
    },
    configureWebpack: {
        plugins: [
            themePlugin,
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        ],
        resolve: {
            alias: {
                "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js")
            }
        }
    },
    chainWebpack: config => {
        const svgRule = config.module.rule('svg')

        // 清除已有的所有 loader。
        // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear()

        // 添加要替换的 loader
        svgRule
            .use('vue-svg-loader')
            .loader('vue-svg-loader')
    },
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                bypass: function (req, res) {
                    if (req.headers.accept.indexOf("html") !== -1) {
                        console.log("Skip");
                        return "/index.html";
                    } else if (process.env.MOCK !== "none" && req.path.split("/api/")[1]) {
                        // 按照约定获取mock文件名，并调用文件方法
                        const name = req.path.split("/api/")[1].split("/").join("_");
                        const mock = require(`./mock/${name}`);
                        const result = mock(req.method);
                        // 清除mock文件缓存
                        delete require.cache[require.resolve(`./mock/${name}`)];
                        return res.send(result);
                    }
                }
            }
        },
    }
};
