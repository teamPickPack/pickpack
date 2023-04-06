import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import Send from "./send";

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

const app = initializeApp(firebaseConfig);

const requestPermission = () => {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    }
  });
};

export const messaging = getMessaging(app);

export const getFirebasToken = async () => {
  onMessage(messaging, (res) => {
    console.log("PICK PACK RESPONSE : ", res);
    // fbMessages = res.notification;
  });

  requestPermission();

  await getToken(messaging, {
    vapidKey:
      "BJf-FBsw_alPPyUfbcL46oKRHAkzUTw-3Mfh1fajbUK1tDHkFRltGgaAMaaZetkmJwZAQwxD2rgrwHMu-lLAeDM",
  })
    .then((token) => {
      Send.post(`/api/member/fcm`, {
        targetToken: token,
        title: "fcm title",
        body: "fcm body",
      }).then((res) => {
        if (res === "success") {
          try {
            console.log(res);
          } catch (err) {
            console.log(err);
          }
        }
      });
    })
    .catch((err) => {
      console.log(err, "can't get the firebase token");
    });
};
