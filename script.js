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
  console.log("List item clicked:", event.target.textContent);
}
// Add form submission event listener
const form = document.querySelector("form");
form.addEventListener("submit", handleFormSubmit);
function handleFormSubmit(event) {
  event.preventDefault();
  const searchInput = document.querySelector("input[type='text']");
  const searchKeyword = searchInput.value.toLowerCase();
  const displayBoxes = document.querySelectorAll(".display-box");
  displayBoxes.forEach(displayBox => {
    const cardName = displayBox.querySelector("p:nth-child(1)").textContent.toLowerCase();
    const cardType = displayBox.querySelector("p:nth-child(2)").textContent.toLowerCase();
    if (cardName.includes(searchKeyword) || cardType.includes(searchKeyword)) {
      displayBox.style.display = "block";
    } else {
      displayBox.style.display = "none";
    }
  });
}