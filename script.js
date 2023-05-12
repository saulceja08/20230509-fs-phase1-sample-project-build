//consoleLog api data into the website
fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
.then(response => response.json())
.then(cardData => renderCards(cardData.data))

const renderCards = (dataArray) => {
    console.log(dataArray)
    dataArray.forEach(cardInfo => {
        cardInfo.card_images.forEach(imageInfo => {
            console.log(imageInfo.image_url)
        })
    })
}