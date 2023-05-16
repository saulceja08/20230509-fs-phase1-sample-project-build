console.log("Script is Running");

// Fetch card data
fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
  .then((response) => response.json())
  .then((info) => renderCards(info.data));

function renderCards(jsonData) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ""; // Clear the container before rendering new cards

  jsonData.forEach((singleCardImgList) => {
    const imageList = singleCardImgList.card_images;
    const marketPrice = singleCardImgList.card_prices;

    imageList.forEach((displayImage) => {
      const img = document.createElement("img");
      const cardMarketPrice =
        marketPrice.length > 0 ? marketPrice[0].cardmarket_price : "N/A";
      img.src = displayImage.image_url;
      cardContainer.appendChild(img);

      const displayBox = document.createElement("div");
      displayBox.classList.add("display-box");
      displayBox.style.display = "none";
      displayBox.innerHTML = `
        <p>Name: ${singleCardImgList.name}</p>
        <p>Type: ${singleCardImgList.type}</p>
        <p>Price: ${cardMarketPrice}</p>
      `;
      cardContainer.appendChild(displayBox);

      img.addEventListener("mouseover", () => {
        displayBox.style.display = "block";
      });

      img.addEventListener("mouseout", () => {
        displayBox.style.display = "none";
      });
    });
  });

  // Add event listeners to the list items with the class "link"
  const listItems = document.querySelectorAll(".link");
  listItems.forEach((item) => {
    item.addEventListener("click", handleListItemClick);
  });
}

function handleListItemClick(event) {
  const clickedItem = event.target.textContent;
  filterCards(clickedItem, jsonData);
}

function filterCards(filterType, jsonData) {
  const filteredCards = jsonData.filter((card) => {
    if (filterType === "All Cards") {
      return true; // Show all cards
    } else {
      return card.type === filterType; // Show cards matching the filter type
    }
  });
  renderFilteredCards(filteredCards);
}

function renderFilteredCards(filteredCards) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ""; // Clear the container before rendering filtered cards

  filteredCards.forEach((card) => {
    const imageList = card.card_images;
    const marketPrice = card.card_prices;

    imageList.forEach((displayImage) => {
      const img = document.createElement("img");
      const cardMarketPrice =
        marketPrice.length > 0 ? marketPrice[0].cardmarket_price : "N/A";
      img.src = displayImage.image_url;
      cardContainer.appendChild(img);

      const displayBox = document.createElement("div");
      displayBox.classList.add("display-box");
      displayBox.style.display = "none";
      displayBox.innerHTML = `
        <p>Name: ${card.name}</p>
        <p>Type: ${card.type}</p>
        <p>Price: ${cardMarketPrice}</p>
      `;
      cardContainer.appendChild(displayBox);

      img.addEventListener("mouseover", () => {
        displayBox.style.display = "block";
      });

      img.addEventListener("mouseout", () => {
        displayBox.style.display = "none";
      });
    });
  });
}

// Get feedback elements
const feedbackLink = document.getElementById("feedback-link");
const feedbackModal = document.getElementById("feedback-modal");
const feedbackReceiptModal = document.getElementById("feedback-receipt-modal");
const feedbackForm = document.getElementById("feedback-form");
const closeButtons = document
