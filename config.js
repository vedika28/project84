import firebase from "firebase";

require("@firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyABNLT9lJKPUcb01c-jRMddXgG1tFc1Pz4",
  authDomain: "barter-app-ba5de.firebaseapp.com",
  projectId: "barter-app-ba5de",
  storageBucket: "barter-app-ba5de.appspot.com",
  messagingSenderId: "118974000688",
  appId: "1:118974000688:web:939ec33992ed769ce687f5",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
