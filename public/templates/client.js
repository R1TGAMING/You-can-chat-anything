const socket = io();

const input = document.getElementById("input")
const messages = document.getElementById("messages")
const chatContainer = document.getElementById("chat-container")

messages.addEventListener("submit", (e) => {
  e.preventDefault()
  socket.emit("client-message", input.value)
  const bubble = document.createElement("li")
  bubble.classList.add("bubble")
  bubble.classList.add("sent")
  bubble.textContent = input.value
  chatContainer.appendChild(bubble)
  input.value = ""
})

socket.on("received-message", (msg) => {
  const bubble = document.createElement("li")
  bubble.classList.add("bubble")
  bubble.classList.add("received")
  bubble.textContent = msg
  chatContainer.appendChild(bubble)
  })

