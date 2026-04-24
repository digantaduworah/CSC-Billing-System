// Your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// 🔥 THIS IS THE FIX (db creation)
const db = firebase.firestore();

console.log("Firebase Connected");
function submitOrder() {
  try {
    let phone = document.getElementById("phone").value;
    let service = document.getElementById("service").value;
    let amount = document.getElementById("total").innerText;

    if (!phone || !service) {
      alert("Fill all fields");
      return;
    }

    let orderId = "CSC" + Date.now();

    db.collection("orders").add({
      phone,
      service,
      amount,
      orderId,
      status: "Pending",
      time: new Date().toString()
    }).then(() => {
      alert("Order Submitted Successfully!");
      document.getElementById("qrBox").style.display = "none";
    });

  } catch (e) {
    console.log(e);
    alert("System Error");
  }
}
