console.log("Script is Running");
// Fetch => make an HTTP request, retrieve all data, and return as JSON
fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
  .then(response => response.json())
  .then(info => renderCards(info.data));
function renderCards(jsonData) {
  const cardContainer = document.getElementById("card-container");
  jsonData.forEach(singleCardImgList => {
    const imageList = singleCardImgList.card_images;
    const marketPrice = singleCardImgList.card_prices
    imageList.forEach(displayImage => {
      const img = document.createElement("img");
      const cardMarketPrice = marketPrice.length > 0 ? marketPrice[0].cardmarket_price : "N/A";
      img.src = displayImage.image_url;
      cardContainer.appendChild(img);
      const displayBox = document.createElement("div");
      displayBox.classList.add("display-box");
      displayBox.style.display = "none";
      displayBox.innerHTML = `
        <button class="close-button">:x:</button>
        <p>Name: ${singleCardImgList.name}</p>
        <p>Type: ${singleCardImgList.type}</p>
        <p>Price: ${cardMarketPrice}</p>
      `;
      cardContainer.appendChild(displayBox);
      img.addEventListener("click", () => {
        if (displayBox.style.display === "none") {
          displayBox.style.display = "block";
        } else {
          displayBox.style.display = "none";
        }
      });
      const closeButton = displayBox.querySelector(".close-button");
      closeButton.addEventListener("click", () => {
        displayBox.style.display = "none";
      });
    });
  });
}
// Add event listener to the form
const form = document.getElementById("search-form");
form.addEventListener("submit", handleFormSubmit);
function handleFormSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input[type='text']");
  const searchTerm = input.value;
  // Do something with the search term (e.g., perform a search or filter the cards)
  console.log("Search term:", searchTerm);
  input.value = "";
}
// Add event listeners to the list items with the class "link"
const listItems = document.querySelectorAll(".link");
listItems.forEach((item) => {
  item.addEventListener("click", handleListItemClick);
});
function handleListItemClick(event) {
  console.log("List item clicked:", event.target.textContent);
}