const kraPin = document.getElementById("kraPin");
const companyName = document.getElementById("companyName");
const address = document.getElementById("address");
const email = document.getElementById("email");
const phoneNo = document.getElementById("phoneNo");
const periodFrom = document.getElementById("periodFrom");
const periodTo = document.getElementById("periodTo");
const salesValue = document.getElementById("salesValue");
const vat = document.getElementById("vat");
const payableLevy = document.getElementById("payableLevy");
const successDiv = document.getElementsByClassName("success-div")[0];
const submitBtn = document.getElementById("btnSubmit");

const url = "http://localhost:3000/standards-levy";
const headers = {
  "Content-Type": "application/json",
};

// generate the levy payable
function generatePayableLevy() {
  if (vat.val != "" && salesValue.value === "") {
    alert("Enter the Total Value of Sales to calculate the payable amount");
  } else if (vat.val != "" && salesValue.value != "") {
    const levyRate = 0.002;
    const totalLevyPayable = Math.ceil(
      (salesValue.value - vat.value) * levyRate
    );

    payableLevy.value = totalLevyPayable;
  }
}

// populate the payable amount automatically
vat.addEventListener("change", generatePayableLevy);

// submit the form to server
const submitForm = function (e) {
  e.preventDefault();

  const data = {
    companyName: companyName.value,
    kraPin: kraPin.value,
    email: email.value,
    phoneNo: phoneNo.value,
    address: address.value,
    periodFrom: periodFrom.value,
    periodTo: periodTo.value,
    salesValue: salesValue.value,
    vat: vat.value,
    payableLevy: payableLevy.value,
  };

  fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 201) {
        successDiv.style.opacity = "1";
        // hide the div after 5 seconds
        setTimeout(() => {
          successDiv.style.opacity = "0";
          location.reload();
        }, 5000);
      }
    });
};

submitBtn.addEventListener("click", submitForm);
