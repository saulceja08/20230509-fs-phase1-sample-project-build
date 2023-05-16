console.log("Script is Running");

let cardContainer; // Define the cardContainer variable

document.addEventListener("DOMContentLoaded", () => {
  cardContainer = document.getElementById("card-container"); // Assign the element inside the event listener
  const linkItems = document.querySelectorAll(".link");

  fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
    .then(response => response.json())
    .then(info => {
      const jsonData = info.data;
      renderCards(jsonData);

      // Add click event listeners to link items
      linkItems.forEach(item => {
        item.addEventListener("click", () => {
          const category = item.textContent.trim();
          filterCardsByCategory(jsonData, category);
        });
      });
    });
});

function renderCards(jsonData) {
  cardContainer.innerHTML = ""; // Clear the existing card container

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

function filterCardsByCategory(jsonData, category) {
  cardContainer.innerHTML = ""; // Clear the existing card container

  if (category === "All Cards") {
    renderCards(jsonData);
  } else {
    const filteredData = jsonData.filter(card => card.type === category);
    renderCards(filteredData);
  }
}

function showPopup() {
  //create a pop-up element when user clicks submit
  const popup = document.createElement("div")
  popup.className = "popup"
  popup.innerHTML = "Thank You! Your feedback was submitted!"

  document.body.appendChild(popup);

  setTimeout(function() {
    popup.remove()

  },2000)

  document.getElementById("contact-form").reset()
}
