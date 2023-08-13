var send_icon = document.getElementsByClassName("send-icon")[0];
var input = document.getElementsByClassName("InputMSG")[0];
var ContentChat = document.getElementsByClassName("ContentChat")[0];
var san1 = document.getElementById("send1");
var san2 = document.getElementById("send2");
var parent_id;
var conversation_id;
// Add event Click for icon send input message

send_icon.addEventListener("click", SendMsgByUser);

// Add event Enter for input message
input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    SendMsgByUser();
  }
});

//With the help of this parameter, we can find out whether the function status_func_SendMsgByBot is difficult to send a message or not (0 = no | 1 = yes)
var status_func_SendMsgByBot = 0;

// ---------------- message User ----------------

// Function Send message user in content chat
function SendMsgByUser(from_input_field = true, msg = "") {
  if (from_input_field) {
    console.log("triggered from input field");
    if (input.value != "" && status_func_SendMsgByBot == 0) {
      san1.classList.add("none");
      san2.classList.remove("none");

      let elementCPT = document.createElement("div");
      elementCPT.classList.add("message", "msgCaption");
      elementCPT.setAttribute("data-user", "true");
      elementCPT.innerHTML = '<span class="captionUser">You</span>';
      ContentChat.appendChild(elementCPT);

      let elementMSG = document.createElement("div");
      elementMSG.classList.add("message");
      elementMSG.setAttribute("data-user", "true");
      elementMSG.innerHTML = `<div class="user-response">${input.value}</div>`;
      ContentChat.appendChild(elementMSG);
      elementMSG.scrollIntoView();
      SendMsgByBot(input.value);
      input.value = "";
    }
  } else {
    console.log("triggered from button click");
    san1.classList.add("none");
    san2.classList.remove("none");

    let elementCPT = document.createElement("div");
    elementCPT.classList.add("message", "msgCaption");
    elementCPT.setAttribute("data-user", "true");
    elementCPT.innerHTML = '<span class="captionUser">You</span>';
    ContentChat.appendChild(elementCPT);

    let elementMSG = document.createElement("div");
    elementMSG.classList.add("message");
    elementMSG.setAttribute("data-user", "true");
    elementMSG.innerHTML = `<div class="user-response">${msg}</div>`;
    ContentChat.appendChild(elementMSG);
    elementMSG.scrollIntoView();
    SendMsgByBot(msg);
    document.getElementById("follow-up-btn-group").remove();
  }
}

// ---------------- message Bot ----------------

// Function Send message bot(RagBot) in content chat
async function SendMsgByBot(msg) {
  status_func_SendMsgByBot = 1;

  let elementCPT = document.createElement("div");
  elementCPT.classList.add("captionBot", "msgCaption");
  elementCPT.innerHTML = '<img src="./assets/yuvraj-image.jpg" alt="YuviGPT"> <span>YuviGPT</span>';
  ContentChat.appendChild(elementCPT);
  elementCPT.scrollIntoView();

  let elementMSG = document.createElement("div");
  elementMSG.classList.add("message");
  elementMSG.innerHTML = `<div class="bot-response text" text-first="true"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"> <rect x="0" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> <rect x="10" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> <rect x="20" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> </svg></div>`;
  ContentChat.appendChild(elementMSG);

  let statusElement = document.getElementById("status");
  statusElement.innerHTML = "Typing...";

  let result;
  // setTimeout(async () => {
  const response = await fetch(`http://localhost:5000/chat?conversation_id=${conversation_id}&parent_id=${parent_id}&prompt=${msg}`);
  ({ message: reply, conversation_id, parent_id } = await response.json());
  const output = getFollowUpQuestion(reply);
  reply = marked.parse(output.msg);
  // let reply = "Hello world!"
  result = `
    <div class="bot-response text" text-first="true">${reply}</div>
    <div class="d-flex flex-column mt-3" id="follow-up-btn-group">
        <button type="button" onclick="SendMsgByUser(false, '${output.follow_ups[0]}')" class="follow-up btn btn-outline-primary">${output.follow_ups[0]}</button>
        <button type="button" onclick="SendMsgByUser(false, '${output.follow_ups[1]}')" class="follow-up btn btn-outline-primary">${output.follow_ups[1]}</button>
        <button type="button" onclick="SendMsgByUser(false, '${output.follow_ups[2]}')" class="follow-up btn btn-outline-primary">${output.follow_ups[2]}</button>
      </div>
    `;

  elementMSG.innerHTML = result;
  elementMSG.scrollIntoView();
  san1.classList.remove("none");
  san2.classList.add("none");
  status_func_SendMsgByBot = 0;
  statusElement.innerHTML = "Online";
  // }, 2000);
  ContentChat.appendChild(elementMSG);
  elementMSG.scrollIntoView();
}


document.addEventListener("DOMContentLoaded", async () => {
  let elementCPT = document.createElement("div");
  elementCPT.classList.add("captionBot", "msgCaption");
  elementCPT.innerHTML = '<img src="./assets/yuvraj-image.jpg" alt="YuviGPT"> <span>YuviGPT</span>';
  ContentChat.appendChild(elementCPT);
  elementCPT.scrollIntoView();

  let elementMSG = document.createElement("div");
  elementMSG.classList.add("message");
  elementMSG.innerHTML = `<div class="bot-response text" text-first="true"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"> <rect x="0" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> <rect x="10" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> <rect x="20" y="0" width="4" height="10" fill="rgb(155, 166, 178)"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite"> </animateTransform> </rect> </svg></div>`;
  ContentChat.appendChild(elementMSG);

  let statusElement = document.getElementById("status");
  statusElement.innerHTML = "Typing...";

  status_func_SendMsgByBot = 1;
  san1.classList.add("none");
  san2.classList.remove("none");
  elementMSG.scrollIntoView();

  // setTimeout(() => {
  // let reply = "Hello world!"
  const response = await fetch(`http://localhost:5000/start`);
  ({ message: reply, conversation_id, parent_id } = await response.json());
  const output = getFollowUpQuestion(reply);
  reply = marked.parse(output.msg);
  elementMSG.innerHTML = `
    <div class="bot-response text" text-first="true">${reply}</div>
    <div class="d-flex flex-column mt-3" id="follow-up-btn-group">
        <button type="button" onclick="SendMsgByUser(false, '${output.follow_ups[0]}')" class="follow-up btn btn-outline-primary">${output.follow_ups[0]}</button>
        <button type="button" onclick="SendMsgByUser(false, '${output.follow_ups[1]}')" class="follow-up btn btn-outline-primary">${output.follow_ups[1]}</button>
        <button type="button" onclick="SendMsgByUser(false, '${output.follow_ups[2]}')" class="follow-up btn btn-outline-primary">${output.follow_ups[2]}</button>
      </div>
    `;
  elementMSG.scrollIntoView();
  san1.classList.remove("none");
  san2.classList.add("none");
  status_func_SendMsgByBot = 0;
  statusElement.innerHTML = "Online";
  // }, 2000)
});


function getFollowUpQuestion(input) {
  try {
    const json = input.match(/\{\s*"follow_up"\s*:\s*(.+?)\s*\}/)[0];
    const follow_ups = JSON.parse(json).follow_up;
    const remaining = input.replace(json, "").replace("``````", "");
    const output = {
      "msg": remaining,
      follow_ups
    }
    console.log(output);
    return output
  } catch (e) {
    const follow_ups = ["Tell me about your Projects!", "What are your future plans?", "How do you spend your free time?"];
    const remaining = input;
    const output = {
      "msg": remaining,
      follow_ups
    }
    console.log(output);
    return output
  }
}