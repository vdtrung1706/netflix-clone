const { colors } = require('./colors');
const { fontFamily } = require('./typography');
const spacing = require('./spacing');

const transitionDelay = {
  1500: '1500ms',
  2000: '2000ms',
};

const backgroundPosition = {
  'top-center': 'top center',
};

const transitionProperty = {
  width: 'width',
  height: 'height',
};

module.exports = {
  fontFamily,
  colors,
  ...spacing,
  transitionDelay,
  backgroundPosition,
  transitionProperty,
};
