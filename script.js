console.log("Script is Running");

const cardContainer = document.getElementById("card-container");
const allCardsLink = document.getElementById("all-cards-link");
const monsterCardsLink = document.getElementById("monster-cards-link");
const spellCardsLink = document.getElementById("spell-cards-link");
const trapCardsLink = document.getElementById("trap-cards-link");
const feedbackLink = document.getElementById("feedback-link");
const feedbackForm = document.getElementById("feedback-form");

allCardsLink.addEventListener("click", () => filterCards("All Cards"));
monsterCardsLink.addEventListener("click", () => filterCards("Monster Cards"));
spellCardsLink.addEventListener("click", () => filterCards("Spell Cards"));
trapCardsLink.addEventListener("click", () => filterCards("Trap Cards"));
feedbackLink.addEventListener("click", () => openFeedbackForm());

fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
  .then(response => response.json())
  .then(info => renderCards(info.data));

function renderCards(jsonData) {
  cardContainer.innerHTML = ""; // Clear previous cards

  jsonData.forEach(singleCardImgList => {
    const imageList = singleCardImgList.card_images;
    const marketPrice = singleCardImgList.card_prices;

    imageList.forEach(displayImage => {
      const img = document.createElement("img");
      const cardMarketPrice = marketPrice.length > 0 ? marketPrice[0].cardmarket_price : "N/A";
      img.src = displayImage.image_url;
      cardContainer.appendChild(img);

      const displayBox = document.createElement("div");
      displayBox.classList.add("display-box");
      displayBox.innerHTML = `
        <p>Name: ${singleCardImgList.name}</p>
        <p>Type: ${singleCardImgList.type}</p>
        <p>Price: ${cardMarketPrice}</p>
      `;
      cardContainer.appendChild(displayBox);

      img.addEventListener("mouseenter", () => {
        displayBox.style.display = "block";
      });

      img.addEventListener("mouseleave", () => {
        displayBox.style.display = "none";
      });
    });
  });
}

function filterCards(cardType) {
  const allCards = Array.from(cardContainer.children);
  
  allCards.forEach(card => {
    if (cardType === "All Cards") {
      card.style.display = "block";
    } else {
      const cardTypeText = card.querySelector("p:nth-child(2)").textContent;
      if (cardTypeText === cardType) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    }
  });
}

function openFeedbackForm() {
  feedbackForm.style.display = "block";
}

// Submit feedback form
feedbackForm.addEventListener("submit", event => {
  event.preventDefault();
  
  const nameInput = document.getElementById("name-input");
  const emailInput = document.getElementById("email-input");
  const commentsInput = document.getElementById("comments-input");
  
  const name = nameInput.value;
  const email = emailInput.value;
  const comments = commentsInput.value;
  
  // Perform your desired actions with the form data (e.g., send it to a server)
  
  // Clear input fields
  nameInput.value = "";
  emailInput.value = "";
  commentsInput.value = "";
  
  // Hide feedback form
  feedbackForm.style.display = "none";
});
