const api_key = "AIzaSyBze_8y8CxPSEArZ3a_SvXHvzkjJsg7GVA"
const Sign_Up_Url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api_key}`


const $registerBtn = document.querySelector('.signup_btn')
const $signUpEmail = document.querySelector('.signup_email_input')
const $signUpPassword = document.querySelector('.signup_password_input')


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
            window.open('./profile.html')
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