let currentOrderId = "";
let selectedService = "";

function book(service){
  selectedService = service;
  currentOrderId = "DS" + Date.now();

  document.getElementById("paymentBox").style.display="block";
}

function uploadAndConfirm(){

  let file = document.getElementById("paymentProof").files[0];

  if(!file){
    alert("Upload screenshot");
    return;
  }

  let ref = storage.ref("payments/"+currentOrderId+".jpg");

  ref.put(file).then(()=>{

    ref.getDownloadURL().then(url=>{

      db.collection("bookings").add({
        orderId: currentOrderId,
        service: selectedService,
        screenshot: url,
        status:"Pending",
        time:new Date()
      });

      alert("Order Submitted");

    });

  });

}
