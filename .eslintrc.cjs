module.exports = {
  root: true,
  env: { browser: true, node: true, es2020: true },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    // Al instalar standard como devDevendency ignora por alguna razón (bug) las reglas de eslint.
    'multiline-ternary': 'off', // Evita el error: Expected newline between consequent and alternate of ternary expression. (multiline-ternary) standard(multiline-ternary)
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
  }
}
