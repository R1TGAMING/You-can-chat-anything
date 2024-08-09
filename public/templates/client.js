const socket = io();

const input = document.getElementById("input")
const messages = document.getElementById("messages")
const chatContainer = document.getElementById("chat-container")
const weekDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];



messages.addEventListener("submit", (e) => {
  e.preventDefault()

  const dates = new Date()
    
  const time = dates.toLocaleTimeString([], {
    hour : "2-digit",
    minute : "2-digit"
  })
  const day = dates.getDay();
  
  const bubble = document.createElement("li")
  const date = document.createElement("p")
  socket.emit("client-message", input.value, time, day)
  
  bubble.classList.add("bubble")
  bubble.classList.add("sent")
  bubble.textContent = input.value
  chatContainer.appendChild(bubble)
  input.value = ""
  
  date.classList.add("date")
  date.classList.add("text-end")
  date.classList.add("text-sm-end")
  date.innerHTML = time + " " + weekDay[day]
  chatContainer.appendChild(date)

  chatContainer.scrollTop = chatContainer.scrollHeight
})

socket.on("received-message", (msg, dates, time) => {

  const bubble = document.createElement("li")
  const date = document.createElement("p")

  bubble.classList.add("bubble")
  bubble.classList.add("received")
  bubble.textContent = msg
  chatContainer.appendChild(bubble)
  
  
  date.classList.add("date")
  date.classList.add("text-start")
  date.classList.add("text-sm-start")
  date.innerHTML = dates + ' ' + weekDay[time]
  chatContainer.appendChild(date)
  
  chatContainer.scrollTop = chatContainer.scrollHeight
  })

socket.on("previous-message", (msg, dates, time) => {
  const bubble = document.createElement("li")
  const date = document.createElement("p")

  bubble.classList.add("bubble")
  bubble.classList.add("received")
  bubble.textContent = msg
  chatContainer.appendChild(bubble)
  
  
  date.classList.add("date")
  date.classList.add("text-start")
  date.classList.add("text-sm-start")
  date.innerHTML = dates + ' ' + weekDay[time]
  chatContainer.appendChild(date)
  
  chatContainer.scrollTop = chatContainer.scrollHeight
  
  
})
