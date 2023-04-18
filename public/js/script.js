let socket = io();
let messages = document.querySelector('section ul');
let inputText = document.querySelector('input#message');
let inputName = document.querySelector('input#name');
let send = document.querySelector('button#send');
let typingState = document.querySelector('p');

// send text
document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault()
  let data = { name: inputName.value, message: inputText.value }
  socket.emit('chat', data);

  console.log(inputName.value, inputText.value);
  inputText.value = '';
})

inputText.addEventListener('keypress', () => {
  socket.emit('typing', inputName.value)
})

socket.on('chat', (data) => {
  console.log(data);
  messages.appendChild(Object.assign(document.createElement('li'), { textContent: data.name + ': ' + data.message }))
  typingState.innerHTML= "";
  messages.scrollTop = messages.scrollHeight
})
socket.on('typing', (inputName) => {
  console.log(inputName);
  typingState.innerHTML= ( inputName + " is aan het typen...")
  setTimeout(() => {
    typingState.innerHTML= "";
  }, 3000);
})
