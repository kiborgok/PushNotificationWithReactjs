import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage
} from "firebase/messaging";

//REPLACE YOUR FIREBASE PROJECT SETTINGS
var firebaseConfig = {
  apiKey: "********************************",
  authDomain: "******************************",
  databaseURL: "***************************",
  projectId: "***********************",
  storageBucket: "***************************",
  messagingSenderId: "********************8",
  appId: "*******************************",
  measurementId: "***********",
};

initializeApp(firebaseConfig);  

export const messaging = getMessaging();

export const requestForToken = () => {
  //Get your vapidKey from your firebase service_account
  //https://console.firebase.google.com/u/0/project/biashara-hub/settings/serviceaccounts/adminsdk
  return getToken(messaging, {
    vapidKey: "****************************************************",
  })
    .then((currentToken) => {
      if (currentToken) {
        return currentToken;
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        return "No registration token available. Request permission to generate one.";
      }
    })
    .catch((err) => {
      return "An error occurred while retrieving token. " + err;
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
