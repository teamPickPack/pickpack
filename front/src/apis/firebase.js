import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import Send from "./send";
import store from "../store/store";
import { userAction } from "../store/userSlice";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
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

export const messaging = getMessaging();

export const getFirebasToken = async () => {
  onMessage(messaging, (res) => {
    console.log("PICK PACK RESPONSE : ", res);

    const likeCountData = [
      res.data.OnewayLikeCount,
      res.data.RoundwayLikeCount,
    ];

    console.log(likeCountData);

    if (+likeCountData[0] + +likeCountData[1] > 0) {
      store.dispatch(userAction.setLikeCount(likeCountData));
      store.dispatch(userAction.setFirebaseOnMessage(true));
    }
  });

  requestPermission();

  await getToken(messaging, {
    vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
  })
    .then((token) => {
      console.log(token);
      Send.post(`/api/member/fcm`, {
        targetToken: token,
        memberId: store.getState().user.memberId / 2373.15763 - 7,
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
