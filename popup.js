const tab2Content = document.querySelector("#tab-2");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");
const modelSelect = document.getElementById("model-select");
const clearButton = document.getElementById("clear-conversation");
const noteInput = document.getElementById("note-input");
const noteInput2 = document.getElementById("note-input-2");
const toggleColorButtons = [
  { src: "assets/Theme1.png", class: "custom-color-1" },
  { src: "assets/Theme2.png", class: "custom-color-2" },
  { src: "assets/Theme3.png", class: "custom-color-3" },
  { src: "assets/Theme4.png", class: "custom-color-4" },
];
let db;
let model = "default";
let customColor = localStorage.getItem("customColor") || "custom-color-2";
document.body.classList.add(customColor);

// createData
const createData = (modelId, text) => {
  let data;

  switch (modelId) {
    case "Summarize":
      data = {
        model: "text-davinci-003",
        prompt: "Summarize this for a second-grade student:" + text,
        temperature: 0.7,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      };
      break;
    case "Grammar correction":
      data = {
        model: "text-davinci-003",
        prompt: "Correct this to standard English:" + text,
        temperature: 0,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      };
      break;
    default:
      data = {
        // model: "text-davinci-003",
        // prompt: text,
        // temperature: 0.9,
        // max_tokens: 150,
        // top_p: 1,
        // frequency_penalty: 0.0,
        // presence_penalty: 0.6,
        // stop: [" Human:", " AI:"],

        model: "text-davinci-003",
        prompt:
          "Z3R0V1B3S is a chatbot that reluctantly answers questions with sarcastic, smart and sometimes a bully responses:" +
          text,
        temperature: 0.5,
        max_tokens: 60,
        top_p: 0.3,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
      };
  }

  return data;
};

// addMessage
const addMessage = (sender, message, isHtml) => {
  addMessageToIndexedDB(sender, message);
  addMessageToHTML(sender, message, isHtml);
};

// addMessageToIndexedDB
const addMessageToIndexedDB = (sender, message) => {
  const transaction = db.transaction(["messages"], "readwrite");
  const objectStore = transaction.objectStore("messages");
  objectStore.add({ sender, message });
};

// addMessageToHTML
const addMessageToHTML = (sender, message, isHtml) => {
  // Update HTML
  const messageNode = document.createTextNode(`${sender}: `);
  const messageElement = document.createElement("div");

  isHtml
    ? (messageElement.innerHTML = message)
    : (messageElement.innerText = message);

  if (sender) {
    messageElement.classList.add(sender.toLowerCase());
  } else {
    messageElement.classList.add("undefined");
  }

  chatMessages.appendChild(messageNode);
  chatMessages.appendChild(messageElement);

  // Scroll to the latest message
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

// sendMessage
const sendMessage = (text) => {
  if (text.trim() === "") return;
  const data = createData(model, text);

  addMessage("You", text);

  const request = new XMLHttpRequest();
  request.open("POST", "https://api.openai.com/v1/completions");
  request.setRequestHeader("Content-Type", "application/json");

  // Paste API key
  // request.setRequestHeader("Authorization", "Bearer <!--API-KEY-->");

  request.send(JSON.stringify(data));

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      const response = JSON.parse(this.responseText);

      if (
        response.choices &&
        Array.isArray(response.choices) &&
        response.choices.length > 0
      ) {
        let responseText = response.choices[0].text;
        responseText = responseText.trim().replaceAll("\n", "<br>");
        addMessage("AI", responseText, true);
      } else {
        // Handle the case where the response does not contain a valid choice
        addMessage(
          "AI",
          "Sorry, I am unable to provide a response at this time.",
          true
        );
      }
      clearButton.classList.add("show");
    }
  };
};

// Window.onload function
window.onload = async () => {
  const request = indexedDB.open("chatbot-messages", 1);
  request.onupgradeneeded = (event) => {
    db = event.target.result;
    const messagesStore = db.createObjectStore("messages", {
      autoIncrement: true,
    });
    const notesStore = db.createObjectStore("notes", { keyPath: "noteName" });
  };
  request.onsuccess = (event) => {
    db = event.target.result;
    const currentModel = localStorage.getItem("model") || model;
    loadMessages();
    if (db) {
      const transaction = db.transaction(["messages"], "readonly");
      const objectStore = transaction.objectStore("messages");
      const messages = [];
      objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          messages.push(cursor.value);
          cursor.continue();
        } else {
          if (messages.length) {
            clearButton.classList.add("show");
            messages.forEach(({ sender, message }) =>
              addMessageToHTML(sender, message, true)
            );
          }
        }
      };
    }

    noteInput.addEventListener("input", () => {
      const note = noteInput.value;
      const transaction = db.transaction(["notes"], "readwrite");
      const objectStore = transaction.objectStore("notes");
      objectStore.put({ noteName: "note", note });
    });

    noteInput2.addEventListener("input", () => {
      const note2 = noteInput2.value;
      const transaction = db.transaction(["notes"], "readwrite");
      const objectStore = transaction.objectStore("notes");
      objectStore.put({ noteName: "note-2", note: note2 });
    });

    loadNotes();

    model = currentModel;
    loadModel();
    if (customColor) document.body.classList.add(customColor);
    for (const option of modelSelect) {
      if (model === option.value) option.setAttribute("selected", true);
    }
  };
};

// chatForm Event Listener
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage(chatInput.value);
  chatInput.value = "";
});

// clearButton Event Listener
clearButton.addEventListener("click", () => {
  if (
    confirm(
      "Are you sure you want to delete the conversation? This action cannot be undone."
    )
  ) {
    const transaction = db.transaction(["messages"], "readwrite");
    const objectStore = transaction.objectStore("messages");
    objectStore.clear();
    chatMessages.innerHTML = "";
    clearButton.classList.remove("show");
  }
});

// modelSelect Event Listener
modelSelect.addEventListener("change", (e) => {
  // console.log(e.target.value);
  model = e.target.value;
  localStorage.setItem("model", model);
  loadModel();
});

//async loadNote function
function loadNotes() {
  const transaction = db.transaction("notes", "readonly");
  const objectStore = transaction.objectStore("notes");

  const noteRequest = objectStore.get("note");
  noteRequest.onsuccess = function (event) {
    if (event.target.result) {
      document.getElementById("note-input").value = event.target.result.note;
    } else {
      document.getElementById("note-input").value = "";
    }
  };

  const note2Request = objectStore.get("note-2");
  note2Request.onsuccess = function (event) {
    if (event.target.result) {
      document.getElementById("note-input-2").value = event.target.result.note;
    } else {
      document.getElementById("note-input-2").value = "";
    }
  };
}

// async loadMessages
async function loadMessages() {
  try {
    const transaction = db.transaction(["messages"], "readonly");
    const objectStore = transaction.objectStore("messages");
    const messages = [];
    const request = objectStore.openCursor();
    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        messages.push(cursor.value);
        cursor.continue();
      }
    };
    await request;
    if (messages.length) {
      clearButton.classList.add("show");
      messages.forEach(({ sender, message }) =>
        addMessageToHTML(sender, message, true)
      );
    }
  } catch (error) {
    console.log(error);
  }
}

// loadModel function
loadModel = function () {
  const chosenModel = localStorage.getItem("model");
  document.getElementById("load-model").innerHTML = chosenModel;
};

// toggleColorButtons for themes
toggleColorButtons.forEach(({ src, class: c }) => {
  const toggleColorButton = document.createElement("button");
  toggleColorButton.classList.add("toggle-color-button");

  const toggleColorImage = document.createElement("img");
  toggleColorImage.src = src;
  toggleColorImage.alt = "Toggle color button";
  toggleColorButton.appendChild(toggleColorImage);

  toggleColorButton.addEventListener("click", () => {
    toggleColorButtons.forEach(({ class: colorToggle }) =>
      document.body.classList.remove(colorToggle)
    );
    document.body.classList.add(c);
    localStorage.setItem("customColor", c);
  });
  tab2Content.appendChild(toggleColorButton);
});

// Get the number of key-value pairs in the storage in bytes
var totalSize = 0;
for (var i = 0; i < localStorage.length; i++) {
  // Get the key and value
  var key = localStorage.key(i);
  var value = localStorage.getItem(key);
  // Calculate the size of value
  var valueSize = value ? new Blob([value]).size : 0;
  totalSize += valueSize;
}
console.log("Total localStorage used: " + totalSize + " bytes");
