import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onBackgroundMessage,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAGIHJBQnIsmFKqeBISzGmWJB2eZBTwkm4",
  authDomain: "pickpack-68364.firebaseapp.com",
  databaseURL: "https://pickpack-68364-default-rtdb.firebaseio.com/",
  projectId: "pickpack-68364",
  storageBucket: "pickpack-68364.appspot.com",
  messagingSenderId: "768830642867",
  appId: "1:768830642867:web:8a840e209ff01e2a126ec6",
  measurementId: "G-P5CW4X17R2",
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

console.log(3);

// // Customize notification handler
// onBackgroundMessage((payload) => {
//   const { title, body } = payload.notification;
//   const notificationOptions = {
//     body,
//     icon: "/logo192.png",
//   };
//   self.registration.showNotification(title, notificationOptions);
// });

export function requestPermission() {
  console.log("권한 요청 중...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("알림 권한이 허용됨");

      // FCM 메세지 처리
    } else {
      console.log("알림 권한 허용 안됨");
    }
  });
}

requestPermission();

getToken(messaging, {
  vapidKey:
    "BJf-FBsw_alPPyUfbcL46oKRHAkzUTw-3Mfh1fajbUK1tDHkFRltGgaAMaaZetkmJwZAQwxD2rgrwHMu-lLAeDM",
}).then((token) => {
  console.log(4);
  console.log(token);
});
