import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [Name, setName] = useState();

  function SignUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function Login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  //storing of userData

  const storeUserData = async (uid, username) => {
    const usersRef = collection(db, "users");
    const docRef = doc(usersRef, uid);
    return setDoc(docRef, {
      username: username,
    })
      .then(() => {
        console.log("User data stored successfully!");
      })
      .catch((error) => {
        console.error("Error storing user data: ", error);
      });
  };

  // Storing saved data for a user
  const storeSavedData = async (uid, saveList) => {
    const savedDataRef = collection(db, "savedData"); // Assuming "savedData" is the collection name for saved data
    const userSavedDataRef = doc(savedDataRef, uid);
    try {
      await setDoc(userSavedDataRef, {
        saveList: saveList,
      });
      console.log("Saved data stored successfully!");
    } catch (error) {
      console.error("Error storing saved data: ", error);
    }
  };


  // display stored data
  const getUserData = async (uid) => {
    const userRef = doc(db, "users", uid);

    return getDoc(userRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          return userData.username;
        } else {
          console.log("User document does not exist");
          return null; // Or handle as needed
        }
      })
      .catch((error) => {
        console.error("Error getting user data: ", error);
        return null; // Or handle as needed
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        // setName(getUserData(user.uid))
        getUserData(user.uid)
          .then((username) => {
            setName(username);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      } else {
        setCurrentUser(null);
        setName(null);
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    SignUp,
    Login,
    storeUserData,
    storeSavedData,
    Name,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
