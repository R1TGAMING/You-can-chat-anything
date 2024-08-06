const socket = io();

const input = document.getElementById("input")
const sendButton = document.getElementById("sendButton")
const chatContainer = document.getElementById("chat-container")

sendButton.addEventListener("click", (e) => {
  e.preventDefault()
  socket.emit("client-message", input.value)
  input.value = ""

  
})

socket.on("server-message", (msg) => {
  const bubble = document.createElement("li")
  bubble.classList.add("bubble")
  bubble.classList.add("sent")
  bubble.textContent = msg
  chatContainer.appendChild(bubble)
  })


