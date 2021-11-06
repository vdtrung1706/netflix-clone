import { PROFILE_DEFAULT } from '@assets';
import { selectCurrentUser } from '@store/auth/selectors.auth';
import { useSelector } from 'react-redux';
import ProfileTip from './ProfileTip';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import ProfileMenu from './ProfileMenu';
import { useState } from 'react';
import { ClickAwayListener } from '@mui/material';

export default function Profile() {
  const currentUser = useSelector(selectCurrentUser);
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <button
      onClick={handleTooltipOpen}
      className="relative flex flex-col cursor-pointer"
    >
      <div className="flex items-center w-full">
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <div>
            <ProfileTip
              open={open}
              onClose={handleTooltipClose}
              arrow
              disableFocusListener
              disableHoverListener
              disableTouchListener
              placement="bottom"
              PopperProps={{
                disablePortal: true,
              }}
              title={<ProfileMenu currentUser={currentUser} />}
            >
              <img
                src={
                  currentUser?.photoURL ? currentUser.photoURL : PROFILE_DEFAULT
                }
                alt="profile"
                className="w-8 rounded"
              />
            </ProfileTip>
          </div>
        </ClickAwayListener>
        <ArrowDropDownSharpIcon />
      </div>
    </button>
  );
}
