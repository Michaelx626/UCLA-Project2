const userQuestion = document.getElementById("user-input");
const sendBtn = document.getElementById("sendBtn");

/* Send question to server using Post request and recieve response
 * @userQuestion - question asked by user
 * @aiResponseText - string response returned by AI
 * @messageContainer - container that stores the whole chat between AI and user
 * @messageResponse - response from AI after it is turned into HTML element
 * @returns - @messageResponse
 * @questionElement - question asked by user turned into HTML Div element and appended to messageContainer
 */

const aiResponse = async () => {
  if (userQuestion.value === '') {
    alert('Please enter a prompt first!');
  } else {
    const messageContainer = document.getElementById("messages")
    const question = userQuestion.value;

    const userMessageEl = document.createElement('div')
    userMessageEl.setAttribute('class', 'p-1 m-1')
    const userIdEl = document.createElement('p')
    userIdEl.setAttribute('class', 'p-0 m-0')
    userIdEl.textContent = 'You:'
    userMessageEl.appendChild(userIdEl);

    const userTextEl = document.createElement('div')
    userTextEl.setAttribute('class', 'content');
    userTextEl.setAttribute('style', 'background-color: #1c3fdd; color: white;')
    userTextEl.textContent = question;
    userMessageEl.appendChild(userTextEl)
    messageContainer.appendChild(userMessageEl)

    // const questionElement = document.createElement('div');
    // questionElement.innerHTML = userMessageResponse;
    // messageContainer.appendChild(questionElement)
    userQuestion.value = "";


    const url = "http://localhost:5000/airesponse"; 
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: question }),
    });
    const responseData = await response.json();
    const aiResponseText = responseData.data;

    const aiMessageEl = document.createElement('div')
    aiMessageEl.setAttribute('class', 'p-1 m-1')
    const aiIdEl = document.createElement('p')
    aiIdEl.setAttribute('class', 'p-0 m-0')
    aiIdEl.textContent = 'AI Assistant:'
    aiMessageEl.appendChild(aiIdEl);

    const aiTextEl = document.createElement('div')
    aiTextEl.setAttribute('class', 'content');
    aiTextEl.textContent = aiResponseText;
    aiMessageEl.appendChild(aiTextEl)
    messageContainer.appendChild(aiMessageEl)

  // const responseElement = document.createElement('div');
  // responseElement.innerHTML = messageResponse;
  // messageContainer.appendChild(responseElement);
  }
};

sendBtn.addEventListener("click", aiResponse);

/*
*@return - returns the timestamp in which the chat started
*/

function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let amOrPm = hours < 12 ? 'AM' : 'PM';
    hours = hours % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds} ${amOrPm}`;
  }

  let timestamp = document.getElementById("timestamp");
  timestamp.innerText = getCurrentTime();
  


