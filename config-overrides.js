const { override, fixBabelImports, addLessLoader } = require("customize-cra");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const rewiredMap = () => config => {
  config.devtool =
    config.mode === "development" ? "cheap-module-source-map" : false;
  return config;
};

module.exports = override(
  rewiredMap(), //关闭mapSource
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      hack: `true;@import "${require.resolve(
        "antd/lib/style/color/colorPalette.less"
      )}";`
    }
  }),
  config => {
    if (!config.plugins) {
      config.plugins = [];
    }
    config.plugins.push(
      new CopyWebpackPlugin([
        {
          from: "node_modules/pdfjs-dist/cmaps/",
          to: "cmaps"
        }
      ])
    );
    return config;
  }
);
