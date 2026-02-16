export default [
  {
    ignores: ["dist/**", "node_modules/**", "functions/**"],
  },
  {
    files: ["src/**/*.{js,jsx,ts,tsx}", "vite.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        localStorage: "readonly",
        FormData: "readonly",
        FileReader: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        fetch: "readonly",
        URL: "readonly",
        __dirname: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "off",
      "no-undef": "error",
    },
  },
];
