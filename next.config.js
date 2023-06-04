/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,

  compiler: {
    emotion: true,
  },

  // cssModules: true,
  // cssLoaderOptions: {
  //   importLoaders: 1,
  //   localIdentName: '[folder]__[local]--[hash:base64:5]',
  // },
  // next.js 13부터는 cssModules 옵션을 사용할 필요가 없기 때문에 이걸 쓰게 되면 어마어마하게 긴 에러가 터미널 창에 나온다.
  // warn - Invalid next.config.js options detected: warn = The root value has an unexpected property, cssModules, which is not in the list of allowed properties (amp, analyticsId, assetPrefix, basePath, cleanDistDir, compiler, compress, configOrigin, crossOrigin, devIndicators, disDir, env, eslint, excludeDefaultMomentLocales, experimental, exportPathMap, generateBuildId, generateEtags, headers, httpAgentOptions, i18n, images, modularizeImports, onDemandEntries, optimizeFonts, output, outputFileTracing, pageExtensions, poweredByHeader, productionBrowserSourceMaps, publicRuntimeConfig, reactStrictMode, redirects, rewrites, sassOptions, serverRuntimeConfig, skipMiddlewareUrlNormalize, skipTrailingSlashRedirect,staticPageGenerationTimeout, swcMinify, target,trailingSlash, transpilePackages,typescript, useFileSystemPublicRoutes, webpack).
});
