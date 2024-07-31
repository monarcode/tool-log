const path = require('path');

const ignoredPaths = ['node_modules', 'build', '.git', 'android', 'ios', '.expo'];

const isNotIgnored = (file) => {
  return !ignoredPaths.some((ignoredPath) => file.includes(ignoredPath));
};

module.exports = {
  // Type check, lint, and format TypeScript and JavaScript files
  '**/*.(ts|tsx|js|jsx)': (filenames) => {
    const files = filenames.filter(isNotIgnored).map((f) => path.relative(process.cwd(), f));

    if (files.length === 0) return [];

    return [
      `tsc --noEmit ${files.join(' ')}`,
      `npm run lint -- ${files.join(' ')} --quiet --fix`,
      `npm run format -- ${files.join(' ')}`,
    ];
  },

  // Format JSON and Markdown files
  '**/*.(json|md)': (filenames) => {
    const files = filenames.filter(isNotIgnored).map((f) => path.relative(process.cwd(), f));

    if (files.length === 0) return [];

    return `prettier ${files.join(' ')} --write`;
  },
};
