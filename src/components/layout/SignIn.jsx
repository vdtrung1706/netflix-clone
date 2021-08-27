import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaCheck } from 'react-icons/fa';
import { InputLogin } from '../common/Inputs';
import { ButtonDefault } from '../common/Buttons';
import isEmail from 'validator/lib/isEmail';
import cx from 'classnames';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <div
      name="LoginBody"
      className="flex flex-col pt-5 px-5% min-h-550px w-full pb-8 rounded box-border"
    >
      <div className="flex-grow">
        <h1 className="text-3xl text-white font-bold mb-7">Sign In</h1>
        <form>
          <InputLogin
            type="text"
            id="login_email"
            name="LoginEmail"
            value={email}
            setValue={setEmail}
            placeholder="Email or phone number"
            maxLength={50}
            validation={isEmail}
            validationMessage="Please enter a valid email or phone number."
            className="pb-4"
          />
          <InputLogin
            type="password"
            id="login_password"
            name="LoginPassword"
            value={password}
            setValue={setPassword}
            placeholder="Password"
            validation={new RegExp('^(?=.*[a-z])(?=.*[!@#$%^&*])(?=.{8,})')}
            validationMessage="Password requires atleast 8 characters and a special one."
            className="pb-4"
          />
          <ButtonDefault type="submit" className="w-full mt-5 h-12">
            Sign In
          </ButtonDefault>
        </form>

        <div className="flex justify-between items-center">
          <div className="relative inline-block flex-grow select-none text-base pl-5">
            <input
              type="checkbox"
              className="absolute top-0 box-border left-0 opacity-0 mr-2 p-0 text-white"
              name="rememberMe"
              id="bxid_rememberMe_true"
              value="true"
              checked={rememberMe}
              onChange={() => {}}
            />
            <button
              htmlFor="bxid_rememberMe_true"
              className="relative flex items-center leading-tight text-white-dark text-xs"
              onClick={() => setRememberMe(pre => !pre)}
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

        <button className="flex gap-2 items-center text-xs text-gray-400 mt-10">
          <FcGoogle className="h-6 w-6" />
          <div>Login with Google</div>
        </button>

        <div className="flex items-center text-base mt-5">
          <span className="text-gray-400">New to Netflix?</span>
          <span className="text-white cursor-pointer ml-1 hover:underline">
            Sign up Now.
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
