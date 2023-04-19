const Base_URR = 'https://eva-travel-a5559-default-rtdb.asia-southeast1.firebasedatabase.app/'


async function getCards() {
    try {
        const response = await fetch('https://travel-site-a487e-default-rtdb.asia-southeast1.firebasedatabase.app/cards.json')
  
        const cards = await response.json()
  
        const cardsArr = Object.entries(cards).map(([id, val]) => {
            return {
                id,
                ...val
            }
        })
  
        cardsArr.reverse().forEach(travelCards => {
            $container.insertAdjacentHTML('beforeend', cardTemplate(travelCards))
        })
  
        console.log(cardsArr);
    } catch (e) {
        console.error(e);
    }
  }