const { colors } = require('./colors');
const typography = require('./typography');
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
  '0-0': '0px 0px',
};

const transitionProperty = {
  width: 'width',
  height: 'height',
};

const lineHeight = {
  '50px': '50px',
};

module.exports = {
  ...typography,
  ...spacing,
  colors,
  lineHeight,
  transitionDuration,
  transitionDelay,
  backgroundPosition,
  transitionProperty,
};
