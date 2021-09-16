const { colors } = require('./colors');
const typography = require('./typography');
const spacing = require('./spacing');

module.exports = {
  ...typography,
  ...spacing,
  colors,
  zIndex: {
    '-1': '-1',
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    25: 25,
    75: 75,
    1000: 1000,
  },
  lineHeight: {
    '50px': '50px',
  },
  transitionDuration: {
    0: '0ms',
    25: '25ms',
    50: '0ms',
    400: '400ms',
    450: '450ms',
    1250: '1250ms',
  },
  backgroundPosition: {
    'top-center': 'top center',
  },
  transitionProperty: {
    width: 'width',
    height: 'height',
    spacing: 'margin, padding',
  },
  scale: {
    115: '1.15',
    117: '1.15',
  },
};
