const { environment } = require('@rails/webpacker')
require('webpack-assets-manifest');
const webpack = require('webpack')

// const AsyncChunkNames = require('webpack-async-chunk-names-plugin');
// const WrapperPlugin = require('wrapper-webpack-plugin');
//
// environment.plugins.append(
//     'AsyncChunkNames',
//     new AsyncChunkNames()
// );
//
// environment.plugins.prepend(
//     'WrapperPlugin',
//     new WrapperPlugin({
//         test: /container/, // only wrap output of bundle files with '.js' extension
//         header: 'window = this;\n\n',
//         footer: '//'
//     })
// );

// Considering ssr
environment.config.merge({optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: (chunk) => {
                console.log(`>>>>>>> ${chunk.name}`)
                return chunk.name !== 'server_rendering'
            },
            maxInitialRequests: Infinity,
            maxAsyncRequests: Infinity,
            minChunks: 1,
            minSize: 0,
            name: true,
            cacheGroups: {
                // vendor: {
                //     test: /[\\/]node_modules[\\/]/,
                //     name(module) {
                //         // get the name. E.g. node_modules/packageName/not/this/part.js
                //         // or node_modules/packageName
                //         const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                //
                //         // npm package names are URL-safe, but some servers don't like @ symbols
                //         return `${packageName.replace('@', '')}-vendor`;
                //     },
                // },
                // react: {
                //     test: /app[\\/]javascript[\\/](containers)[\\/]/,
                //     chunks: 'all',
                //     priority: -10,
                //     name(module) {
                //         var res = module.resource;
                //         var spl = res.split('/');
                //         var file = spl[spl.length - 1];
                //         var name = file.split('.').slice(0, -1)[0].toLowerCase();
                //         var suf = res.includes('container') ? 'container' :
                //             res.includes('ducks') ? 'duck' : 'component';
                //         return `${name}-${suf}-react`
                //     }
                // },
            },
        },
    }});

module.exports = environment
