document.addEventListener('DOMContentLoaded', function() {
    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
      .then(response => response.json())
      .then(cardData => renderType(cardData));
  
    function renderCards(insertData) {
      const cardImages = insertData.data;
  
      cardImages.forEach(getImage => {
        getImage.card_images.forEach(getNewImage => console.log(getNewImage.image_url));
      });
    }
  
    function renderType(insertCardData) {
      const cardInfo = insertCardData.data;
  
      cardInfo.forEach(getCardType => console.log(getCardType.type));
    }
  
    var tabButtons = document.querySelectorAll('.tabContainer .buttonContainer button');
    var tabPanels = document.querySelectorAll('.tabContainer .tabPanel');
  
    function showPanel(panelIndex, colorCode) {
      tabButtons.forEach(function(node) {
        node.style.backgroundColor = "";
        node.style.color = "";
      });
      tabButtons[panelIndex].style.backgroundColor = colorCode;
      tabButtons[panelIndex].style.color = "white";
      tabPanels.forEach(function(node) {
        node.style.display = "none";
      });
      tabPanels[panelIndex].style.display = "block";
      tabPanels[panelIndex].style.backgroundColor = colorCode;
    }
  });
  