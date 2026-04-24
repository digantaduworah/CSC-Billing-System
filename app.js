// 🌐 Language
const langData = {
  en: {
    title: "Duarah Store",
    submit: "Submit Order"
  },
  as: {
    title: "দুৱাৰা ষ্ট’ৰ",
    submit: "অৰ্ডাৰ কৰক"
  }
};

function setLang(lang){
  document.getElementById("title").innerText = langData[lang].title;
  document.getElementById("submitBtn").innerText = langData[lang].submit;
}

// 📦 Service Load
function loadServices(){
  let cat = document.getElementById("category").value;
  let service = document.getElementById("service");

  if(cat === "Online Apply"){
    service.innerHTML = `
      <option>PAN Card</option>
      <option>Voter Card</option>
      <option>Income Certificate</option>
      <option>Non Creamy Layer</option>
    `;
  }
}

// 📂 Sub Service
function loadSubService(){
  let s = document.getElementById("service").value;
  let sub = document.getElementById("subService");

  if(s === "PAN Card" || s === "Voter Card"){
    sub.innerHTML = `
      <option>New Apply</option>
      <option>Correction</option>
    `;
  } else {
    sub.innerHTML = "";
  }
}

// 📤 Upload box show
function handleService(){
  document.getElementById("uploadBox").style.display = "block";
}

// 💰 Price list
const priceList = {
  "Print B/W": 5,
  "Print Color": 10,
  "Scan": 5,
  "PAN Card": 300,
  "Voter Card": 200
};

// 💵 BILL CALCULATION (FINAL MERGED VERSION)
function calculateBill(){

  let service = document.getElementById("service").value;
  let sub = document.getElementById("subService").value;
  let qty = parseInt(document.getElementById("qty")?.value) || 1;

  let total = 0;

  // PAN
  if(service === "PAN Card"){
    total = (sub === "Correction") ? 250 : 300;
  }

  // Voter
  else if(service === "Voter Card"){
    total = (sub === "Correction") ? 150 : 200;
  }

  // Electricity
  else if(service === "Electricity Bill"){
    let bill = parseInt(document.getElementById("ebillAmount")?.value) || 0;
    total = bill + 30;
  }

  // Print / Scan
  else if(service === "Print B/W" || service === "Print Color" || service === "Scan"){
    let price = priceList[service] || 0;
    total = price * qty;
  }

  // Default
  else {
    total = priceList[service] || 0;
  }

  document.getElementById("total").innerText = total;
}

// 📤 SUBMIT ORDER
function submitOrder(){

  let phone = document.getElementById("phone").value;
  let service = document.getElementById("service").value;
  let subService = document.getElementById("subService").value;
  let amount = document.getElementById("total").innerText;

  if(phone.length < 10){
    alert("Enter valid phone");
    return;
  }

  let orderId = "DS" + Date.now();

  db.collection("bookings").add({
    orderId,
    phone,
    service,
    subService,
    amount,
    status:"Pending",
    time:new Date()
  });

  alert("Order Submitted");
}

// 🔍 TRACK ORDER
function track(){

  let phone = document.getElementById("phone").value;

  db.collection("bookings").where("phone","==",phone)
  .get().then(snap=>{

    let html="";

    if(snap.empty){
      html = "No orders found";
    } else {
      snap.forEach(doc=>{
        let d = doc.data();
        html += `${d.service} - ₹${d.amount} - ${d.status}<br>`;
      });
    }

    document.getElementById("result").innerHTML = html;
  });
}

// 🔔 SOUND
let lastCount = 0;
let soundEnabled = false;

function enableSound(){
  soundEnabled = true;
}

db.collection("bookings").onSnapshot(snap=>{
  if(snap.size > lastCount && soundEnabled){
    document.getElementById("sound")?.play();
  }
  lastCount = snap.size;
});

// 🧾 PRINT BILL
function printBill(id, service, amount){

  let w = window.open("");

  w.document.write(`
    <h2>Duarah Store</h2>
    <hr>
    Order: ${id}<br>
    Service: ${service}<br>
    Amount: ₹${amount}<br>
    Date: ${new Date().toLocaleString()}
  `);

  w.print();
}
