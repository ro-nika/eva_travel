const $container = document.querySelector('.cardsContainer')
const $cards = document.getElementsByClassName('.countryCards')
const $prevNext = document.querySelector('.pagination')

window.addEventListener('load', () => {
    let cards = getCards()

    const cardsArr = Object.entries(cards).map(([id, val]) => {
        return {
            id,
            ...val
        }
    })
    cardsArr.reverse().forEach(travelCards => {
        $container.insertAdjacentHTML('beforeend', cardTemplate(travelCards))
    })
})

let api = {
    main: "https://travel-site-a487e-default-rtdb.asia-southeast1.firebasedatabase.app"
}


async function getCards() {
    try {
        const response = await fetch(`${api.main}/cards.json`)

        const cards = await response.json()

        const cardsArr = Object.entries(cards).map(([id, val]) => {
            return {
                id,
                ...val
            }
        })

        let pag = +getPag()
        let off = +getOffset()


        const slicedArr = cardsArr.reverse().slice(off, pag)

        slicedArr.forEach(travelCards => {
            $container.insertAdjacentHTML('afterbegin', cardTemplate(travelCards))
        })
        console.log(slicedArr);
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
  <div class="countryCards" style="background: url(${img1})center/cover ">
      <h2>${country}</h2>

      <h3>${city}</h1>
      <button class="InfoBtn" onClick="openInfoPage(${info})">Узнать больше</button>
  </div>
  `
}
function openInfoPage(info) {

    slicedArr.style.display = 'none'
    $prevNext.style.display = 'none'

    const slicedArr = cardsArr.reverse().slice(off, pag)

    slicedArr.forEach(travelCards => {
        $container.insertAdjacentHTML('afterbegin', cardTemplate(travelCards))
    })

    return `
        <div class="cardsContainer">
          <div class="country_info"> 
            <div class="left_side">
              <h1>Имя: ${info.info}</h1> 
            </div>
            <div class="right_side">
              <img src='${info.img2}'/> 
            </div>
          </div> 
            <button class="InfoBtn" onClick="reloadWindowFunc()">Вернуться назад</button> 
        </div>
        `;



}


const $button = document.querySelector('.button')
const $button2 = document.querySelector('.button2')

$button.addEventListener('click', next)
$button2.addEventListener('click', prev)

window.addEventListener('DOMContentLoaded', () => {
    let pag = getPag()
    let off = getOffset()

    if (pag === null || off === null) {
        pag = 8
        off = 0
        setOffset(off)
        setPag(pag)
        reloadPage()
    }

    if (off == 0) {
        $button2.style.cursor = 'default'
        $button2.style.background = 'grey'
        $button2.disabled = true
    }

    if (pag == 40) {
        $button.style.cursor = 'default'
        $button.style.background = 'grey'
        $button.disabled = true
    }
})

function getPag() {
    return localStorage.getItem('pag')
}

function next() {
    let pag = +getPag()
    let off = +getOffset()

    if (pag >= 40 || pag <= 0) {
        pag = 8
        off = 0
    } else {
        pag += 8
        off += 8
    }

    console.log(off);
    console.log(pag);

    setOffset(off)
    setPag(pag)
    reloadPage()
}

function prev() {
    let pag = +getPag()
    let off = +getOffset()

    if (off <= 0 || pag <= 0) {
        pag = 8
        off = 0
    } else {
        pag -= 8
        off -= 8

    }

    console.log(off);
    console.log(pag);

    setOffset(off)
    setPag(pag)
    reloadPage()
}

function setPag(pag) {
    localStorage.setItem('pag', pag)
}

function setOffset(off) {
    localStorage.setItem('off', off)
}

function getOffset(off) {
    return localStorage.getItem('off')
}

function setArr(arr) {
    localStorage.setItem('array', arr)
}

function getArr() {
    return localStorage.getItem('array')
}

function reloadPage() {
    window.location.reload()
}

// --------------------------------------------------------------------

function search() {

    let searchValue = document.getElementById("searchInput").value.toLowerCase();

    let elements = document.getElementsByTagName("*");

    for (let i = 0; i < elements.length; i++) {
        let elementText = elements[i].textContent.toLowerCase();
        if (elementText.indexOf(searchValue) === -1) {
            elements[i].style.display = "none";
        } else {
            elements[i].style.display = "";

        }
    }
}


let searchBtn = document.getElementById("searchBtn");
searchBtn.onclick = function () {
    search();
}