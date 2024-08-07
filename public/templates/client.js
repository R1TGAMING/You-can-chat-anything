const socket = io();

const input = document.getElementById("input")
const messages = document.getElementById("messages")
const chatContainer = document.getElementById("chat-container")

messages.addEventListener("submit", (e) => {
  e.preventDefault()

  const dates = new Date().toLocaleTimeString([], {
    hour : "2-digit",
    minute : "2-digit"
  })
  const bubble = document.createElement("li")
  const date = document.createElement("p")

  socket.emit("client-message", input.value, dates)
  
  bubble.classList.add("bubble")
  bubble.classList.add("sent")
  bubble.textContent = input.value
  chatContainer.appendChild(bubble)
  input.value = ""
  
  date.classList.add("date")
  date.classList.add("text-end")
  date.classList.add("text-sm-end")
  date.innerHTML = dates
  chatContainer.appendChild(date)
})

socket.on("received-message", (msg, dates) => {

  const bubble = document.createElement("li")
  const date = document.createElement("p")

  bubble.classList.add("bubble")
  bubble.classList.add("received")
  bubble.textContent = msg
  chatContainer.appendChild(bubble)
  
  
  date.classList.add("date")
  date.classList.add("text-start")
  date.classList.add("text-sm-start")
  date.innerHTML = dates
  chatContainer.appendChild(date)
  })

