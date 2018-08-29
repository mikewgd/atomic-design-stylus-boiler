// https://github.com/diegohaz/arc/wiki/Webpack
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devServer = require('@webpack-blocks/dev-server2')
const splitVendor = require('webpack-blocks-split-vendor')
const happypack = require('webpack-blocks-happypack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const GoogleFontsPlugin = require("google-fonts-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const {
  addPlugins, createConfig, entryPoint, env, setOutput,
  sourceMaps, defineConstants, webpack,
} = require('@webpack-blocks/webpack2')

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000
const sourceDir = process.env.SOURCE || 'src'
const publicPath = `/${process.env.PUBLIC_PATH || ''}/`.replace('//', '/')
const sourcePath = path.join(process.cwd(), sourceDir)
const outputPath = path.join(process.cwd(), 'dist')

const babel = () => () => ({
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
})

const assets = () => () => ({
  module: {
    rules: [
      { test: /\.(png|jpe?g|svg|woff2?|ttf|eot)$/, loader: 'url-loader?limit=8000' },
      { 
        test: /\.styl$/, 
        loader: 'style-loader!css-loader!stylus-loader'
      },
    ],
  },
})

const assetsProd = () => () => ({
  module: {
    rules: [
      { test: /\.(png|jpe?g|svg|woff2?|ttf|eot)$/, loader: 'url-loader?limit=8000' },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: true,
                // modules: true,
                // localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer'),
                ],
              },
            },
            {
              loader: 'stylus-loader',
              options: {
                'include css': true,
                preferPathResolver: 'webpack',
              },
            }
          ]
        })
      },
    ],
  },
})

const resolveModules = modules => () => ({
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.styl'],
    modules: [].concat(modules, ['node_modules']),
  },
})

const config = createConfig([
  entryPoint({
    app: sourcePath,
  }),
  setOutput({
    filename: '[name].js',
    path: outputPath,
    publicPath,
  }),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV,
    'process.env.PUBLIC_PATH': publicPath.replace(/\/$/, ''),
  }),
  addPlugins([
    new webpack.ProgressPlugin(),
    new GoogleFontsPlugin({
      fonts: [
        { family: "Open Sans", variants: ["400"] },
        { family: "Montserrat", variants: ["400", "700", "300"]},
        { family: "Poppins", variants: ["400"]}
      ]
    })
  ]),
  happypack([
    babel(),
  ]),
  resolveModules(sourceDir),

  env('development', [
    devServer({
      contentBase: 'public',
      stats: 'errors-only',
      historyApiFallback: { index: publicPath },
      headers: { 'Access-Control-Allow-Origin': '*' },
      proxy: {
        '/status': {
          target: 'http://localhost:5000',
          secure: false
        }
      },
      host,
      port,
    }),
    sourceMaps(),
    assets(),
    addPlugins([
      new webpack.NamedModulesPlugin(),
      new ExtractTextPlugin("style.css"),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(process.cwd(), 'index.html'),
      }),
    ]),
  ]),

  env('production', [
    splitVendor(),
    assetsProd(),
    addPlugins([
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
      new ExtractTextPlugin("style.css"),
      new OptimizeCssAssetsPlugin({
        // assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
        canPrint: true
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(process.cwd(), 'index.html'),
      }),
    ]),
  ]),
])

module.exports = config
