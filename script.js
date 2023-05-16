console.log("Script is Running");

fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
  .then(response => response.json())
  .then(info => renderCards(info.data));

function renderCards(jsonData) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ""; // Clear the container before rendering new cards

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
  filterCards(clickedItem);
}

function filterCards(filterType) {
  fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
    .then(response => response.json())
    .then(info => {
      const filteredCards = info.data.filter((card) => {
        if (filterType === "All Cards") {
          return true; // Show all cards
        } else {
          return card.type === filterType; // Show cards matching the filter type
        }
      });
      renderFilteredCards(filteredCards);
    });
}

function renderFilteredCards(filteredCards) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ""; // Clear the container before rendering filtered cards

  filteredCards.forEach((card) => {
    const imageList = card.card_images;
    const marketPrice = card.card_prices;

    imageList.forEach((displayImage) => {
      const img = document.createElement("img");
      const cardMarketPrice = marketPrice.length > 0 ? marketPrice[0].cardmarket_price : "N/A";

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

// Feedback form functionality
const feedbackLink = document.getElementById("feedback-link");
const feedbackModal = document.getElementById("feedback-modal");
const closeBtn = document.querySelector(".close");
const feedbackForm = document.getElementById("feedback-form");

feedbackLink.addEventListener("click", () => {
  feedbackModal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  feedbackModal.style.display = "none";
});

feedbackForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const comment = document.getElementById("comment").value;

  // Create feedback object
  const feedback = {
    name: name,
    email: email,
    comment: comment,
  };

  // Make a POST request to store feedback in db.json (using a local server)
  fetch("http://localhost:3000/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feedback),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Feedback stored:", data);
      feedbackModal.style.display = "none"; // Close the feedback modal
      showReceipt(); // Show the receipt message
    })
    .catch((error) => {
      console.error("Error storing feedback:", error);
    });
});

function showReceipt() {
  const receipt = document.createElement("div");
  receipt.classList.add("receipt");
  receipt.innerText = "Thank you for leaving feedback.";

  document.body.appendChild(receipt);

  setTimeout(() => {
    receipt.remove(); // Remove the receipt message after 3 seconds
  }, 3000);
}