module.exports = {
  arrowParens: "avoid",
  bracketSpacing: true,
  endOfLine: "lf",
  htmlWhitespaceSensitivity: "css",
  jsxBracketSameLine: false,
  printWidth: 100,
  proseWrap: "preserve",
  requirePragma: false,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "none",
  useTabs: false,
  overrides: [
    {
      files: "*.json",
      options: {
        printWidth: 120,
      },
    },
  ],
};
