console.log("Script is Running");

//fetch => make an http request, retrieve all data, and return as JSON
fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
  .then(response => response.json())
  .then(info => renderCards(info.data));

function renderCards(jsonData) {
  //access container image
  const cardContainer = document.getElementById("card-container");
  //Iterate through each card and retrieve the image list affiliated with each card
  jsonData.forEach(singleCardImgList => {
    const imageList = singleCardImgList.card_images;
    //Iterate through each image and append it to the card-container
    imageList.forEach(displayImage => {
      //create img element and set the source to the image URL
      const img = document.createElement("img");
      img.src = displayImage.image_url;
      cardContainer.appendChild(img);

      //Create display box for card details
      const displayBox = document.createElement("div");
      displayBox.classList.add("display-box");
      displayBox.style.display = "none"; // Hide initially
      displayBox.innerHTML = `
        <button class="close-button">x</button>
        <p>Name: ${singleCardImgList.name}</p>
        <p>Type: ${singleCardImgList.type}</p>
        <p>Price: ${singleCardImgList.price}</p>
      `;
      cardContainer.appendChild(displayBox);

      //Add click event listener to each image
      img.addEventListener("click", () => {
        // Toggle display box visibility
        if (displayBox.style.display === "none") {
          displayBox.style.display = "block";
        } else {
          displayBox.style.display = "none";
        }
      });

      //Add click event listener to close button
      const closeButton = displayBox.querySelector(".close-button");
      closeButton.addEventListener("click", () => {
        displayBox.style.display = "none";
      });
    });
  });
}
