const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  typescript: {
    reactDocgen: false,
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve = {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
      alias: {
        "@": path.resolve(__dirname, "../src"),
      },
    };

    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test(".svg")
    );
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push(
      {
        test: /\.module\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
          },
          {
            loader: require.resolve("less-loader"),
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
        include: path.resolve(__dirname, "../src"),
      },
      {
        test: /\.svg$/,
        enforce: "pre",
        loader: require.resolve("@svgr/webpack"),
      }
    );

    return config;
  },
};
