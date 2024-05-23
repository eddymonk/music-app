const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = {
  webpack: {
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: "main_app",
          remotes: {
            albums_photos_app:
              "albums_photos_app@http://localhost:3001/remoteEntry.js",
            recent_photos_app:
              "recent_photos_app@http://localhost:3002/remoteEntry.js",
          },
          shared: {
            react: { singleton: true, eager: true, requiredVersion: false },
            "react-dom": {
              singleton: true,
              eager: true,
              requiredVersion: false,
            },
          },
        }),
      ],
    },
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        process: require.resolve("process/browser"),
      };
      return webpackConfig;
    },
  },
};
