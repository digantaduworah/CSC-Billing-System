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
  document.getElementById("title").innerText = langData[lang].title;
  document.getElementById("submitBtn").innerText = langData[lang].submit;
}
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
function loadSubService(){

  let s = document.getElementById("service").value;

  let sub = document.getElementById("subService");

  if(s === "PAN Card" || s === "Voter Card"){
    sub.innerHTML = `
      <option value="">Select Option</option>
      <option>New Apply</option>
      <option>Correction</option>
    `;
  } else {
    sub.innerHTML = "";
  }
function handleService(){
  document.getElementById("uploadBox").style.display = "block";
}
function calculateBill(){

  let service = document.getElementById("service").value;
  let sub = document.getElementById("subService").value;

  let total = 0;

  if(service === "PAN Card"){
    total = (sub === "Correction") ? 250 : 300;
  }

  if(service === "Voter Card"){
    total = (sub === "Correction") ? 150 : 200;
  }

  document.getElementById("total").innerText = total;
}
  <img src="paytm-qr.png" width="200">
<h3>Total: ₹ <span id="total">0</span></h3>
}
function submitOrder(){

  let phone = document.getElementById("phone").value;

  if(phone.length < 10){
    alert("Enter valid phone");
    return;
  }

  let orderId = "DS" + Date.now();

  db.collection("bookings").add({
    orderId,
    phone,
    service: document.getElementById("service").value,
    subService: document.getElementById("subService").value,
    amount: document.getElementById("total").innerText,
    status:"Pending",
    time:new Date()
  });

  alert("Order Submitted");
}
function track(){

  let phone = document.getElementById("phone").value;

  db.collection("bookings").where("phone","==",phone)
  .get().then(snap=>{

    let html="";

    snap.forEach(doc=>{
      let d = doc.data();

      html += `${d.service} - ₹${d.amount} - ${d.status}<br>`;
    });

    document.getElementById("result").innerHTML = html;
  });

}
let last = 0;

db.collection("bookings").onSnapshot(snap=>{
  if(snap.size > last){
    document.getElementById("sound").play();
  }
  last = snap.size;
});
const priceList = {
  "Print B/W": 5,
  "Print Color": 10,
  "Scan": 5,

  "PAN Card Apply": 300,
  "Passport Apply": 200,
  "Electricity Bill": 30
};
  <input type="number" id="qty" placeholder="Enter pages" value="1" oninput="calculateBill()">
    <h3>Total Amount: ₹ <span id="total">0</span></h3>
    function calculateBill(){

  let service = document.getElementById("service").value;
  let qty = parseInt(document.getElementById("qty").value) || 1;

  let price = priceList[service] || 0;

  // 👉 Only apply quantity for print/scan
  if(service === "Print B/W" || service === "Print Color" || service === "Scan"){
    document.getElementById("total").innerText = price * qty;
  } else {
    document.getElementById("total").innerText = price;
    document.getElementById("qty").value = 1; // reset
  }

}
  let qty = parseInt(document.getElementById("qty").value) || 1;
let price = priceList[service] || 0;

let amount = (service === "Print B/W" || service === "Print Color" || service === "Scan")
  ? price * qty
  : price;

db.collection("bookings").add({
  orderId: orderId,
  phone: phone,
  service: service,
  qty: qty,
  amount: amount,
  screenshot: url,
  status: "Pending",
  time: new Date()
});
function handleServiceChange(){

  let service = document.getElementById("service").value;

  if(service === "Electricity Bill"){
    document.getElementById("ebillBox").style.display = "block";
  } else {
    document.getElementById("ebillBox").style.display = "none";
  }

  calculateBill();
}
  function calculateBill(){

  let service = document.getElementById("service").value;
  let total = 0;

  // ✅ Electricity bill logic
  if(service === "Electricity Bill"){

    let bill = parseInt(document.getElementById("ebillAmount").value) || 0;

    total = bill + 30; // ₹30 service charge

  } else {

    let qty = parseInt(document.getElementById("qty").value) || 1;
    let price = priceList[service] || 0;

    if(service === "Print B/W" || service === "Print Color"){
      total = price * qty;
    } else {
      total = price;
    }

  }

  document.getElementById("total").innerText = total;
}
  let service = document.getElementById("service").value;
let amount = document.getElementById("total").innerText;

let ebill = "";

if(service === "Electricity Bill"){
  ebill = document.getElementById("ebillAmount").value;
}

db.collection("bookings").add({
  orderId: orderId,
  phone: phone,
  service: service,
  ebillAmount: ebill,
  amount: amount,
  screenshot: url,
  status: "Pending",
  time: new Date()
});
  Service: ${d.service}<br>

${d.ebillAmount ? "Bill: ₹" + d.ebillAmount + "<br>" : ""}

Amount: ₹ ${d.amount}<br>
  if(service === "DTH Recharge"){
  let amt = parseInt(document.getElementById("customAmount").value) || 0;
  total = amt + 20; // service charge
}
let lastCount = 0;

db.collection("bookings").onSnapshot(snap=>{

  if(snap.size > lastCount){
    document.getElementById("sound").play();
  }

  lastCount = snap.size;
});
