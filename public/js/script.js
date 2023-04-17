let socket = io();
let messages = document.querySelector('section ul')
let input = document.querySelector('input#sendtext')

// const usernameForm = document.getElementById('username-form');
// const usernameInput = document.getElementById('username');

// usernameForm.addEventListener('submit', e => {
//     e.preventDefault();
//     const username = usernameInput.value.trim();

//     socket.emit('join', { username });

//     document.cookie = `username=${username}`;
//     usernameForm.style.display = 'none';
//     console.log('joined as:' + username);
// });
  
// socket.on('joined', ({ username }) => { 
//     console.log(username)
//     console.log('joined');
//     document.cookie = `username=${username}`;
// });

// send text
document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault()
  if (input.value) {
    socket.emit('message', input.value)
    input.value = ''
  }
})

// received text
socket.on('message', message => {
    // console.log("message")
  messages.appendChild(Object.assign(document.createElement('li'), { textContent: message }))
  messages.scrollTop = messages.scrollHeight
})

