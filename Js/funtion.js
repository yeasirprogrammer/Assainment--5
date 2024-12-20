document.addEventListener("DOMContentLoaded", function () {
    const navbarBalanceElement = document.getElementById("balance");
    let navbarBalance = parseInt(navbarBalanceElement.textContent.replace("BDT", "").trim());
  
    const cards = [
      { balanceElementId: "donate-balance", inputId: "add-money", buttonId: "donete-money" },
      { balanceElementId: "donate-balance-2", inputId: "add-money-2", buttonId: "donete-money-2" }, 
      { balanceElementId: "donate-balance-3", inputId: "add-money-3", buttonId: "donete-money-3" }, 
    ];
  
    const modal = document.getElementById("my_modal_5");
    const modalCloseButton = modal.querySelector("button");
  
    modalCloseButton.addEventListener("click", function () {
      modal.close();
    });
  
    function handleDonate(card) {
      const balanceElement = document.getElementById(card.balanceElementId);
      const inputElement = document.getElementById(card.inputId);
      const buttonElement = document.getElementById(card.buttonId);
  
      buttonElement.addEventListener("click", function () {
        const donateAmount = parseInt(inputElement.value.trim());
  
        if (isNaN(donateAmount) || donateAmount <= 0) {
          alert("Please enter a valid donation amount!");
          return;
        }
  
        if (donateAmount > navbarBalance) {
          alert("Insufficient balance in your account!");
          return;
        }
  
        const currentCardBalance = parseInt(balanceElement.textContent.replace("BDT", "").trim());
        balanceElement.textContent = `${currentCardBalance + donateAmount} BDT`;
  
        navbarBalance -= donateAmount;
        navbarBalanceElement.textContent = `${navbarBalance} BDT`;
  
        modal.showModal();
  
        const dateTime = new Date();
        const donationData = {
          amount: donateAmount,
          card: card.balanceElementId,
          date: dateTime.toLocaleDateString(),
          time: dateTime.toLocaleTimeString(),
        };
  
        const history = JSON.parse(localStorage.getItem("donationHistory")) || [];
        history.push(donationData);
        localStorage.setItem("donationHistory", JSON.stringify(history));
  
        inputElement.value = "";
      });
    }
  
    cards.forEach(handleDonate);
  
    const historySection = document.getElementById("history-section");
    if (historySection) {
      const history = JSON.parse(localStorage.getItem("donationHistory")) || [];
      if (history.length === 0) {
        historySection.innerHTML = "<p>No donation history found.</p>";
      } else {
        historySection.classList.remove("hidden");
        history.forEach(entry => {
          const historyCard = document.createElement("div");
          historyCard.className = "p-4 mb-4 bg-white rounded shadow";
          historyCard.innerHTML = `
            <p><strong>Donation Amount:</strong> ${entry.amount} BDT</p>
            <p><strong>Date:</strong> ${entry.date}</p>
            <p><strong>Time:</strong> ${entry.time}</p>
            <p><strong>Card:</strong> ${entry.card}</p>
          `;
          historySection.appendChild(historyCard);
        });
      }
    }
  });
  