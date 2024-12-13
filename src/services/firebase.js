import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { createContext, useContext, useState, useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCE8t1OfuDDwdcAk8h8m-CdoyDsOvP-g18",
  authDomain: "chattogether-98e7e.firebaseapp.com",
  projectId: "chattogether-98e7e",
  storageBucket: "chattogether-98e7e.appspot.com",
  messagingSenderId: "302724399297",
  appId: "1:302724399297:web:d85911c09d5df4774e9440",
  measurementId: "G-XXTV3SYJG8",
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(FirebaseApp);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(FirebaseApp);
const storage = getStorage(FirebaseApp);

const firebaseContext = createContext();

export const useFirebase = () => useContext(firebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signupUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signInUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signinWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      console.error("Error during Google Sign-in:", error);
      throw new Error("Google sign-in failed. Please try again.");
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user on sign-out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user when authenticated
        saveUserToFirestore(currentUser); // Save user data to Firestore
      } else {
        setUser(null); // Clear user when logged out
      }
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const saveUserToFirestore = async (user) => {
    try {
      const userDocRef = doc(firestore, "users", user.uid);
      const userSnapshot = await getDoc(userDocRef);
      if (!userSnapshot.exists()) {
        await setDoc(userDocRef, {
          userId: user.uid,
          userName: user.displayName || "Anonymous",
          email: user.email,
          profileURL: user.photoURL || "",
          createdAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Error saving user to Firestore:", error);
    }
  };

  // Fetch current user profile (optional, can be modified if necessary)
  const fetchCurrentUserProfile = async () => {
    try {
      if (!user) return null; // Ensure the user is authenticated
      const userDocRef = doc(firestore, "users", user.uid);
      const userSnapshot = await getDoc(userDocRef);
      return userSnapshot.exists() ? userSnapshot.data() : null;
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <firebaseContext.Provider
      value={{
        signupUser,
        signInUser,
        signinWithGoogle,
        signOutUser,
        user,
        fetchCurrentUserProfile,
      }}
    >
      {children}
    </firebaseContext.Provider>
  );
};

// Export auth and provider for use in other components
export { auth, provider };
