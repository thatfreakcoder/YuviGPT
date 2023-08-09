let conversation_id;
let parent_id;

function sendNewMessage(message) {
    const lastMsgDiv = document.querySelectorAll('.wrap')
    const lastMsg = lastMsgDiv[lastMsgDiv.length - 1].children[0];
    let div;
    if (lastMsg.className.includes('outgoing')) {
        div = `<div class="message outgoing" data-aos="fade-up-left">
            <div class="speech-bubble">
                <p>${message}</p>
            </div>
        </div>
    </div>`;
        const divListToInsert = document.querySelectorAll('.wrap')
        divListToInsert[divListToInsert.length - 1].innerHTML += div;
    } else {
        div = `<div class="wrap">
        <div class="message outgoing" data-aos="fade-up-left">
        <div class="profile-picture">
            <img src="https://images.unsplash.com/photo-1548655820-aaef3a7db508?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODQ1MjMyMDV8&ixlib=rb-4.0.3&q=85"
            alt="Profile Picture">
        </div>
        <div class="speech-bubble">
            <p>${message}</p>
        </div>
    </div>
                </div>`;
        document.getElementById('msgBox').innerHTML += div;
    }
}


function sendIncomingMessage(message, removeTyping) {
    if (removeTyping != true) {
        const div = `<div class="wrap">
    <div class="message" data-aos="fade-up-left">
    <div class="profile-picture">
                    <img src="https://images.unsplash.com/photo-1562695914-1970cc32ef52?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODQ1MjMyMDV8&ixlib=rb-4.0.3&q=85"
                    alt="Profile Picture" />
                </div>
    <div class="speech-bubble">
    <p id='last-msg'>${message}</span></p>
    </div>
    </div>
    </div>`;
        document.getElementById('msgBox').innerHTML += div;
        scrollToBottomSmoothly();
    } else {
        message = marked.parse(message)
        document.getElementById('last-msg').innerHTML = message;
        document.getElementById('last-msg').removeAttribute('id');
    }
}

document.addEventListener('aos:out', ({ detail }) => {
    detail.removeAttribute('data-aos');
})


function scrollToBottomSmoothly() {
    console.log('scrolling');
    const chatContainer = document.getElementById('gutter-bottom');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}


async function getStarted() {
    const response = await fetch('http://localhost:5000/start');
    const { message, conversation_id, parent_id } = await response.json();
    console.log(message, conversation_id, parent_id);
}

async function sendMessage() {
    const message = document.getElementById('message').value;
    sendNewMessage(message);
    setTimeout(() => {
        if (message.includes('?')) {
        sendIncomingMessage("thinking...", false);
        } else {
        sendIncomingMessage("typing...", false);
        }
    }, 600);
    const response = await fetch('http://localhost:5000/chat?conversation_id=0e557191-3db2-4180-a05b-fc94d1cf05f0&prompt=' + message);
    ({ message: reply, conversation_id, parent_id } = await response.json());
    console.log("reply:", reply, "\nconversation_id:", conversation_id, "\nparent_id:", parent_id);
    sendIncomingMessage(reply, true);
}