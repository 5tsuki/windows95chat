let username = window.prompt("Inserisci il tuo username (max. 10)");
username = username.trim();
while (username == null || username == "" || username.length > 10) {
  username = window.prompt("Inserisci il tuo username (max. 10)");
  username = username.trim();
}

const socket = io();

socket.emit("new-user", username);

const newMessage = document.getElementById("new-message-text");
const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", () => {
  emitMessage();
});

document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    emitMessage();
  }
});

function emitMessage() {
  if (newMessage.value != "") {
    console.log("il messaggio è valido");
    let message = {
      username: username,
      message: newMessage.value,
    };
    socket.emit("msg-to-server", message);
    newMessage.value = "";
  }
}

socket.on("msg-to-client", (message) => {
  let root = document.createElement("p");
  let usernameSpan = document.createElement("span");
  let messageSpan = document.createElement("span");

  usernameSpan.appendChild(document.createTextNode(message.username + ": "));
  usernameSpan.classList.add("username");

  messageSpan.appendChild(document.createTextNode(message.message));
  messageSpan.classList.add("text");

  root.appendChild(usernameSpan);
  root.appendChild(messageSpan);

  let messageDiv = document.getElementById("messages-container");
  messageDiv.appendChild(root);
  messageDiv.scrollTop = messageDiv.scrollHeight;
});

socket.on("user-announcement", (username) => {
  let root = document.createElement("p");
  root.classList.add("system-message");
  root.appendChild(document.createTextNode(username + " joined the chat."));
  let messageDiv = document.getElementById("messages-container");
  messageDiv.appendChild(root);
  messageDiv.scrollTop = messageDiv.scrollHeight;
});
