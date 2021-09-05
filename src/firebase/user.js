import { auth, firestore } from '.';

export const createUserProfileDocument = async (user, addtionalInfo) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt: Date.now(),
        ...addtionalInfo,
      });
    } catch (error) {
      console.error('Error creating user', error.message);
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;

  try {
    const userDocument = await firestore.collection('users').doc(uid).get();
    return { uid, ...userDocument.data() };
  } catch (error) {
    console.error('Error fetching user', error.message);
  }
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribeFromAuth = auth.onAuthStateChanged((userAuth) => {
      unsubscribeFromAuth();
      resolve(userAuth);
    }, reject);
  });
};
