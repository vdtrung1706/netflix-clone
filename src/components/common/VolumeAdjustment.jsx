import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const VolumeSlider = styled(Slider)({
  color: '#ababab',
  height: 100,
  borderRadius: 0,
  width: 8,
  '& .MuiSlider-track': {
    border: 'none',
    backgroundColor: '#e50914',
  },
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#e50914',
    border: '2px solid #e50914',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
});

const VolumeAdjustment = () => {
  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
    }
  }

  return (
    <div className="py-5 m-auto">
      <VolumeSlider
        sx={{
          '& input[type="range"]': {
            WebkitAppearance: 'slider-vertical',
          },
        }}
        orientation="vertical"
        valueLabelDisplay="off"
        defaultValue={20}
        onKeyDown={preventHorizontalKeyboardNavigation}
      />
    </div>
  );
};

export default VolumeAdjustment;
