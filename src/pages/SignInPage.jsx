import { signInWithGoogle } from '../firebase';

const SignInPage = () => {
  return <button onClick={signInWithGoogle}>Sign In With Google</button>;
};

export default SignInPage;
