const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');


// The src/ dir
const appRoot = path.resolve(__dirname, '..');

const jsOutTemplate = '[name].js';
const stylesOutTemplate = '[name].css';


function makeConfig(options) {
    const output = {
        path: path.resolve(appRoot, '../../dist'),
        filename: jsOutTemplate,
        publicPath: options.publicPath,
        library: 'assignment',
    };

    return {
        entry: {
            app: options.prependSources.concat([
                'babel-polyfill',
                path.resolve(appRoot, 'js', 'main.js'),
            ]),
            styles: options.prependSources.concat([
                path.resolve(appRoot, 'scss', 'main.js'),
            ]),
        },

        output,

        module: {
            rules: [{
                test: /\.jsx?$/, // Transform all .js files required somewhere with Babel
                exclude: /node_modules/,
                use: 'babel-loader',
            }, {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    loader: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            minimize: options.minifyCss,
                        },
                    }, {
                        loader: "postcss-loader",
                        options: {
                            plugins() {
                                return [autoprefixer];
                            },
                        },
                    }, {
                        loader: "resolve-url-loader",
                    }, {
                        loader: "sass-loader",
                        options: {
                            includePaths: [
                                path.resolve(appRoot, 'node_modules', 'bootstrap-sass', 'assets', 'stylesheets'),
                            ],
                            sourceMap: true,
                        },
                    }],
                    fallback: 'style-loader',
                }),
            }, {
                test: /\.(jpe?g|png|gif|svg|woff2?|eot|ttf)$/,
                loader: 'url-loader',
                query: {
                    limit: 2000,
                    name: 'assets/[name].[hash].[ext]',
                },
            }],
        },

        plugins: [
            new ExtractTextPlugin({
                filename: stylesOutTemplate,
                disable: !options.extractCss,
            }),
            new CopyWebpackPlugin([
                { from: 'client/static' },
            ]),
        ].concat(options.plugins),

        resolve: {
            modules: ['src/js', 'node_modules'],
            extensions: ['.js', '.jsx'],
        },

        devtool: options.devtool,
        target: 'web', // Make web variables accessible to webpack, e.g. window
        // stats: false, // Don't show stats in the console

        performance: options.performance,
    };
}


module.exports = makeConfig;
