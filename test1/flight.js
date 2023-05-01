const $origin = document.querySelector('.origin')
const $destination = document.querySelector('.destination')
const $btn = document.querySelector('.btn')
const $dateOrigin = document.querySelector('.dateOrigin')
const $dateDestination = document.querySelector('.dateDestination')
const $ticketContainer = document.querySelector('.ticketContainer')
const $returnBlock = document.querySelector('.returnBlock')
const $ticketsblock = document.querySelector('.generalTicketsBlock')


$btn.addEventListener('click', () => {
    
    async function iataInfo() {
        try {
            const response = await fetch(`https://www.travelpayouts.com/widgets_suggest_params?q=Из ${$origin.value} в ${$destination.value}`)
            return await response.json()
        } catch (err) {
            console.error(err)
        }
    }
    
    iataInfo()
    .then(res => {
        ticket(res.origin, res.destination)
            .then(res => {
                console.log(res)
                let temp = res.data
                .map((tickets) => ticketsList(tickets))
                .join('')

                $ticketContainer.innerHTML = temp
            })
    })
    
    async function ticket (origin, destination) {
        try {
            const response = await fetch (`https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${origin.iata}&destination=${destination.iata}&return_at=${$dateDestination.value}&currency=rub&departure_at=${$dateOrigin.value}&sorting=price&direct=true&limit=30&token=28fe8552ed9a42091863b2bfcde762ce`)
            return await response.json()
        } catch (err) {
            console.error(err)
        }
    }
})

// window.addEventListener('load', () => {
//     const isValidDate = !isNaN(new Date($dateDestination.value).getTime())

//     if (isValidDate == true) {
//         $returnBlock.style.display = 'block'
//         $ticketsblock.style.height = '350px'
//     }
// })

function ticketsList(tickets) {


    const hours = Math.floor(tickets.duration_to / 60);
    const minutes = tickets.duration_to % 60;

    let strHours = tickets.departure_at.slice(11, 13)
    let numHours = parseInt(strHours)*60;

    let strMinutes = tickets.departure_at.slice(14, 16)
    let numMinutes = parseInt(strMinutes)

    let allMinutes = numHours + numMinutes + tickets.duration_to
    let flyHours = Math.floor(allMinutes / 60)
    let flyMinutes = allMinutes % 60


    // ------------------------return at--------------------

    const isValidDate = !isNaN(new Date($dateDestination.value).getTime())
    let strReturnHours = 0
    let strReturnMinutes = 0
    let departureReturn = 0
    let dateReturn = 0

    if (isValidDate == true) {
        strReturnHours = tickets.return_at.slice(11, 13)
        strReturnMinutes = tickets.return_at.slice(14, 16)
        departureReturn = tickets.return_at.slice(11, 16)
        dateReturn = tickets.return_at.slice(8, 10) +'-'+tickets.return_at.slice(5, 7) +'-' + tickets.return_at.slice(0, 4)
    }



    const returnHours = Math.floor(tickets.duration_back / 60);
    const returnMinutes = tickets.duration_back % 60;

    let numReturnHours = parseInt(strReturnHours)*60;

    let numReturnMinutes = parseInt(strReturnMinutes)

    let allReturnMinutes = numReturnHours + numReturnMinutes + tickets.duration_back
    let flyReturnHours = Math.floor(allReturnMinutes / 60)
    let flyReturnMinutes = allReturnMinutes % 60


    return`
        <div  class="generalTicketsBlock">
            <div class="leftTicketsBlock">
                <h2>${tickets.price}руб</h2>
                <a href='https://www.aviasales.ru/${tickets.link}'>Перейти</a>
            </div>
            <div class="rightTicketsBlock">
                <div class="thereBlock">
                    <div class="departureBlock">
                        <h2>${$origin.value}</h2>
                        <p>${tickets.departure_at.slice(8, 10)}-${tickets.departure_at.slice(5, 7)}-${tickets.departure_at.slice(0, 4)}</p>
                        
                        
                    </div>
                    <div class="centerBlock">
                        <div class = "centerUp">
                            <img src="/test1/media/departure.png" class="airplanePng">
                            <p>Время полёта: ${hours} часов ${minutes} минут</p>
                            <img src="/test1/media/arrival.png" class="airplanePng">
                        </div>
                        <div class="flyLine"></div>
                        <div class="timeFly">
                            <p>${tickets.departure_at.slice(11, 16)}</p>
                            <p>${flyHours}:${flyMinutes}</p>
                        </div>
                    </div>
                    <div class="arrivalBlock">
                        <h2>${$destination.value}</h2>
                        
                    </div>
                </div>
                <div class="returnBlock">
                    <div class="thereBlock">
                        <div class="departureBlock">
                            <h2>${$destination.value}</h2>
                            <p>${dateReturn}</p>
                        </div>
                        <div class = "centerBlock">
                            <div class = "centerUp">
                                <img src="/test1/media/departure.png" class="airplanePng">
                                <p>Время полёта: ${returnHours} часов ${returnMinutes} минут</p>
                                <img src="/test1/media/arrival.png" class="airplanePng">
                            </div>
                            <div class="flyLine"></div>
                            <div class="timeFly">
                            <p>${departureReturn}</p>
                            <p>${flyReturnHours}:${flyReturnMinutes}</p>
                        </div>
                        </div>
                        <div class="arrivalBlock">
                            <h2>${$origin.value}</h2>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    `
}



// https://api.travelpayouts.com/aviasales/v3/grouped_prices?origin=${origin.iata}&destination=${destination.iata}&currency=rub&departure_at=${$dateOrigin.value}&group_by=departure_at&token=28fe8552ed9a42091863b2bfcde762ce


// https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${origin.iata}&destination=${destination.iata}&currency=rub&departure_at=${$dateOrigin.value}&sorting=price&direct=true&limit=30&token=28fe8552ed9a42091863b2bfcde762ce

// https://api.travelpayouts.com/v1/prices/calendar?departure_date=${$dateOrigin.value}&origin=${origin.iata}&destination=${destination.iata}&calendar_type=departure_date&token=28fe8552ed9a42091863b2bfcde762ce




// fetch('https://www.travelpayouts.com/widgets_suggest_params?q=Из Ош в Москва')
//     .then(response => response.json())
//     .then(json => console.log(json));


//
