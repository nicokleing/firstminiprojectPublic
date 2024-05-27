document.addEventListener("DOMContentLoaded", function () {
    const botonesDiv = document.getElementById("botones");
    const signupModal = document.querySelector(".signup-form-wrapper");
    const loginModal = document.querySelector(".login-form-wrapper");
    const signupBtn = document.querySelector(".signup-btn");
    const loginBtn = document.querySelector(".login-btn");
    const signupX = document.querySelector(".signup-x");
    const loginX = document.querySelector(".login-x");
    const formContainer = document.querySelector(".form-container");
    const chatboxModal = document.querySelector(".chatbox-modal");
    const chatboxX = document.querySelector(".chatbox-x");
    const chatboxBtn = document.querySelector("#chatbox-btn");
  
    // Event listeners for signup and login modals
    signupBtn.addEventListener("click", () => {
        signupModal.style.display = "block";
        formContainer.classList.add("disable");
    });
  
    loginBtn.addEventListener("click", () => {
        loginModal.style.display = "block";
        formContainer.classList.add("disable");
    });
  
    signupX.addEventListener("click", () => {
        signupModal.style.display = "none";
        formContainer.classList.remove("disable");
    });
  
    loginX.addEventListener("click", () => {
        loginModal.style.display = "none";
        formContainer.classList.remove("disable");
    });
  
    // Event listeners for chatbox modal
    chatboxBtn.addEventListener("click", () => {
        chatboxModal.style.display = "block";
        addWelcomeMessage();  // Añadir mensaje de bienvenida al abrir el chat
    });
  
    chatboxX.addEventListener("click", () => {
        chatboxModal.style.display = "none";
    });
  
    document.getElementById('reset').addEventListener('click', () => {
        document.getElementById('chat-body').innerHTML = '';
    });
  
    // Define a function to add welcome message to the chat body
    function addWelcomeMessage() {
        // Check if the welcome message has already been added
        if (document.querySelector(".welcome-message")) return;
        addMessage("welcome-message", "Welcome to Data Science Center");
    }
  
    // Chat functionality
    let conversation = [
        {
            role: "user",
            content: "You are an expert in Data Science and Software Engineering",
        },
    ];
  
    // Define a variable to count the user's messages
    let userMessageCount = 0;
    const maxUserMessages = 10;
  
    async function sendPrompt() {
        const promptInput = document.getElementById("prompt");
        const userText = promptInput.value.trim();  // Get the text entered by the user
  
        // Check if the message limit has been reached
        if (userMessageCount >= maxUserMessages) {
            addMessage("error", "You have reached the maximum number of messages allowed, it's only a test.");
            return;  // Prevent more messages from being sent
        }
  
        if (userText !== "") {
            // Increment the user's message count
            userMessageCount++;
            // Add the user's message to the conversation and the chatbox
            conversation.push({ role: "user", content: userText });
            addMessage("sent", userText);  // Visually add the user's message to the chatbox
  
            try {
                console.log("Sending request to API");
                const response = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer ",
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages: conversation,
                        max_tokens: 2000,
                        temperature: 0,
                        top_p: 1,
                        frequency_penalty: 0,
                        presence_penalty: 0.5,
                    }),
                });
  
                if (response.ok) {
                    const apiResponse = await response.json();
                    const aiMessage = apiResponse.choices[0].message.content;
                    conversation.push({ role: "assistant", content: aiMessage });
                    addMessage("received", aiMessage);
                } else {
                    console.log("Error fetching response:", response.statusText);
                    addMessage("error", "Sorry, I couldn't fetch the response.");
                }
            } catch (error) {
                console.error("Error in sendPrompt:", error);
                addMessage("error", "Error communicating with the server.");
            } finally {
                promptInput.value = "";  // Clear the input field after sending the message
            }
        }
    }
  
    function addMessage(type, text) {
        const messageContainer = document.createElement("div");
        messageContainer.className = type + " message";
  
        const messageText = document.createElement("p");
        messageText.innerText = text;
        messageContainer.appendChild(messageText);
  
        document.getElementById("chat-body").appendChild(messageContainer);
        scrollToBottom();
    }
  
    function scrollToBottom() {
        const chatBody = document.getElementById("chat-body");
        chatBody.scrollTop = chatBody.scrollHeight;
    }
  
    document.getElementById("send-button").addEventListener("click", sendPrompt);
    document.getElementById("prompt").addEventListener("keyup", function (event) {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            sendPrompt();
        }
    });
  });
