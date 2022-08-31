// Scripts for firebase and firebase messaging
/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
//REPLACE YOUR FIREBASE PROJECT SETTINGS
const firebaseConfig = {
  apiKey: "**************************",
  authDomain: "**********************",
  databaseURL: "***************************",
  projectId: "**********************",
  storageBucket: "***************",
  messagingSenderId: "****************",
  appId: "********************",
  measurementId: "*************************",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  /* eslint-disable-next-line no-restricted-globals */
  self.registration.showNotification(notificationTitle, notificationOptions);
});
