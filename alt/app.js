/*

|| Instagram: @emnatkins

|| Codepen: @emnatkins

|| GitHub: @emnatkins

*/


var send_icon = document.getElementsByClassName("send-icon")[0];
var input = document.getElementsByClassName("InputMSG")[0];
var ContentChat = document.getElementsByClassName("ContentChat")[0];
var san1 = document.getElementById("send1");
var san2 = document.getElementById("send2");
// Add event Click for icon send input massage

send_icon.addEventListener("click", SendMsgUser);

// Add event Enter for input massage
input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    SendMsgUser();
  }
});

//With the help of this parameter, we can find out whether the function status_func_SendMsgBot is difficult to send a message or not (0 = no | 1 = yes)
var status_func_SendMsgBot = 0;

// ---------------- Massage User ----------------

// Function Send Massage user in content chat
function SendMsgUser() {
  if (input.value != "" && status_func_SendMsgBot == 0) {
    san1.classList.add("none");
    san2.classList.remove("none");

    let elementCPT = document.createElement("div");
    elementCPT.classList.add("massage", "msgCaption");
    elementCPT.setAttribute("data-user", "true");
    elementCPT.innerHTML = '<span class="captionUser">You</span>';
    ContentChat.appendChild(elementCPT);

    let elementMSG = document.createElement("div");
    elementMSG.classList.add("massage");
    elementMSG.setAttribute("data-user", "true");
    elementMSG.innerHTML = `<div class="user-response">${input.value}</div>`;
    ContentChat.appendChild(elementMSG);
    elementMSG.scrollIntoView();
    SendMsgBot(input.value);
    input.value = "";
  }
}

// ---------------- Massage Bot ----------------

// Function Send Massage bot(RagBot) in content chat
function SendMsgBot(msg) {
  msg = msg.toLowerCase();
  msg = msg.replace(/<\s*br[^>]?>/, "\n");
  msg = msg.replace(/(<([^>]+)>)/g, "");

  status_func_SendMsgBot = 1;

  let elementCPT = document.createElement("div");
  elementCPT.classList.add("captionBot", "msgCaption");
  elementCPT.innerHTML =
    '<img src="https://raw.githubusercontent.com/emnatkins/cdn-codepen/main/wvjGzXp/6569264.png" alt="RagBot"> <span>RagBot</span>';
  ContentChat.appendChild(elementCPT);
  elementCPT.scrollIntoView();

  let listMSG = {
    hello: [
      "Hello!",
      "Hi 👋 ! It's good to see you!",
      "Great to see you here!",
    ],
    hwa: [
      "I'm fine!",
      "I am fine",
      "I feel good seeing you 😊",
      "I feel great 🤪",
    ],
    about: [
      "I'm happy you asked about that!",
      "My name is RayBot, I'm a simple and fun bot and I can answer your questions to some extent and do the things you want 😉",
    ],
  };

  let listScan = {
    hello: ["hi", "hello", "hey"],
    hwa: [
      "how are you",
      "hwa",
      "you are good",
      "you are fine",
      "are you well",
      "are you alright",
    ],
    about: [
      "information",
      "tell me about yourself",
      "introduce yourself",
      "who are you",
      "how about your self",
    ],
  };

  let elementMSG = document.createElement("div");
  elementMSG.classList.add("massage");
  elementMSG.innerHTML = `<div class="bot-response text" text-first="true"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"> <rect x="0" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> <rect x="10" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> <rect x="20" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> </svg></div>`;
  ContentChat.appendChild(elementMSG);

  let result;
  setTimeout(() => {
    for (i of listScan["hello"]) {
      if (i == msg || i + "?" == msg || i + "!" == msg) {
        result = `<div class="bot-response text" text-first="true">${
          listMSG["hello"][Math.floor(Math.random() * 3)]
        }</div>`;
      }
    }
    if (result == "" || result == undefined) {
      for (i of listScan["hwa"]) {
        if (i == msg || i + "?" == msg || i + "!" == msg) {
          result = `<div class="bot-response text" text-first="true">${
            listMSG["hwa"][Math.floor(Math.random() * 3)]
          }</div>`;
        }
      }
    }
    if (result == "" || result == undefined) {
      for (i of listScan["about"]) {
        if (i == msg || i + "?" == msg || i + "!" == msg) {
          result = `<img src="https://raw.githubusercontent.com/emnatkins/cdn-codepen/main/wvjGzXp/GvYEn0QMm8_xLFjS.png" alt="about raybot"></img><div class="bot-response text" text-first="true">${listMSG["about"][0]}</div><div class="bot-response text" text-last="true">${listMSG["about"][1]}</div>`;
        }
      }
    }

    if (result == "" || result == undefined) {
      result = `<div class="bot-response text" text-first="true">😵‍💫 Oops! Sorry, I didn't understand your question</div>`;
    }

    elementMSG.innerHTML = result;
    elementMSG.scrollIntoView();
    san1.classList.remove("none");
    san2.classList.add("none");
    status_func_SendMsgBot = 0;
  }, 2000);
  ContentChat.appendChild(elementMSG);
  elementMSG.scrollIntoView();
}


{
  let elementCPT = document.createElement("div");
  elementCPT.classList.add("captionBot", "msgCaption");
  elementCPT.innerHTML =
    '<img src="https://raw.githubusercontent.com/emnatkins/cdn-codepen/main/wvjGzXp/6569264.png" alt="RagBot"> <span>RagBot</span>';
  ContentChat.appendChild(elementCPT);
  elementCPT.scrollIntoView();

  setTimeout(() => {
    elementMSG.innerHTML = `<div class="bot-response text" text-first="true">Hi 👋 ! It's good to see you!</div><div class="bot-response text" text-last="true">How can I help you?</div>`;
    elementMSG.scrollIntoView();
    san1.classList.remove("none");
    san2.classList.add("none");
    status_func_SendMsgBot = 0;
  },2000)


  let elementMSG = document.createElement("div");
  elementMSG.classList.add("massage");
  elementMSG.innerHTML = `<div class="bot-response text" text-first="true"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"> <rect x="0" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> <rect x="10" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> <rect x="20" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> </svg></div>`;
  ContentChat.appendChild(elementMSG);

  status_func_SendMsgBot = 1;
  san1.classList.add("none");
  san2.classList.remove("none");
  elementMSG.scrollIntoView();
}