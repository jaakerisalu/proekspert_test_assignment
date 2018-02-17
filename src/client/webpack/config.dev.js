const makeConfig = require('./config.base');

const config = makeConfig({
    devtool: 'eval-source-map',

    extractCss: true,
    minifyCss: false,

    publicPath: '/',

    prependSources: [],

    plugins: [],
});

module.exports = config;
