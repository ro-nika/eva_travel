const api_key = "AIzaSyBze_8y8CxPSEArZ3a_SvXHvzkjJsg7GVA"
const Sign_Up_Url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api_key}`


const $registerBtn = document.querySelector('.signup_btn')
const $signUpEmail = document.querySelector('.signup_email_input')
const $signUpPassword = document.querySelector('.signup_password_input')
const $body = document.querySelector('body')

function testTemplate() {
    return (
        `
            <div class="header">
            <video autoplay loop muted src="video/video-on-top.mp4" class="video"></video>
            <div class="main_content">
    
                <div class="content_top">
                    <nav class="nav_bar">
                        <a class="btn_logo"><img src="./img/logo.png" alt=""></a>

                    </nav>
                    <div class="main_block">
                        <div class="main_top_block">
                            <div class="top_left">
    
                                <div class="main_words">
                                    <img src="./img/planet.png" alt="">
                                    <h1>Travel with "EVA Travel"</h1>
                                </div>
                                <h3>Join a global community of remote workers <br>
                                    living and traveling around the world
                                </h3>
                                <div class="picks_in_top_left">
                                    <img src="./img/pick-in_top1.jpg" alt="">
                                    <img src="./img/pick-in_top2.jpg" alt="">
                                    <img src="./img/pick-in_top3.jpg" alt="">
                                    <img src="./img/pick-in_top4.jpg" alt="">
                                    <img src="./img/pick-in_top5.jpg" alt="">
                                    <img src="./img/pick-in_top6.jpg" alt="">
                                    <img src="./img/pick-in_top7.jpg" alt="">
                                    <img src="./img/pick-in_top8.jpg" alt="">
                                    <img src="./img/pick-in_top9.jpg" alt="">
                                    <img src="./img/pick-in_top10.jpg" alt="">
                                    <img src="./img/pick-in_top11.jpg" alt="">
    
                                </div>
                            </div>
    
                            <div class="top_right">
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main_down_block">
                
                </div>
                <div class="under_wave">
    
                    <div class="categoryFilterContainer">
                        <select class="categoryFilterSelect">
                            <option value="">Выберите фильтрацию</option>
                        </select>
    
                        <input type="text" id="searchInput1" placeholder="Search...">
                        <button id="searchBtn">Search</button>
                    </div>
    
                </div>
    
            </div>
            <div class="cardsContainer"></div>
        <div class="pagination">
            <button class="button2">Prev</button>
            <button class="button">Next</button>
        </div>
            </div>
            `
    )
}

async function signUp(email, password) {
    $registerBtn.disabled = true
    try {

        const body = {
            email,
            password,
            returnSecureToken: true
        }
        const response = await fetch(Sign_Up_Url, {
            method: 'POST',

            body: JSON.stringify(body)
        })

        const res = await response.json()
        if (response.ok) {
            $body.authME.style.display = 'flex'
            $body.$container2.style.display ='none'
        } else {
            throw new Error(res.error.errors.at(0).message)
        }
    } catch (e) {
        console.error(e);
   
    } finally {
        $registerBtn.disabled = false
        $signUpEmail.value = ''
        $signUpPassword.value = ''
    }
}




$registerBtn.addEventListener('click', () => {
    if (isValidated($signUpEmail) && isValidated($signUpPassword)) {
        signUp($signUpEmail.value, $signUpPassword.value)
    }
})

function isValidated(element) {
    if (!element.value) {
        element.classList.add('error')

        element.focus()

        return false
    } else {
        element.classList.remove('error')
        return true
    }


}

window.addEventListener('DOMContentLoaded', () => {
    const localId = localStorage.getItem('localId')

    if (localId) {
        window.open('../index.html')

    }
})