const LazyPlugin = require("react-lazy-ssr/babel");

module.exports = {
  presets: [
    "@babel/preset-react",
    "@babel/preset-env",
    [
      "@emotion/babel-preset-css-prop",
      {
        sourceMap: false,
      },
    ],
  ],
  plugins: [
    "@babel/plugin-proposal-optional-chaining",
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "~": "./src",
        },
      },
    ],
    [LazyPlugin],
  ],
  // "plugins": [
  //     "@babel/plugin-proposal-class-properties"
  // ]
};
