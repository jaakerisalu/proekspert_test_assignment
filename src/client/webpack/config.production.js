const makeConfig = require('./config.base');

const config = makeConfig({
    devtool: 'source-map',

    extractCss: true,
    minifyCss: true,

    publicPath: '/',

    prependSources: [],

    plugins: [],
});


module.exports = config;
