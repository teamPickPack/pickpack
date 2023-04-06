/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/9.19.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAGIHJBQnIsmFKqeBISzGmWJB2eZBTwkm4",
  authDomain: "pickpack-68364.firebaseapp.com",
  databaseURL: "https://pickpack-68364-default-rtdb.firebaseio.com/",
  projectId: "pickpack-68364",
  storageBucket: "pickpack-68364.appspot.com",
  messagingSenderId: "768830642867",
  appId: "1:768830642867:web:8a840e209ff01e2a126ec6",
  measurementId: "G-P5CW4X17R2",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // const channel = new BroadcastChannel("sw-message");
  // channel.postMessage(payload.notification);
  // console.log(
  //   "[firebase-messaging-sw.js] Received background message ",
  //   payload
  // );
  // // Customize notification here
  // const notificationTitle = payload.notification.title;
  // const notificationOptions = {
  //   body: payload.notification.body,
  //   icon: "/firebase-logo.png",
  // };
  // self.registration.showNotification(notificationTitle, notificationOptions);
});
