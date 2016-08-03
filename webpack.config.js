const {resolve} = require('path');
const validate = require('webpack-validator');
const webpack = require('webpack');
module.exports = env => {
    return validate({
        entry: './src/client/index.js',
        output: {
            filename: 'bundle.js',
            path: resolve(__dirname, 'dist'),
            pathinfo: !env.prod,
        },
        // Enable sourcemaps for debugging webpack's output.
        devtool: env.prod ? 'source-map' : 'eval',
        bail: env.prod,
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: ['', '.webpack.js', '.web.js', '.jsx', '.js']
        },
        plugins: [
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ],
        module: {
            loaders: [
                // All files with a '.js' or '.jsx' extension will be handled by 'ts-loader'.
                { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
                { test: /\.css$/, loader: 'style!css' },
            ],

            preLoaders: [
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                { test: /\.js$/, loader: 'source-map-loader' }
            ]
        },

        
        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        // externals: {
        //     'react': 'React',
        //     'react-dom': 'ReactDOM'
        // }
    });
};
