import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const PreviewPopperTip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[5],
    fontSize: 16,
    fontWeight: 600,
    paddingLeft: 15,
    paddingRight: 15,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
    border: 0,
  },
}));

export default PreviewPopperTip;
