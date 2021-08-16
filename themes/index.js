const { colors } = require('./colors');
const { fontFamily } = require('./typography');
const layout = require('./layout');

module.exports = {
  fontFamily,
  colors,
  ...layout,
};
