const api_key = "AIzaSyBze_8y8CxPSEArZ3a_SvXHvzkjJsg7GVA"
const Sign_In_Url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api_key }`


const $signinBtn = document.querySelector('.signin_btn')
const $signInEmail = document.querySelector('.signin_email_input')
const $signInPassword = document.querySelector('.signin_password_input')

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
    }finally{
        $signinBtn.disabled = false
        $signInEmail.value = ''
        $signInPassword.value = ''
    }
}

$signinBtn.addEventListener('click', () => {
    if (isValidated($signInEmail) && isValidated($signInPassword)) {
        signIn($signInEmail.value, $signInPassword.value)

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

window.addEventListener('DOMContentLoaded', ()=>{
    const localId = localStorage.getItem('localId')
  
    if(localId){
        window.open('../index.html', '_self')
      
    }
  })