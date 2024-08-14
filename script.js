document.addEventListener("DOMContentLoaded", function () {
  const frequencyInputs = document.querySelectorAll(".time input");
  const moneySpans = document.querySelectorAll(".money");
  const customAmountInput = document.getElementById("custom-amount");
  const donateBtn = document.getElementById("donate-btn");
  const donationForm = document.getElementById("donation-form");
  const qrcodeContainer = document.getElementById("qrcode");
  const modal = document.getElementById("confirmation-modal");
  const closeButton = document.querySelector(".close-button");
  const confirmDonationButton = document.getElementById("confirm-donation");
  const donationDetails = document.getElementById("donation-details");
  const totalDonationsElement = document.getElementById("total-donations");

  let selectedAmount = null;
  let selectedFrequency = "monthly";
  let totalDonations = 0;

  // Event listener for frequency selection
  frequencyInputs.forEach((input) => {
    input.addEventListener("change", function () {
      selectedFrequency = this.value;
    });
  });

  // Event listener for amount selection
  moneySpans.forEach((span) => {
    span.addEventListener("click", function () {
      moneySpans.forEach((s) => s.classList.remove("active"));
      this.classList.add("active");
      customAmountInput.value = "";
      selectedAmount = this.dataset.amount;
    });
  });

  // Event listener for custom amount input
  customAmountInput.addEventListener("input", function () {
    moneySpans.forEach((s) => s.classList.remove("active"));
    selectedAmount = this.value;
  });

  // Event listener for form submission
  donationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("enter-your-name").value.trim();
    const email = document.getElementById("enter-your-email").value.trim();
    const honorName = document.getElementById("honor-name").value.trim();
    const coverTransaction =
      document.getElementById("cover-transaction").checked;

    if (!selectedAmount || selectedAmount <= 0) {
      alert("Please select or enter a valid amount.");
      return;
    }

    if (!name) {
      alert("Please enter your name.");
      return;
    }

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    // Show confirmation modal
    modal.style.display = "block";
    donationDetails.innerHTML = `
            <p>Frequency: ${
              selectedFrequency.charAt(0).toUpperCase() +
              selectedFrequency.slice(1)
            }</p>
            <p>Amount: $${selectedAmount}</p>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Honor Name: ${honorName || "N/A"}</p>
            <p>Cover Transaction: ${coverTransaction ? "Yes" : "No"}</p>
        `;
  });

  // Event listener for modal close button
  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Event listener for confirming donation
  confirmDonationButton.addEventListener("click", function () {
    const name = document.getElementById("enter-your-name").value.trim();
    const email = document.getElementById("enter-your-email").value.trim();
    const coverTransaction =
      document.getElementById("cover-transaction").checked;

    const qrText = `https://your-donation-link.com?amount=${selectedAmount}&frequency=${selectedFrequency}&coverTransaction=${coverTransaction}&name=${encodeURIComponent(
      name
    )}&email=${encodeURIComponent(email)}`;

    qrcodeContainer.innerHTML = ""; // Clear any existing QR code
    qrcodeContainer.style.display = "flex"; // Make the QR code visible

    new QRCode(qrcodeContainer, {
      text: qrText,
      width: 128,
      height: 128,
    });

    // Add animation class
    qrcodeContainer.classList.add("show-qr");

    // Animation effect for QR code and button
    donateBtn.classList.add("animate-button");

    // Update total donations
    totalDonations += parseFloat(selectedAmount);
    totalDonationsElement.textContent = totalDonations;

    // Close the modal
    modal.style.display = "none";
  });

  // Close modal when clicking outside of it
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
