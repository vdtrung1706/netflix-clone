import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const ProfileTip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    color: 'rgb(255, 255, 255)',
    padding: 0,
    marginRight: 10,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
    border: 0,
    fontSize: '16px',
    marginLeft: 5,
  },
}));

export default ProfileTip;
