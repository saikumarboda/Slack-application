async function fetchMessagesForChannel(channel_name) {
    const res = await fetch(
      `https://edyst-slack.herokuapp.com/channel/${channel_name}`
    );
    const messages = res.json();
    console.log(messages);
    return messages;
  }
  
  function populateMessages(channel_name, messages) {
    const ul = document.getElementById("messages-list");
    ul.innerHTML = "";
    for (const message of messages) {
      const html = `
  <li class="message">
    <img class="message-photo" src="${message.sender.photo}" 
         alt="profile photo for ${message.sender.name}"
    >
    <div class="message-object">
      <span class="name">${message.sender.name}</span>
      <span class="time">${message.created_at}</span>
      <div class="content">${message.content}</div>
    </div>
  </li>
  `;
  
      ul.innerHTML += html;
    }
  }
  
  function setActiveChannel(channel_name) {
    const channels = document.querySelectorAll("#channels-list li");
  
    channels.forEach((channel) => {
      channel.classList.remove("active");
    });
  
    const li = document.getElementById(channel_name);
    li.classList.add("active");
    li.classList.remove("unread");
  
    const ul = document.getElementById("messages-list");
    ul.innerHTML = "";
  }
  
  async function setChannel(channel_name) {
    setActiveChannel(channel_name);
  
    const messages = await fetchMessagesForChannel(channel_name);
    console.log(messages);
    populateMessages(channel_name, messages);
  }
  
  const devweekly = document.getElementById("dev-team-weekly");
  devweekly.addEventListener("click", function () {
    setChannel("dev-team-weekly");
  });
  
  const projectcheckout = document.getElementById("project-checkout");
  projectcheckout.addEventListener("click", async function () {
    setChannel("project-checkout");
  });
  
  const salesapprovals = document.getElementById("sales-approvals");
  salesapprovals.addEventListener("click", async function () {
    setChannel("sales-approvals");
  });
  