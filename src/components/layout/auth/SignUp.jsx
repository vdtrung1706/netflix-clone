import { LoginInput } from '@components/forms';
import { authActions } from '@store/auth/slice.auth';
import { loginFadeInVariants } from '@utils/motion.utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import isEmail from 'validator/lib/isEmail';

export default function SignUp({ setIsSignIn }) {
  const [email, setEmail] = useState('');
  const [displayName, setdisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [comfirm, setComfirm] = useState('');

  const dispatch = useDispatch();

  const onSubmit = () => {
    if (password === comfirm) {
      dispatch(authActions.signUpStart({ email, password, displayName }));
    }
  };

  return (
    <motion.div
      variants={loginFadeInVariants}
      initial="initial"
      animate="animate"
      className="flex-grow"
    >
      <h1 className="text-3xl font-bold text-white mb-7">Sign Up</h1>

      <div className="flex flex-col gap-2">
        <LoginInput
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
        <LoginInput
          type="password"
          id="signup_password"
          name="password"
          value={password}
          setValue={setPassword}
          placeholder="Password"
          validation={new RegExp('^(?=.*[a-z])(?=.*[!@#$%^&*])(?=.{8,})')}
          validationMessage="Password requires atleast 8 characters and a special one."
        />
        <LoginInput
          type="password"
          id="signup_comfirm"
          name="comfirm"
          value={comfirm}
          setValue={setComfirm}
          placeholder="Comfirm password"
          validation={password}
          validationMessage="Comfirm password needs to be match with the one above."
        />
        <LoginInput
          type="text"
          id="display_name"
          name="displayName"
          value={displayName}
          setValue={setdisplayName}
          placeholder="Display name"
          maxLength={50}
        />
        <button
          onClick={onSubmit}
          className="block w-full h-12 mt-5 font-bold text-white rounded bg-red hover:bg-red-hover"
        >
          Sign Up
        </button>
      </div>

      <div className="flex items-center justify-between mt-3">
        <a href="/help" className="text-xs text-white-dark hover:underline">
          Need help?
        </a>
      </div>

      <div className="flex items-center mt-5 text-base">
        <span className="text-gray-400 whitespace-nowrap">
          Already have an account?
        </span>
        <button
          onClick={() => setIsSignIn((pre) => !pre)}
          className="ml-1 text-white cursor-pointer hover:underline whitespace-nowrap"
        >
          Sign in Now.
        </button>
      </div>

      <button
        onClick={() => dispatch(authActions.signInGoogleStart())}
        className="flex items-center gap-2 mt-5 text-xs text-gray-400"
      >
        <FcGoogle className="w-6 h-6" />
        <span>Login with Google</span>
      </button>
    </motion.div>
  );
}
