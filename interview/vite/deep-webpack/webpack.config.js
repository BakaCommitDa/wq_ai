const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCsssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/main.tsx',
    output: {
        filename: '[name].[contenthash].js', //hash 更新时，
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-react',
                            [
                                '@babel/preset-typescript', {

                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                // use: ['style-loader', 'css-loader']
                use: [MiniCsssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                },
                generator: {
                    filename: 'assets/images/[name].[ext]'
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html'
        }),
        new MiniCsssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        hot: true,
        port: 8080,
        open: true
    },
    optimization: {
        usedExports: true, // tree shaking  注释，没有使用的代码
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test:  /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    priority: 10,
                    name: 'vendors',
                    chunks: 'all',
                    minChunks: 1,
                    enforce: true
                }
            }
        }
    }
}