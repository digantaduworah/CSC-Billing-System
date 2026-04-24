// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBjJSoGkYlDjbPA0lqF-4yu9UWw6SpHTSQ",
  authDomain: "duarah-store.firebaseapp.com",
  projectId: "duarah-store",
  storageBucket: "duarah-store.appspot.com"
  messagingSenderId: "67666768092",
  appId: "1:67666768092:web:2cbc90004c8a2a0aac4419",
  measurementId: "G-EV5KNZ22G5"
};

// ✅ Correct initialization (compat version)
firebase.initializeApp(firebaseConfig);
db.settings({
  ignoreUndefinedProperties: true
});

// ✅ Services
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
