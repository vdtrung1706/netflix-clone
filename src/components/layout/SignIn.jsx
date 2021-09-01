import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FcGoogle } from 'react-icons/fc';
import { FaCheck } from 'react-icons/fa';
import isEmail from 'validator/lib/isEmail';
import cx from 'classnames';
import { userSlice } from '../../redux/devtools/userSlice';
import LoginInput from '../inputs/LoginInput';
import PrimaryButton from '../buttons/PrimaryButton';

export default function SignIn({ setIsSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const dispatch = useDispatch();

  const hanldeSubmit = () => {
    dispatch(userSlice.actions.signInEmailStart({ email, password }));
  };

  return (
    <div name="loginWrapper" className="flex-grow">
      <h1 name="title" className="text-3xl text-white font-bold mb-7">
        Sign In
      </h1>

      <div name="loginForm" className="flex flex-col gap-2">
        <LoginInput
          type="text"
          id="signin_email"
          name="email"
          value={email}
          setValue={setEmail}
          placeholder="Email or phone number"
          maxLength={50}
          validation={isEmail}
          validationMessage="Please enter a valid email or phone number."
        />
        <LoginInput
          type="password"
          id="signin_password"
          name="password"
          value={password}
          setValue={setPassword}
          placeholder="Password"
          validation={new RegExp('^(?=.*[a-z])(?=.*[!@#$%^&*])(?=.{8,})')}
          validationMessage="Password requires atleast 8 characters and a special one."
        />
        <PrimaryButton
          type="submit"
          onClick={hanldeSubmit}
          className="w-full mt-5 h-12"
        >
          Sign In
        </PrimaryButton>
      </div>

      <div name="rememberMe" className="flex justify-between items-center mt-3">
        <div className="relative inline-block flex-grow select-none text-base pl-5">
          <input
            type="checkbox"
            name="rememberMe"
            id="bxid_rememberMe_true"
            value="true"
            checked={rememberMe}
            onChange={() => {}}
            className="absolute top-0 box-border left-0 opacity-0 mr-2 p-0 text-white"
          />
          <button
            htmlFor="bxid_rememberMe_true"
            onClick={() => setRememberMe(pre => !pre)}
            className="relative flex items-center leading-tight text-white-dark text-xs"
          >
            <FaCheck
              className={cx(
                'absolute block rounded-sm bg-gray-400 h-4 -left-5 w-4 p-1px transition-all duration-200',
                {
                  'text-black-pure': rememberMe,
                  'text-gray-400': !rememberMe,
                }
              )}
            />
            <span className="ml-1">Remember me</span>
          </button>
        </div>

        <a href="/" className="text-xs text-white-dark hover:underline">
          Need help?
        </a>
      </div>

      <button
        name="loginWithGoogle"
        onClick={() => dispatch(userSlice.actions.signInGoogleStart())}
        className="flex gap-2 items-center text-xs text-gray-400 mt-10"
      >
        <FcGoogle className="h-6 w-6" />
        <span>Login with Google</span>
      </button>

      <div name="signUpQuestion" className="flex items-center text-base mt-5">
        <span className="text-gray-400">New to Netflix?</span>
        <button
          onClick={() => setIsSignIn(pre => !pre)}
          className="text-white cursor-pointer ml-1 hover:underline"
        >
          Sign up Now.
        </button>
      </div>
    </div>
  );
}
