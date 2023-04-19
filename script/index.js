const $container = document.querySelector('.cardsContainer')

window.addEventListener('load', () => {
  getCards()

  cards.reverse().forEach(travelCards => {
  $container.insertAdjacentHTML('beforeend', cardTemplate(travelCards))
  })
})

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

function cardTemplate(travelCards) {
  const {
      country,
      city,
      info,
      id,
      img1,
      img2,
  } = travelCards

  return `
  <div class="countryCards" onClick="openInfoPage()" style="background: url(${img1})center/cover ">
      <h2>${country}</h2>

      <h3>${city}</h1>
  </div>
  `
}