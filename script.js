//Make sure script is running
console.log("Running scripts")

const fetchData = () => {
  fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
  .then(response => response.json())
  .then(dataFetched => renderImages(dataFetched))
}

function renderImages(dataFetched){
  const imgContainer = document.getElementById('card-container')

  dataFetched.data.forEach(imageArray => {
    imageArray.card_images.forEach(imageSelector => {
      const imgTag = document.createElement("img")

      imgTag.src = imageSelector.image_url
      imgContainer.appendChild(imgTag)
    })
  })
}
  
fetchData()