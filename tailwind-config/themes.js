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
    100: 100,
    1000: 1000,
  },
  lineHeight: {
    '50px': '50px',
  },
  transitionDuration: {
    0: '0ms',
    25: '25ms',
    50: '0ms',
    1200: '1200ms',
    3000: '3000ms',
  },
  transitionDelay: {
    850: '850ms',
    1200: '1200ms',
    1500: '1500ms',
  },
  backgroundPosition: {
    'top-center': 'top center',
    '0-0': '0px 0px',
    '0-top': '0 top',
  },
  backgroundSize: {
    '100-100': '100% 100%',
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
