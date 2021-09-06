import { Tooltip, withStyles } from '@material-ui/core';

const PreviewPopperTip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[5],
    fontSize: 16,
    fontWeight: 600,
    paddingLeft: 15,
    paddingRight: 15,
  },
  arrow: {
    color: theme.palette.common.white,
  },
}))(Tooltip);

export default PreviewPopperTip;
