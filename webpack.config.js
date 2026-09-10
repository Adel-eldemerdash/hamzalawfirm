const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const isProduction = process.argv.includes("production");
const ESlintPlugin = require("eslint-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const fs = require("fs");
const SitemapPlugin = require("sitemap-webpack-plugin").default;
const serviceRoutes = require("./src/data/service-routes.json");

const SITE = "https://www.hamzalawfirm.com";

/**
 * The public URL of a page, derived from its folder name.
 *
 * The home page lives at the site root, not at /index. Deriving its canonical
 * from the folder name pointed it at a URL that returns nothing, which tells a
 * search engine that the home page is a duplicate of a page that does not
 * exist.
 */
function canonicalFor(targetPage) {
  return targetPage === "index" ? SITE + "/" : SITE + "/" + targetPage;
}

/**
 * The Google Analytics 4 tag, Google's snippet verbatim, placed immediately
 * after <head> as Google's installation guide specifies.
 *
 * Production builds only. The dev server would otherwise report every local
 * page load to the live property as real traffic from localhost.
 */
const GOOGLE_TAG = isProduction
  ? fs.readFileSync(path.resolve(__dirname, "./src/core/SEO/google-tag.html"), "utf8")
  : "";

function withGoogleTag(html) {
  return GOOGLE_TAG ? html.replace("<head>", "<head>\n" + GOOGLE_TAG) : html;
}

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

  template = withGoogleTag(template);
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
      canonicalFor(targetPage)
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
    path:"/pdpl-checklist"
  },
  // Real service routes, replacing the "/service/TEST" placeholder that used
  // to sit here. The slugs come from src/data/service-routes.json, which is
  // generated from the database keys with slugify() in src/core/utils/slug.ts.
  ...serviceRoutes.slugs.map((slug) => ({ path: `/services/${slug}` }))
];


module.exports = {
  // mode is controlled via CLI: --mode production | --mode development
  devtool: isProduction ? "nosources-source-map" : "eval-source-map",
  entry: {
    index: "./src/pages/index/index.ts",
    profile: "./src/pages/profile/profile.ts",
    ourFirm: "./src/pages/ourFirm/ourFirm.ts",
    services: "./src/pages/services/services.ts",
    serviceDetails: "./src/pages/serviceDetails/serviceDetails.ts",
    "pdpl-checklist": "./src/pages/pdpl-checklist/pdpl-checklist.ts",
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
      // "..." keeps webpack's default minimizer, which is Terser. Assigning
      // this array without it replaces the defaults instead of extending
      // them, which is how the JavaScript came to ship unminified.
      "...",
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
      title: "Hamza & Partners Law Firm | Corporate and Data Protection Lawyers in Cairo",
      description:
        "A Cairo law firm advising Egyptian and international businesses on corporate law, litigation and arbitration, banking and finance, real estate, taxation, and compliance with Egypt's Personal Data Protection Law No. 151 of 2020. Includes a free PDPL self-assessment.",
      keywords:
        "law firm Egypt, Cairo law firm, corporate lawyer Egypt, PDPL, Personal Data Protection Law 151 of 2020, data protection Egypt, legal advisory Cairo, arbitration Egypt",
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
      title: "Firm Profile | Hamza & Partners Law Firm",
      description:
        "The profile of Hamza & Partners Law Firm: practice areas, experience, and the team advising Egyptian and international clients from Cairo.",
      keywords:
        "Hamza and Partners profile, law firm profile Egypt, Cairo legal practice, Egyptian lawyers",
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
      title: "Our Firm | Hamza & Partners Law Firm",
      description:
        "Who we are at Hamza & Partners: our vision and values, how we work, our data protection policy, and the lawyers advising businesses across Egypt and the region.",
      keywords:
        "about Hamza and Partners, Egyptian law firm, legal team Cairo, law firm values, legal advisory Egypt",
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
      title: "Legal Services | Hamza & Partners Law Firm",
      description:
        "Fifteen practice areas from a single Cairo firm: litigation, mediation and arbitration, corporate governance and mergers and acquisitions, banking and finance, capital markets, real estate, taxation, intellectual property, cybercrime, healthcare, hospitality, and restructuring.",
      keywords:
        "legal services Egypt, litigation Cairo, arbitration Egypt, mergers and acquisitions Egypt, banking and finance law, capital markets Egypt, intellectual property Egypt, tax law Egypt, cybercrime law Egypt",
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
      title: "Service Details | Hamza & Partners Law Firm",
      description:
        "Detail of a practice area at Hamza & Partners Law Firm, Cairo.",
      keywords: "legal service Egypt, practice area, Hamza and Partners",
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
    new HtmlWebpackPlugin({
      // pdpl-checklist
      title: "Free PDPL Self-Assessment | Egypt Data Protection Law 151 of 2020",
      description:
        "Answer questions about how your organization handles data and find out what Egypt's Personal Data Protection Law No. 151 of 2020 requires of you: whether you are a controller or a processor, which license or permit you need and its official fee band, and the documents and registrations you must produce. Free, in Arabic and English, with the result on screen immediately.",
      keywords:
        "PDPL checklist, PDPL self assessment, Egypt data protection law, Law 151 of 2020, Executive Regulations 816 of 2025, data protection license Egypt, PDPC, DPO registration Egypt, cross-border data transfer Egypt, تقييم ذاتي حماية البيانات, قانون حماية البيانات الشخصية",
      filename: "./pdpl-checklist/index.html",
      chunks: ["pdpl-checklist"],
      scriptLoading: "defer",
      templateContent: ({ htmlWebpackPlugin }) =>
        headerInjection("pdpl-checklist", htmlWebpackPlugin.options),
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
        {
          // Apache serves the live site, so .htaccess is what actually routes
          // it. Shipping it inside dist/ means a manual upload carries the
          // routing with the build instead of leaving it to drift on the
          // server.
          from: path.resolve(__dirname, "src/.htaccess"),
          to: path.resolve(__dirname, "dist/.htaccess"),
          toType: "file",
        },
        {
          // Referenced by ErrorDocument in .htaccess. It carries the Google
          // tag too, so the pages report shows which missing URLs visitors
          // actually reach.
          from: path.resolve(__dirname, "src/404.html"),
          to: path.resolve(__dirname, "dist/404.html"),
          toType: "file",
          transform(content) {
            return withGoogleTag(content.toString());
          },
        },
        {
          // Square icon tiles. They sit alongside the other images so the
          // absolute paths in base-seo.html resolve from any route.
          from: path.resolve(__dirname, "src/img/icons"),
          to: "assets/images/[name][ext][query]",
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, "src/site.webmanifest"),
          to: path.resolve(__dirname, "dist/site.webmanifest"),
          toType: "file",
        },
        {
          // A Markdown summary of the site for AI assistants, following the
          // llms.txt proposal (llmstxt.org). Written by hand: update it when
          // a page or a service is added, removed, or renamed.
          from: path.resolve(__dirname, "src/llms.txt"),
          to: path.resolve(__dirname, "dist/llms.txt"),
          toType: "file",
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
          // Mirrors the production rewrite in src/.htaccess. The slug is read
          // from the path by serviceDetails.ts, so no query string is added.
          from: /^\/services\/[a-z0-9]+(?:-[a-z0-9]+)*$/,
          to: "/serviceDetails/index.html",
        },
      ],
    },
  },
};
