const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";
const ESlintPlugin = require("eslint-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const fs = require("fs");
const SitemapPlugin = require("sitemap-webpack-plugin").default;

function headerInjection(targetPage, options = {}) {
  let template = fs.readFileSync(
    path.resolve(__dirname, `./src/pages/${targetPage}/${targetPage}.html`),
    "utf8"
  );

  const SEO_MARKUP_PATH = path.resolve(
    __dirname,
    "./src/core/SEO/base-seo.html"
  );
  let seoMarkup = fs.readFileSync(SEO_MARKUP_PATH, "utf8");

  const SPLASH_MARKUP_PATH = path.resolve(
    __dirname,
    "./src/core/splashScreen/screen.html"
  );
  const splashMarkup = fs.readFileSync(SPLASH_MARKUP_PATH, "utf8");

  const NAV_MARKUP_PATH = path.resolve(
    __dirname,
    "./src/core/nav/nav.html"
  );
  const navMarkup = fs.readFileSync(NAV_MARKUP_PATH, "utf8");

  const FOOTER_MARKUP_PATH = path.resolve(
    __dirname,
    "./src/core/footer/footer.html"
  );
  const footerMarkup = fs.readFileSync(FOOTER_MARKUP_PATH, "utf8");

  template = template.replace("</head>", `${seoMarkup}${splashMarkup}</head>`);
  template = template.replace("<nav></nav>", `${navMarkup}`);
  template = template.replace("<footer></footer>", `${footerMarkup}`);
  template = template
    .replace(
      /<%=\s*htmlWebpackPlugin\.options\.title\s*%>/g,
      options.title || ""
    )
    .replace(
      /<%=\s*htmlWebpackPlugin\.options\.description\s*%>/g,
      options.description || ""
    )
    .replace(
      /<%= htmlWebpackPlugin\.options\.keywords %>/g,
      options.keywords || ""
    )
    .replace(
      /<%= htmlWebpackPlugin\.options\.canonical %>/g,
      `https://www.hamzalawfirm.com/${targetPage}`
    );

  return template;
}


const paths = [
  {
      path: '/'
  },
  {
    path:"/ourFirm",
    images: [
      {
          path: 'https://www.hamzalawfirm.com/assets/images/Logo.webp', 
          caption: "Hamza & partner Law Firm logo",
      },
      {
          path: 'https://www.hamzalawfirm.com/assets/images/ahmad.webp', 
          caption: "Ahmad Hamza ceo and Managing Partner at hamza & partners law",
      },
      {
          path: 'https://www.hamzalawfirm.com/assets/images/shady.webp', 
          caption: "Shady Eisa - Senior Associate at hamza & partners law",
      },
      {
          path: 'https://www.hamzalawfirm.com/assets/images/adel.webp', 
          caption: "Adel El-Demerdash - Associate at hamza & partners law",
      },
      {
          path: 'https://www.hamzalawfirm.com/assets/images/moaz.webp', 
          caption: "Moaz Tarek - junior Associate at hamza & partners law",
      }
  ],
  },
  {
    path:"/services"
  },
  {
    path:"/profile"
  },
  {
    path:"/service/TEST"
  }
];


module.exports = {
  mode: "development",
  devtool: isProduction ? "nosources-source-map" : "eval-source-map",
  entry: {
    index: "./src/pages/index/index.ts",
    profile: "./src/pages/profile/profile.ts",
    ourFirm: "./src/pages/ourFirm/ourFirm.ts",
    services: "./src/pages/services/services.ts",
    serviceDetails: "./src/pages/serviceDetails/serviceDetails.ts",
  },
  output: {
    filename: "[name]/[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    alias: {
      jquery: "jquery/src/jquery",
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new ImageMinimizerPlugin({
        test: /\.(webp)$/i,

        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              [
                "imagemin-webp",
                {
                  quality: 80,
                },
              ],
            ],
          },
        },
      }),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: 20,
          reuseExistingChunk: true,
        },
        common: {
          minChunks: 2,
          name: "common",
          priority: 10,
          minSize: 10000,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      // index
      title: "Hamza & Partners Law Firm | One Stop Legal Shop",
      description: "Test Description",
      keywords: "Test Keywords",
      filename: "./index.html",
      chunks: ["index"],
      scriptLoading: "defer",
      templateContent: ({ htmlWebpackPlugin }) =>
        headerInjection("index", htmlWebpackPlugin.options),
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new HtmlWebpackPlugin({
      // profile
      title: "Hamza & Partners Law Firm | Profile",
      description: "Test Description",
      keywords: "Test Keywords",
      filename: "./profile/index.html",
      chunks: ["profile"],
      scriptLoading: "defer",
      templateContent: ({ htmlWebpackPlugin }) =>
        headerInjection("profile", htmlWebpackPlugin.options),
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new HtmlWebpackPlugin({
      // our Firm
      title: "Hamza & Partners Law Firm | Our Firm",
      description: "Test Description",
      keywords: "Test Keywords",
      filename: "./ourFirm/index.html",
      chunks: ["ourFirm"],
      scriptLoading: "defer",
      templateContent: ({ htmlWebpackPlugin }) =>
        headerInjection("ourFirm", htmlWebpackPlugin.options),
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new HtmlWebpackPlugin({
      // services
      title: "Hamza & Partners Law Firm | Services",
      description: "Test Description",
      keywords: "Test Keywords",
      filename: "./services/index.html",
      chunks: ["services"],
      scriptLoading: "defer",
      templateContent: ({ htmlWebpackPlugin }) =>
        headerInjection("services", htmlWebpackPlugin.options),
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new HtmlWebpackPlugin({
      // serviceDetails
      title: "Hamza & Partners Law Firm |Service Details",
      description: "Test Description",
      keywords: "Test Keywords",
      filename: "./serviceDetails/index.html",
      chunks: ["serviceDetails"],
      templateContent: ({ htmlWebpackPlugin }) =>
        headerInjection("serviceDetails", htmlWebpackPlugin.options),
      scriptLoading: "defer",
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[contenthash].css",
      ignoreOrder: true,
    }),
    new ESlintPlugin({
      extensions: ["ts", "js"],
      context: path.resolve(__dirname, "src"),
      exclude: "node_modules",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/img",
          to: "assets/images/[name][ext][query]",
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, "src/robots.txt"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new SitemapPlugin({
      paths: paths,
      base: "https://www.hamzalawfirm.com",
      options: {
        fileName: "sitemap.xml",
        lastmod: true,
        changefreq: "weekly",
        priority: 1.0,
      },
    }),
    new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" }),
  ],
  module: {
    rules: [
      {
        // css Loaders
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        // img Loaders
        test: /\.(png|svg|jpg|jpeg|gif|avif|webp|json|webm)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext][query]",
        },
      },
      {
        // font Loaders
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext][query]",
        },
      },
      {
        // scss Loaders
        test: /\.(scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: () => [require("autoprefixer")],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                quietDeps: true,
                silenceDeprecations: ["import", "global-builtin", "color-functions"],
              },
            },
          },
        ],
      },
      {
        //ts Loaders
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "./dist"),
    },
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/services\/([a-zA-Z0-9\-\%20\&\,]+)$/,
          to: function (context) {
            const serviceSlug = context.match[1];
            const decodedServiceSlug = serviceSlug.replace(/\%20/g, " ");
            return `/serviceDetails/index.html?service=${decodedServiceSlug}`;
          },
        },
      ],
    },
  },
};
