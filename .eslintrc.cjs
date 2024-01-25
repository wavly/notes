module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  extends: ["eslint:recommended", "plugin:astro/recommended", "prettier"],
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ["*.astro"],
      // Allows Astro components to be parsed.
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        indent: ["error", "tab"],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
      },
    },
    // ...
  ],
};
