function handleServiceChange() {
  let service = document.getElementById("service").value;

  document.getElementById("qtyBox").style.display = "none";
  document.getElementById("ebillBox").style.display = "none";

  if (service === "bw" || service === "color") {
    document.getElementById("qtyBox").style.display = "block";
  }

  if (service === "ebill") {
    document.getElementById("ebillBox").style.display = "block";
  }

  calculateBill();
}

function calculateBill() {
  let service = document.getElementById("service").value;
  let total = 0;

  if (service === "bw") {
    let q = parseInt(document.getElementById("qty").value || 1);
    total = q * 5;
  }

  if (service === "color") {
    let q = parseInt(document.getElementById("qty").value || 1);
    total = q * 10;
  }

  if (service === "ebill") {
    total = parseInt(document.getElementById("ebillAmount").value || 0);
  }

  if (service === "pan") {
    total = 100;
  }

  document.getElementById("total").innerText = total;
}

function showQR() {
  document.getElementById("qrBox").style.display = "block";
}

function submitOrder() {
  let phone = document.getElementById("phone").value;
  let service = document.getElementById("service").value;
  let amount = document.getElementById("total").innerText;

  let orderId = "CSC" + Date.now();

  db.collection("orders").add({
    phone,
    service,
    amount,
    orderId,
    status: "Pending"
  });

  alert("Order Placed!");
}

function trackOrder() {
  let phone = document.getElementById("trackPhone").value;

  db.collection("orders")
    .where("phone", "==", phone)
    .get()
    .then(snap => {
      let html = "";

      snap.forEach(doc => {
        let d = doc.data();

        html += `
          <div class="card">
            <b>${d.service}</b><br>
            ₹${d.amount}<br>
            Status: ${d.status}
          </div>
        `;
      });

      document.getElementById("result").innerHTML = html;
    });
}
