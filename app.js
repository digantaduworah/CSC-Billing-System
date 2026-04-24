// 🌐 Language
const langData = {
  en: {
    title: "Duarah Store",
    submit: "Submit Order"
  },
  as: {
    title: "দুৱৰা ষ্ট’ৰ",
    submit: "অৰ্ডাৰ কৰক"
  }
};

function setLang(lang){
  document.getElementById("title")?.innerText = langData[lang].title;
  document.getElementById("submitBtn")?.innerText = langData[lang].submit;
}

// 📦 Service Load
function loadServices(){
  let cat = document.getElementById("category")?.value;
  let service = document.getElementById("service");

  if(!service) return;

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
  let s = document.getElementById("service")?.value;
  let sub = document.getElementById("subService");

  if(!sub) return;

  if(s === "PAN Card" || s === "Voter Card"){
    sub.innerHTML = `
      <option>New Apply</option>
      <option>Correction</option>
    `;
  } else {
    sub.innerHTML = "";
  }
}

// 🎛 UI CONTROL
function handleServiceChange() {
  let service = document.getElementById("service").value;

  document.getElementById("qtyBox").style.display = "none";
  document.getElementById("ebillBox").style.display = "none";

  if (service === "Print B/W" || service === "Print Color") {
    document.getElementById("qtyBox").style.display = "block";
  }

  if (service === "Electricity Bill") {
    document.getElementById("ebillBox").style.display = "block";
  }

  calculateBill(); // IMPORTANT
}
  // Show electricity dropdown
  if(service === "Electricity Bill"){
    document.getElementById("ebillBox").style.display = "block";
  } else {
    document.getElementById("ebillBox").style.display = "none";
  }

// 💰 Price list
const priceList = {
  "Print B/W": 10,
  "Print Color": 10,
   "Xerox B/W": 5,
 "Xerox Color": 10,
  "Scan": 5,
  "PAN Card": 300,
  "Voter Card": 200
};
// Show QR
function showQR(){

  let total = document.getElementById("total").innerText;

  if(total == 0){
    alert("Please select service first");
    return;
  }

  document.getElementById("qrBox").style.display = "block";
}
// 💵 BILL
function calculateBill() {
  let service = document.getElementById("service").value;
  let total = 0;

  if (service === "Print B/W") {
    let qty = parseInt(document.getElementById("qty").value);
    if (isNaN(qty) || qty < 1) qty = 1;
    total = qty * 5;
  }

  else if (service === "Print Color") {
    let qty = parseInt(document.getElementById("qty").value);
    if (isNaN(qty) || qty < 1) qty = 1;
    total = qty * 10;
  }

  else if (service === "Electricity Bill") {
    total = parseInt(document.getElementById("ebillAmount").value);
    if (isNaN(total)) total = 0;
  }

  else if (service === "PAN Card") {
    total = 100;
  }

  document.getElementById("total").innerText = total;
}
// 📤 SUBMIT
function submitOrder(){

  let phone = document.getElementById("phone")?.value;
  let service = document.getElementById("service")?.value;
  let subService = document.getElementById("subService")?.value;
  let amount = document.getElementById("total")?.innerText;

  if(!phone || phone.length < 10){
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

  // 🔄 RESET
  document.getElementById("phone").value = "";
  document.getElementById("total").innerText = "0";
}

// 🔍 TRACK
function track(){

  let phone = document.getElementById("trackPhone")?.value;

  if(!phone || phone.length < 10){
    alert("Enter valid phone");
    return;
  }

  db.collection("bookings").where("phone","==",phone)
  .get().then(snap=>{

    let html="";

    if(snap.empty){
      html = "<b>No orders found</b>";
    } else {
      snap.forEach(doc=>{
        let d = doc.data();

        let color = d.status === "Pending" ? "orange" :
                    d.status === "Processing" ? "blue" : "green";

        html += `
        <div style="border:1px solid ${color}; padding:10px; margin:10px; border-radius:10px;">
          <b>${d.service}</b><br>
          Order ID: ${d.orderId}<br>
          Amount: ₹${d.amount}<br>
          Status: <span style="color:${color}">${d.status}</span>
        </div>`;
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
  alert("Sound Enabled");
}

db.collection("bookings").onSnapshot(snap=>{
  if(snap.size > lastCount && soundEnabled){
    document.getElementById("sound")?.play();
  }
  lastCount = snap.size;
});

// 🧾 PRINT
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
