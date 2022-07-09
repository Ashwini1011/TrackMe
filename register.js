let switchCtn = document.querySelector('#switch-cnt')
let switchC1 = document.querySelector('#switch-c1')
let switchC2 = document.querySelector('#switch-c2')
let switchCircle = document.querySelectorAll('.switch__circle')
let switchBtn = document.querySelectorAll('.switch-btn')
let aContainer = document.querySelector('#a-container')
let bContainer = document.querySelector('#b-container')
let allButtons = document.querySelectorAll('.submit')

let getButtons = (e) => e.preventDefault()

let changeForm = (e) => {
  switchCtn.classList.add('is-gx')
  setTimeout(function () {
    switchCtn.classList.remove('is-gx')
  }, 1500)

  switchCtn.classList.toggle('is-txr')
  switchCircle[0].classList.toggle('is-txr')
  switchCircle[1].classList.toggle('is-txr')

  switchC1.classList.toggle('is-hidden')
  switchC2.classList.toggle('is-hidden')
  aContainer.classList.toggle('is-txl')
  bContainer.classList.toggle('is-txl')
  bContainer.classList.toggle('is-z200')
}

let mainF = (e) => {
  for (var i = 0; i < allButtons.length; i++)
    allButtons[i].addEventListener('click', getButtons)
  for (var i = 0; i < switchBtn.length; i++)
    switchBtn[i].addEventListener('click', changeForm)
}

// Register Functionality
function register() {
  let name = document.getElementById('name').value
  let email = document.getElementById('email').value
  let password = document.getElementById('password').value
  let regarr = JSON.parse(localStorage.getItem('register')) || []

  if (regarr) {
    for (let i = 0; i < regarr.length; i++) {
      if (regarr[i].email == email) {
        alert('This email is already register')
        document.getElementById('name').value = ''
        document.getElementById('email').value = ''
        document.getElementById('password').value = ''
        return
      }
    }
  }

  regarr.push({
    name: name,
    email: email,
    password: password,
  })

  alert('registration done successfully')

  localStorage.setItem('register', JSON.stringify(regarr))
  document.getElementById('name').value = ''
  document.getElementById('email').value = ''
  document.getElementById('password').value = ''
}

function login() {
  let login_email = document.getElementById('login_email').value
  let login_password = document.getElementById('login_password').value
  let regarr = JSON.parse(localStorage.getItem('register')) || []
  if (regarr) {
    for (let i = 0; i < regarr.length; i++) {
      if (
        login_email == regarr[i].email &&
        login_password == regarr[i].password
      ) {
        document.getElementById('login_email').value = ''
        document.getElementById('login_password').value = ''
        window.location.href = 'home.html'
      }
    }
    return
  }
}
