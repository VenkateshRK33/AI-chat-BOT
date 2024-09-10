
document.getElementById('chat-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let userInput = document.getElementById('user_input').value;
    if (userInput) {
        appendChatLog('user', userInput);
        document.getElementById('user_input').value = ''; // Clear input box

        console.log(`Sending to server: ${userInput}`);  // Log user input

        // Send user input to Flask backend
        fetch('/get_response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `user_input=${userInput}`
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(`Received from server: ${data.response}`);  // Log AI response
            appendChatLog('ai', data.response);
        })
        .catch(error => {
            console.error('Error:', error);  // Log error
            appendChatLog('ai', "Error processing your request.");
        });
    }
});

function appendChatLog(sender, message) {
    const chatLog = document.getElementById('chat-log');
    const newMessage = document.createElement('div');
    newMessage.classList.add('chat-message');
    newMessage.classList.add(sender);
    newMessage.innerHTML = `<strong>${sender === 'user' ? 'You' : 'AI'}:</strong> ${message}`;
    chatLog.appendChild(newMessage);
    chatLog.scrollTop = chatLog.scrollHeight; // Scroll to the bottom
}
