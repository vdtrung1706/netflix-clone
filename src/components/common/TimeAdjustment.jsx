import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const TimeAdjustment = styled(Slider)({
  color: '#ababab',
  height: 3,
  borderRadius: 0,
  '& .MuiSlider-track': {
    border: 'none',
    backgroundColor: '#e50914',
  },
  '& .MuiSlider-thumb': {
    height: 12,
    width: 12,
    transition: 'width 0.1s, height 0.1s',
    backgroundColor: '#e50914',
    border: '2px solid #e50914',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:hover': {
      height: 16,
      width: 16,
    },
    '&:before': {
      display: 'none',
    },
  },
});

export default TimeAdjustment;
