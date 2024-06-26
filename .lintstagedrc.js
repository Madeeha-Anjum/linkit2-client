const path = require('path');

const buildNextLintFixCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  '*.{js,jsx,ts,tsx}': [
    buildNextLintFixCommand,
    'prettier --write --ignore-unknown',
    'cspell --file',
  ],
  '!*.{js,jsx,ts,tsx}': ['prettier --write --ignore-unknown', 'cspell --file'],
};
