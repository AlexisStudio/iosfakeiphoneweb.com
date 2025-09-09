const screen = document.getElementById("screen");
let calcInput = "";
let notes = ["Welcome to Notes! Tap + to add."];
const photos = [
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&q=60",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=60",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=60"
];
let musicPlaying = false;

function homeScreen() {
  const time = new Date().toLocaleTimeString();
  screen.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center">
      <div style="font-size:18px;font-weight:600">Web iPhone</div>
      <div style="font-size:14px">${time}</div>
    </div>
    <div class="home-grid">
      ${appIcon("🕒","Clock","clock")}
      ${appIcon("🧮","Calculator","calc")}
      ${appIcon("🗒️","Notes","notes")}
      ${appIcon("🖼️","Photos","photos")}
      ${appIcon("🌤️","Weather","weather")}
      ${appIcon("💬","Messages","messages")}
      ${appIcon("🎵","Music","music")}
    </div>`;
}

function appIcon(emoji, label, app) {
  return `<div class="app-icon" onclick="openApp('${app}')">
    <div>${emoji}</div>
    <div style="font-size:12px">${label}</div>
  </div>`;
}

function openApp(app) {
  if(app==="clock"){
    const now = new Date();
    screen.innerHTML = `<div class="app-frame"><header><span>Clock</span><button onclick=homeScreen()>✕</button></header>
    <div style="text-align:center;margin-top:20px">
      <div style="font-size:48px;font-weight:700">${now.toLocaleTimeString()}</div>
      <div>${now.toLocaleDateString()}</div>
    </div></div>`;
  }
  if(app==="calc"){
    screen.innerHTML = `<div class="app-frame"><header><span>Calculator</span><button onclick=homeScreen()>✕</button></header>
    <div class="calc-display" id="calc-display">0</div>
    <div class="calc-grid">
      ${["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+"]
        .map(k=>`<button onclick=pressCalc('${k}')>${k}</button>`).join("")}
      <button style="grid-column:span 4;background:rgba(255,0,0,0.12)" onclick=pressCalc('C')>C</button>
    </div></div>`;
  }
  if(app==="notes"){
    screen.innerHTML = `<div class="app-frame"><header><span>Notes</span>
    <button onclick=addNote()>+ New</button><button onclick=homeScreen()>✕</button></header>
    <ul class="notes-list">${notes.map((n,i)=>`<li>${n}<button onclick=deleteNote(${i})>❌</button></li>`).join("")}</ul></div>`;
  }
  if(app==="photos"){
    screen.innerHTML = `<div class="app-frame"><header><span>Photos</span><button onclick=homeScreen()>✕</button></header>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:8px">
    ${photos.map(p=>`<img src="${p}" style="width:100%;height:160px;object-fit:cover;border-radius:10px">`).join("")}</div></div>`;
  }
  if(app==="weather"){
    screen.innerHTML = `<div class="app-frame"><header><span>Weather</span><button onclick=homeScreen()>✕</button></header>
    <div style="text-align:center;margin-top:20px;font-size:18px">
      🌤️ 28°C, Partly Cloudy<br><br>\n      Tomorrow: 🌧️ 25°C, Rainy<br>\n      Next Day: ☀️ 30°C, Sunny\n    </div></div>`;
  }
  if(app==="messages"){
    screen.innerHTML = `<div class="app-frame"><header><span>Messages</span><button onclick=homeScreen()>✕</button></header>
    <div style="padding:10px;font-size:14px">
      <p><b>Alice:</b> Hey, how are you?</p>
      <p><b>You:</b> Doing great! Testing this fake iPhone 😄</p>
      <p><b>Alice:</b> Haha nice!</p>
    </div></div>`;
  }
  if(app==="music"){
    screen.innerHTML = `<div class="app-frame"><header><span>Music</span><button onclick=homeScreen()>✕</button></header>
    <div style="text-align:center;margin-top:30px">
      🎵 Now Playing: <b>Demo Song</b><br><br>
      <button onclick=toggleMusic()>${musicPlaying ? "⏸️ Pause" : "▶️ Play"}</button>
    </div></div>`;
  }
}

function pressCalc(k){
  if(k==='C'){calcInput="";}
  else if(k==='='){
    try{calcInput=eval(calcInput).toString();}catch{calcInput="Error";}
  } else {calcInput+=k;}
  document.getElementById('calc-display').innerText=calcInput||"0";
}

function addNote(){
  const text = prompt("New note:");
  if(text){notes.unshift(text); openApp('notes');}
}

function deleteNote(i){
  if(confirm("Delete this note?")){
    notes.splice(i,1);
    openApp('notes');
  }
}

function toggleMusic(){
  musicPlaying = !musicPlaying;
  openApp('music');
}

setInterval(()=>{
  if(screen.innerHTML.includes("Web iPhone")) homeScreen();
},1000);

homeScreen();
