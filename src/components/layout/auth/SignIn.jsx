import LoginInput from '@components/forms/LoginInput';
import CheckIcon from '@mui/icons-material/Check';
import { authActions } from '@store/auth/slice.auth';
import { loginFadeInVariants } from '@utils/motion.utils';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import isEmail from 'validator/lib/isEmail';

export default function SignIn({ setIsSignIn }) {
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('test1234@!');
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
            className="relative flex items-center text-xs leading-tight text-grey-txt"
          >
            <CheckIcon
              fontSize="small"
              className={cx(
                'absolute block rounded-sm bg-grey-txt text-black h-4 -left-5 transition-all duration-200',
                {
                  'text-opacity-100': rememberMe,
                  'text-opacity-0': !rememberMe,
                },
              )}
            />
            <span className="ml-1">Remember me</span>
          </button>
        </div>

        <a href="/" className="text-xs text-grey-txt hover:underline">
          Need help?
        </a>
      </div>

      <button
        onClick={() => dispatch(authActions.signInGoogleStart())}
        className="flex items-center gap-2 mt-10 text-xs text-gray-400"
      >
        <div className="w-5 h-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
          >
            <path
              d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"
              fill="#fbbb00"
            />
            <path
              d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"
              fill="#518ef8"
            />
            <path
              d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
              fill="#28b446"
            />
            <path
              d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"
              fill="#f14336"
            />
          </svg>
        </div>
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
