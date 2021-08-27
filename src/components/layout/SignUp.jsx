import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { InputLogin } from '../common/Inputs';
import { ButtonDefault } from '../common/Buttons';
import isEmail from 'validator/lib/isEmail';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

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
            id="signin_email"
            name="SignEmail"
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
            id="signin_password"
            name="SiginPassword"
            value={password}
            setValue={setPassword}
            placeholder="Password"
            validation={new RegExp('^(?=.*[a-z])(?=.*[!@#$%^&*])(?=.{8,})')}
            validationMessage="Password requires atleast 8 characters and a special one."
            className="pb-4"
          />
          <InputLogin
            type="password"
            id="sign_repassword"
            name="SignupRepassword"
            value={repassword}
            setValue={setRepassword}
            placeholder="Repassword"
            validation={password}
            validationMessage="Repassword needs to be match with the password above."
            className="pb-4"
          />
          <ButtonDefault type="submit" className="w-full mt-5 h-12">
            Sign In
          </ButtonDefault>
        </form>

        <div className="flex justify-between items-center">
          <a href="/" className="text-xs text-white-dark hover:underline">
            Need help?
          </a>
        </div>

        <button className="flex gap-2 items-center text-xs text-gray-400 mt-10">
          <FcGoogle className="h-6 w-6" />
          <div>Login with Google</div>
        </button>

        <div className="flex items-center text-base mt-5">
          <span className="text-gray-400">Already have an account?</span>
          <span className="text-white cursor-pointer ml-1 hover:underline">
            Sign in Now.
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
