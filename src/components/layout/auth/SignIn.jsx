import LoginInput from '@components/forms/LoginInput';
import { authActions } from '@store/auth/slice.auth';
import { loginFadeInVariants } from '@utils/motion.utils';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import isEmail from 'validator/lib/isEmail';

export default function SignIn({ setIsSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const dispatch = useDispatch();

  const handlePasswordChange = useCallback((value) => {
    setPassword(value);
  }, []);

  const handleEmailChange = useCallback((value) => {
    setEmail(value);
  }, []);

  const hanldeSubmit = () => {
    dispatch(authActions.signInEmailStart({ email, password }));
  };

  return (
    <motion.div
      variants={loginFadeInVariants}
      initial="initial"
      animate="animate"
      className="flex-grow"
    >
      <h1 className="text-3xl font-bold text-white mb-7">Sign In</h1>

      <div className="flex flex-col gap-2">
        <LoginInput
          type="text"
          id="signin_email"
          name="email"
          value={email}
          setValue={handleEmailChange}
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
          setValue={handlePasswordChange}
          placeholder="Password"
          validation={new RegExp('^(?=.*[a-z])(?=.*[!@#$%^&*])(?=.{8,})')}
          validationMessage="Password requires atleast 8 characters and a special one."
        />
        <button
          type="submit"
          onClick={hanldeSubmit}
          className="block w-full h-12 mt-5 font-bold text-white rounded bg-red hover:bg-red-hover"
        >
          Sign In
        </button>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="relative flex-grow inline-block pl-5 text-base select-none">
          <input
            type="checkbox"
            name="rememberMe"
            id="bxid_rememberMe_true"
            value="true"
            checked={rememberMe}
            onChange={() => {}}
            className="box-border absolute top-0 left-0 p-0 mr-2 text-white opacity-0"
          />
          <button
            htmlFor="bxid_rememberMe_true"
            onClick={() => setRememberMe((pre) => !pre)}
            className="relative flex items-center text-xs leading-tight text-white-dark"
          >
            <FaCheck
              className={cx(
                'absolute block rounded-sm bg-gray-400 h-4 -left-5 w-4 p-1px transition-all duration-200',
                {
                  'text-black-pure': rememberMe,
                  'text-gray-400': !rememberMe,
                },
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
        onClick={() => dispatch(authActions.signInGoogleStart())}
        className="flex items-center gap-2 mt-10 text-xs text-gray-400"
      >
        <FcGoogle className="w-6 h-6" />
        <span>Login with Google</span>
      </button>

      <div className="flex items-center mt-5 text-base">
        <span className="text-gray-400">New to Netflix?</span>
        <button
          onClick={() => setIsSignIn((pre) => !pre)}
          className="ml-1 text-white cursor-pointer hover:underline"
        >
          Sign up Now.
        </button>
      </div>
    </motion.div>
  );
}
