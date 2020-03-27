const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      corejs: "2.6.6",
      useBuiltIns: "usage",
    },
  ],
];

const plugins = [
  ["module-resolver", {
    "root": ["./src"]
  }],
  ["@babel/plugin-proposal-class-properties", {
    "loose": true
  }],
];

module.exports = { presets, plugins };
