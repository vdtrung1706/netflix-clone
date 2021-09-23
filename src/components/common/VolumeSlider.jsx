import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const DefaultVolumeSlider = styled(Slider)({
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

const VolumeSlider = ({ volume, setVolume }) => {
  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
    }
  }

  return (
    <div className="py-5 m-auto">
      <DefaultVolumeSlider
        sx={{
          '& input[type="range"]': {
            WebkitAppearance: 'slider-vertical',
          },
        }}
        min={0}
        max={100}
        value={volume}
        orientation="vertical"
        valueLabelDisplay="off"
        onChange={(_, value) => setVolume(value)}
        onKeyDown={preventHorizontalKeyboardNavigation}
      />
    </div>
  );
};

export default VolumeSlider;
