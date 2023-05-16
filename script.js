console.log("Script is Running");

fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
  .then(response => response.json())
  .then(info => renderCards(info.data));

function renderCards(jsonData) {
  const cardContainer = document.getElementById("card-container");

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
