const { colors } = require('./colors');
const { fontFamily } = require('./typography');
const spacing = require('./spacing');

const transitionDelay = {
  850: '850ms',
  1200: '1200ms',
  1500: '1500ms',
};
const transitionDuration = {
  0: '0ms',
  25: '25ms',
  50: '0ms',
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
  transitionDuration,
  transitionDelay,
  backgroundPosition,
  transitionProperty,
};
