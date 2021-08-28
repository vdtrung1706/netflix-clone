import isEmail from 'validator/lib/isEmail';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { InputLogin } from '../common/Inputs';
import { ButtonDefault } from '../common/Buttons';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/devtools/userSlice';

const SignUp = ({ setIsSignIn }) => {
  const [email, setEmail] = useState('');
  const [displayName, setdisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [comfirm, setComfirm] = useState('');

  const dispatch = useDispatch();

  const onSubmit = () => {
    if (password === comfirm) {
      dispatch(userActions.signUpStart({ email, password, displayName }));
    }
  };

  return (
    <div name="signupWrapper" className="flex-grow">
      <h1 name="title" className="text-3xl text-white font-bold mb-7">
        Sign Up
      </h1>

      <div name="signupForm" className="flex flex-col gap-2">
        <InputLogin
          type="text"
          id="signup_email"
          name="email"
          value={email}
          setValue={setEmail}
          placeholder="Email or phone number"
          maxLength={50}
          validation={isEmail}
          validationMessage="Please enter a valid email or phone number."
        />
        <InputLogin
          type="password"
          id="signup_password"
          name="password"
          value={password}
          setValue={setPassword}
          placeholder="Password"
          validation={new RegExp('^(?=.*[a-z])(?=.*[!@#$%^&*])(?=.{8,})')}
          validationMessage="Password requires atleast 8 characters and a special one."
        />
        <InputLogin
          type="password"
          id="signup_comfirm"
          name="comfirm"
          value={comfirm}
          setValue={setComfirm}
          placeholder="Comfirm password"
          validation={password}
          validationMessage="Comfirm password needs to be match with the one above."
        />
        <InputLogin
          type="text"
          id="display_name"
          name="displayName"
          value={displayName}
          setValue={setdisplayName}
          placeholder="Display name"
          maxLength={50}
        />
        <ButtonDefault onClick={onSubmit} className="w-full mt-5 h-12">
          Sign Up
        </ButtonDefault>
      </div>

      <div className="flex justify-between items-center mt-3">
        <a href="/help" className="text-xs text-white-dark hover:underline">
          Need help?
        </a>
      </div>

      <button
        name="signInWithGoogle"
        onClick={() => dispatch(userActions.signInGoogleStart())}
        className="flex gap-2 items-center text-xs text-gray-400 mt-10"
      >
        <FcGoogle className="h-6 w-6" />
        <span>Login with Google</span>
      </button>

      <div name="questionSignIn" className="flex items-center text-base mt-5">
        <span className="text-gray-400 whitespace-nowrap">
          Already have an account?
        </span>
        <button
          onClick={() => setIsSignIn(pre => !pre)}
          className="text-white cursor-pointer ml-1 hover:underline whitespace-nowrap"
        >
          Sign in Now.
        </button>
      </div>
    </div>
  );
};

export default SignUp;
