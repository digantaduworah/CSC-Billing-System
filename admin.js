db.collection("orders").onSnapshot(snapshot => {

  let html = "";
  let total = 0;

  snapshot.forEach(doc => {
    let d = doc.data();
    total += Number(d.amount);

    html += `
      <div class="card">
        <b>${d.service}</b><br>
        ₹${d.amount}<br>
        📞 ${d.phone}<br>
        Status: ${d.status}<br>

        <button onclick="updateStatus('${doc.id}','Processing')">Processing</button>
        <button onclick="updateStatus('${doc.id}','Done')">Done</button>
      </div>
    `;
  });

  document.getElementById("orders").innerHTML = html;

  document.getElementById("stats").innerHTML = `
    <div class="card">
      <h3>Total Income: ₹${total}</h3>
      <h3>Total Orders: ${snapshot.size}</h3>
    </div>
  `;
});

function updateStatus(id, status) {
  db.collection("orders").doc(id).update({
    status: status
  });
}
function logout() {
  localStorage.removeItem("admin");
  window.location.href = "login.html";
}
