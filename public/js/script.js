let socket = io();
let messages = document.querySelector('section ul')
let input = document.querySelector('input')

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
