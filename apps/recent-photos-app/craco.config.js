const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = {
  webpack: {
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: "recent_photos_app",
          filename: "remoteEntry.js",
          exposes: {
            "./RecentPhotosApp": "./src/App",
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
  },
};
