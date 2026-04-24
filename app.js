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
