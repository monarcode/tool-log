const path = require('path');

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`;

module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'tsc --noEmit',

  // Lint & Prettify TS and JS files
  '**/*.(ts|tsx|js|jsx)': (filenames) => [
    buildEslintCommand(filenames),
    `prettier --write ${filenames.join(' ')}`,
  ],

  // Prettify only Markdown and JSON files
  '**/*.(md|json)': (filenames) => `prettier --write ${filenames.join(' ')}`,
};
