var send_icon = document.getElementsByClassName("send-icon")[0];
var input = document.getElementsByClassName("InputMSG")[0];
var ContentChat = document.getElementsByClassName("ContentChat")[0];
var san1 = document.getElementById("send1");
var san2 = document.getElementById("send2");
var parent_id;
var conversation_id;
// Add event Click for icon send input massage

send_icon.addEventListener("click", SendMsgByUser);

// Add event Enter for input massage
input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    SendMsgByUser();
  }
});

//With the help of this parameter, we can find out whether the function status_func_SendMsgByBot is difficult to send a message or not (0 = no | 1 = yes)
var status_func_SendMsgByBot = 0;

// ---------------- Massage User ----------------

// Function Send Massage user in content chat
function SendMsgByUser() {
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
async function SendMsgByBot(msg) {
  status_func_SendMsgByBot = 1;

  let elementCPT = document.createElement("div");
  elementCPT.classList.add("captionBot", "msgCaption");
  elementCPT.innerHTML = '<img src="../assets/yuvraj-image.jpg" alt="YuviGPT"> <span>YuviGPT</span>';
  ContentChat.appendChild(elementCPT);
  elementCPT.scrollIntoView();

  let elementMSG = document.createElement("div");
  elementMSG.classList.add("massage");
  elementMSG.innerHTML = `<div class="bot-response text" text-first="true"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"> <rect x="0" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> <rect x="10" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> <rect x="20" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> </svg></div>`;
  ContentChat.appendChild(elementMSG);

  let result;
  // setTimeout(async () => {
  const response = await fetch(`http://localhost:5000/chat?conversation_id=9423823c-c1f7-4fca-8471-915fabb0bbeb&parent_id=${parent_id}&prompt=${msg}`);
  ({ message: reply, conversation_id, parent_id } = await response.json());
  reply = marked.parse(reply)
  result = `<div class="bot-response text" text-first="true">${reply}</div>`;

  elementMSG.innerHTML = result;
  elementMSG.scrollIntoView();
  san1.classList.remove("none");
  san2.classList.add("none");
  status_func_SendMsgByBot = 0;
  // }, 2000);
  ContentChat.appendChild(elementMSG);
  elementMSG.scrollIntoView();
}


document.addEventListener("DOMContentLoaded", async () => {
  let elementCPT = document.createElement("div");
  elementCPT.classList.add("captionBot", "msgCaption");
  elementCPT.innerHTML = '<img src="../assets/yuvraj-image.jpg" alt="YuviGPT"> <span>YuviGPT</span>';
  ContentChat.appendChild(elementCPT);
  elementCPT.scrollIntoView();

  let elementMSG = document.createElement("div");
  elementMSG.classList.add("massage");
  elementMSG.innerHTML = `<div class="bot-response text" text-first="true"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"> <rect x="0" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> <rect x="10" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> <rect x="20" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> </svg></div>`;
  ContentChat.appendChild(elementMSG);

  status_func_SendMsgByBot = 1;
  san1.classList.add("none");
  san2.classList.remove("none");
  elementMSG.scrollIntoView();

  // setTimeout(() => {
  const response = await fetch(`http://localhost:5000/start`);
  ({ message: reply, conversation_id, parent_id } = await response.json());
  reply = marked.parse(reply);
  elementMSG.innerHTML = `<div class="bot-response text" text-first="true">${reply}</div>`;
  elementMSG.scrollIntoView();
  san1.classList.remove("none");
  san2.classList.add("none");
  status_func_SendMsgByBot = 0;
  // }, 2000)
});