const { colors } = require('./colors');
const { fontFamily } = require('./typography');
const spacing = require('./spacing');

module.exports = {
  fontFamily,
  colors,
  ...spacing,
};
