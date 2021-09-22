import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const WatchPageTip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgb(47, 47, 47)',
    boxShadow: theme.shadows[5],
    margin: '0 0 4px 0',
    padding: 0,
    maxWidth: 'none',
    borderRadius: '2px',
  },
}));

export default WatchPageTip;
