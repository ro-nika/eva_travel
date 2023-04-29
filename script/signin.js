const api_key = "AIzaSyBze_8y8CxPSEArZ3a_SvXHvzkjJsg7GVA"
const Sign_In_Url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api_key}`


const $signinBtn = document.querySelector('.signin_btn')
const TEST = document.querySelector('.ifAuthTrue')
const $signInEmail = document.querySelector('.signin_email_input')
const $signInPassword = document.querySelector('.signin_password_input')
const header = document.querySelector('.header')
const authME = document.querySelector('.auth')
const $container2 = document.querySelector('.container')
const $person = document.querySelector('.person')
const $pers = document.querySelector('#pers')
const $persBTN = document.querySelector('.btn')


window.addEventListener('click', (e) => {
    if(e.target === $pers){
        openModal()
    } else if(e.target === $persBTN){
        closeModal()
    } 
})


function openModal() {
    $person.style.display = 'block'
}

function closeModal() {
    $person.style.display = 'none'
}

async function signIn(email, password) {
    $signinBtn.disabled = true
    try {
        const body = {
            email,
            password,
            returnSecureToken: true
        }
        const response = await fetch(Sign_In_Url, {
            method: 'POST',
            body: JSON.stringify(body)
        })

        const res = await response.json()
        if (response.ok) {
            localStorage.setItem('localId', res.localId)

        } else {
            throw new Error(res.error.errors.at(0).message)
        }
    } catch (e) {
        alert(e);
    } finally {
        $signinBtn.disabled = false
        $signInEmail.value = ''
        $signInPassword.value = ''
    }
}

$signinBtn.addEventListener('click', () => {
    if (isValidated($signInEmail) && isValidated($signInPassword)) {
        signIn($signInEmail.value, $signInPassword.value)
        setInterval(() => {
            window.location.reload()
        }, 500);
    }

})

function isValidated(element) {
    if (!element.value) {
        element.classList.add('error')

        element.focus()

        return false
    }

    element.classList.remove('error')
    return true
}


window.addEventListener('DOMContentLoaded', () => {
    const localId = localStorage.getItem('localId')

    if (localId) {
      authME.style.display = 'flex'
      $container2.style.display ='none'

    }
})



// 1. GET запрос на сервер за пользователями.
// 2. Введеные данные в инпуте сравнить с массивом пользователей
// 3. Есть совпадения - авторизация срабатывает, если нет, то ошибка.