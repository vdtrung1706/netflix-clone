import { PROFILE_DEFAULT } from '@assets';
import { selectCurrentUser } from '@store/auth/selectors.auth';
import { useSelector } from 'react-redux';
import ProfileTip from './ProfileTip';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import ProfileMenu from './ProfileMenu';

export default function Profile() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className="relative flex flex-col cursor-pointer">
      <div className="flex items-center w-full">
        <ProfileTip
          describeChild
          arrow
          placement="bottom"
          title={<ProfileMenu currentUser={currentUser} />}
        >
          <img
            src={currentUser?.photoURL ? currentUser.photoURL : PROFILE_DEFAULT}
            alt="profile"
            className="w-8 rounded"
          />
        </ProfileTip>
        <ArrowDropDownSharpIcon />
      </div>
    </div>
  );
}
