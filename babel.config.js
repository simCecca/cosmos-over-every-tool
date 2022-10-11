module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
  test: { plugins: ["@babel/plugin-transform-modules-commonjs"] },
};
