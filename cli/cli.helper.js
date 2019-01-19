/*
 * CLI Helper
 *
 *
 */

// Dependencies (NodeJS)
// Dependencies (LocalHost)

// Main Container
const lib = {};

// Print a symbol for all columns
lib.horizontalLine = symbol => {
  symbol = typeof symbol == 'string' && symbol.trim().length > 0 ? symbol : '-';

  // Get the available screen size.
  const width = process.stdout.columns;

  let line = '';
  for (let i = 0; i < width; i++) {
    line += symbol;
  }
  console.log(line);
};
// Create vertical space.
lib.verticalSpace = line => {
  line = typeof line == 'number' && line > 0 ? line : 1;
  for (let i = 0; i < line; i++) {
    console.log('');
  }
};
// Write in center
lib.centered = title => {
  title = typeof title == 'string' && title.trim().length > 0 ? title : false;
  if (title) {
    width = process.stdout.columns;
    helfWidth = Math.floor((width - title.length) / 2);
    line = '';
    for (let i = 0; i < helfWidth; i++) {
      line += ' ';
    }
    line += title;
    console.log(line);
  }
};

// Export Module
module.exports = lib;
