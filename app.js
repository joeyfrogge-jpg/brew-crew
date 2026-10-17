/* Brew Crew — fully playable game logic */
const state = {
  xp: +localStorage.getItem("bc_xp") || 42,
  served: +localStorage.getItem("bc_served") || 0,
  correct: +localStorage.getItem("bc_correct") || 0,
  streak: +localStorage.getItem("bc_streak") || 0,
  bestStreak: +localStorage.getItem("bc_best") || 0,
  perfectQuiz: localStorage.getItem("bc_perfect_quiz") === "1",
  rushWin: localStorage.getItem("bc_rush_win") === "1",
  unlocked: JSON.parse(localStorage.getItem("bc_ach") || "[]"),
  order: null, step: 1, selectedSize: null, selectedDrink: null, selectedScoops: 0,
  rush: false, rushTimer: null, rushLeft: 45, rushCorrect: 0, rushTotal: 0,
  deck: "signature", cardIndex: 0, decks: {},
  quiz: null, qIndex: 0, qCorrect: 0, selectedOption: null
};
function save() {
  localStorage.setItem("bc_xp", state.xp);
  localStorage.setItem("bc_served", state.served);
  localStorage.setItem("bc_correct", state.correct);
  localStorage.setItem("bc_streak", state.streak);
  localStorage.setItem("bc_best", state.bestStreak);
  localStorage.setItem("bc_perfect_quiz", state.perfectQuiz ? "1" : "0");
  localStorage.setItem("bc_rush_win", state.rushWin ? "1" : "0");
  localStorage.setItem("bc_ach", JSON.stringify(state.unlocked));
}
let audioCtx;
function tone(freq, dur=0.12, type="sine", gain=0.08) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = type; o.frequency.value = freq; g.gain.value = gain;
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
    o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime + dur);
  } catch(_) {}
}
function sfxOk() { tone(523,0.08); setTimeout(()=>tone(784,0.12),80); }
function sfxBad() { tone(200,0.2,"square",0.06); }
function sfxClick() { tone(660,0.04,"triangle",0.04); }
function sfxLevel() { tone(392,0.1); setTimeout(()=>tone(523,0.1),100); setTimeout(()=>tone(784,0.2),200); }

function fireConfetti() {
  const c = document.getElementById("confetti");
  c.hidden = false;
  const ctx = c.getContext("2d");
  c.width = innerWidth; c.height = innerHeight;
  const pieces = Array.from({length:70},()=>({
    x: Math.random()*c.width, y: -20-Math.random()*80, w:6+Math.random()*6, h:8+Math.random()*8,
    vy:2+Math.random()*4, vx:-2+Math.random()*4, rot:Math.random()*Math.PI, vr:-0.2+Math.random()*0.4,
    color:["#c45c26","#2d6a4f","#e9c46a","#e76f51","#264653"][Math.floor(Math.random()*5)]
  }));
  let frames=0;
  (function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    pieces.forEach(p=>{ p.x+=p.vx; p.y+=p.vy; p.rot+=p.vr; p.vy+=0.08;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot); ctx.fillStyle=p.color; ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h); ctx.restore(); });
    if (++frames<90) requestAnimationFrame(draw); else { ctx.clearRect(0,0,c.width,c.height); c.hidden=true; }
  })();
}

function currentRank() { let r=RANKS[0]; for (const x of RANKS) if (state.xp>=x.xp) r=x; return r; }
function nextRank() { const i=RANKS.indexOf(currentRank()); return RANKS[i+1]||null; }
function checkAchievements() {
  const newly=[];
  ACHIEVEMENTS.forEach(a=>{ if (!state.unlocked.includes(a.id)&&a.check(state)){ state.unlocked.push(a.id); newly.push(a);} });
  if (newly.length){ save(); sfxLevel(); setTimeout(()=>alert("Achievement unlocked!\n"+newly[0].icon+" "+newly[0].name+"\n"+newly[0].desc),400); }
}

const NAV_HTML = `<button data-screen="home"><span>🏠</span>Home</button><button data-screen="counter"><span>☕</span>Counter</button><button data-screen="study"><span>📖</span>Study</button><button data-screen="drills"><span>🎯</span>Drills</button><button data-screen="quiz"><span>❓</span>Quiz</button>`;

function showScreen(name, opts={}) {
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("screen-"+name).classList.add("active");
  document.querySelectorAll(".bottom-nav").forEach(nav=>{
    nav.innerHTML = NAV_HTML;
    nav.querySelectorAll("button").forEach(b=>{
      b.classList.toggle("active", b.dataset.screen===name);
      b.onclick = ()=>showScreen(b.dataset.screen);
    });
  });
  if (name==="home") updateHome();
  if (name==="counter"){ state.rush=!!opts.rush; startNewOrder(); }
  if (name==="study"){ if (opts.deck) state.deck=opts.deck; initStudy(); }
  if (name==="drills") updateDrills();
  if (name==="quiz") startQuiz();
}

function updateHome() {
  const rank=currentRank(), next=nextRank();
  document.getElementById("home-rank").textContent=rank.name;
  document.getElementById("home-rank-emoji").textContent=rank.emoji;
  document.getElementById("home-xp").textContent=state.xp;
  document.getElementById("home-served").textContent=state.served;
  document.getElementById("home-streak").textContent=state.bestStreak;
  document.getElementById("home-acc").textContent=state.served?Math.round(state.correct/state.served*100)+"%":"—";
  if (next){ document.getElementById("home-xp-bar").style.width=Math.min(100,((state.xp-rank.xp)/(next.xp-rank.xp))*100)+"%"; document.getElementById("home-next").textContent=(next.xp-state.xp)+" XP"; }
  else { document.getElementById("home-xp-bar").style.width="100%"; document.getElementById("home-next").textContent="MAX"; }
  const box=document.getElementById("achievements-home");
  const unlocked=ACHIEVEMENTS.filter(a=>state.unlocked.includes(a.id));
  box.innerHTML=unlocked.length?`<p class="ach-label">Badges</p><div class="ach-row">${unlocked.map(a=>`<span title="${a.desc}">${a.icon}</span>`).join("")}</div>`:"";
}

function startRushTimer() {
  clearInterval(state.rushTimer);
  state.rushLeft=45; state.rushCorrect=0; state.rushTotal=0;
  document.getElementById("rush-bar").hidden=false;
  document.getElementById("rush-fill").style.width="100%";
  document.getElementById("rush-label").textContent="RUSH · 45s";
  state.rushTimer=setInterval(()=>{
    state.rushLeft--;
    document.getElementById("rush-fill").style.width=(state.rushLeft/45*100)+"%";
    document.getElementById("rush-label").textContent="RUSH · "+state.rushLeft+"s";
    if (state.rushLeft<=0){ clearInterval(state.rushTimer); endRush(); }
  },1000);
}
function endRush() {
  state.rush=false; document.getElementById("rush-bar").hidden=true; document.getElementById("feedback").hidden=true;
  const pct=state.rushTotal?Math.round(state.rushCorrect/state.rushTotal*100):0;
  if (pct>=70){ state.rushWin=true; state.xp+=40; checkAchievements(); }
  save();
  alert("Rush over!\n"+state.rushCorrect+"/"+state.rushTotal+" perfect ("+pct+"%)\n"+(pct>=70?"Rush Survivor! +40 XP":"Try for 70%+ next time."));
  showScreen("drills");
}

function startNewOrder() {
  state.order=generateRandomOrder();
  state.step=1; state.selectedSize=null; state.selectedDrink=null; state.selectedScoops=0;
  const o=state.order;
  document.getElementById("ticket-name").textContent=o.customer.toUpperCase();
  document.getElementById("ticket-emoji").textContent=o.emoji;
  document.getElementById("ticket-speech").textContent=o.speech;
  document.getElementById("ticket-order").textContent=o.orderLine;
  document.getElementById("ticket-detail").textContent=o.orderDetail;
  document.getElementById("feedback").hidden=true;
  document.querySelectorAll(".cup-btn").forEach(b=>b.classList.remove("selected"));
  document.getElementById("scoop-count").textContent="0";
  document.getElementById("drink-filter").value="";
  const t=document.getElementById("ticket"); t.classList.remove("ticket-in"); void t.offsetWidth; t.classList.add("ticket-in");
  renderDrinkGrid(); goToStep(1); updateCounterScore();
  if (state.rush && !state.rushTimer) startRushTimer();
  if (!state.rush) document.getElementById("rush-bar").hidden=true;
}
function updateCounterScore() {
  document.getElementById("counter-score").textContent=state.correct;
  const pill=document.getElementById("streak-pill");
  if (state.streak>=2){ pill.hidden=false; document.getElementById("streak-num").textContent=state.streak; }
  else pill.hidden=true;
}
function goToStep(n) {
  state.step=n;
  document.querySelectorAll(".step").forEach(s=>{ const v=+s.dataset.step; s.classList.toggle("active",v===n); s.classList.toggle("done",v<n); });
  document.querySelectorAll(".step-panel").forEach(p=>p.classList.remove("active"));
  document.getElementById({1:"panel-cup",2:"panel-drink",3:"panel-scoops",4:"panel-check"}[n]).classList.add("active");
}
function renderDrinkGrid(filter="") {
  const q=filter.toLowerCase();
  const list=DRINKS.filter(d=>!q||d.name.toLowerCase().includes(q)||d.group.toLowerCase().includes(q));
  const grid=document.getElementById("drink-grid");
  grid.innerHTML=list.map(d=>`<button class="drink-btn ${state.selectedDrink===d.name?"selected":""}" data-drink="${d.name}"><span class="d-name">${d.name}</span><span class="d-group">${d.group}</span></button>`).join("");
  grid.querySelectorAll(".drink-btn").forEach(btn=>{
    btn.onclick=()=>{ sfxClick(); state.selectedDrink=btn.dataset.drink; renderDrinkGrid(document.getElementById("drink-filter").value); setTimeout(()=>goToStep(3),220); };
  });
}
function showFeedback(ok, detail, xpGain) {
  document.getElementById("feedback").hidden=false;
  document.getElementById("feedback-icon").textContent=ok?"✓":"✗";
  document.getElementById("feedback-icon").className="feedback-icon "+(ok?"ok":"bad");
  document.getElementById("feedback-title").textContent=ok?(state.streak>=3?rand(STREAK_LINES):rand(WIN_LINES)):rand(LOSE_LINES);
  document.getElementById("feedback-detail").textContent=detail;
  const pop=document.getElementById("xp-pop");
  if (ok&&xpGain){ pop.hidden=false; pop.textContent="+"+xpGain+" XP"; } else pop.hidden=true;
  if (ok){ sfxOk(); if (state.streak>=3||state.streak===1) fireConfetti(); } else sfxBad();
}
function evaluateOrder() {
  const o=state.order;
  const sizeOk=state.selectedSize===o.size, drinkOk=state.selectedDrink===o.drink, scoopOk=state.selectedScoops===o.correctScoops;
  const allOk=sizeOk&&drinkOk&&scoopOk;
  state.served++; if (state.rush) state.rushTotal++;
  if (allOk){
    state.correct++; state.streak++; state.bestStreak=Math.max(state.bestStreak,state.streak);
    if (state.rush) state.rushCorrect++;
    const bonus=state.streak>=5?15:state.streak>=3?8:0;
    const xpGain=15+bonus+(state.rush?5:0);
    state.xp+=xpGain;
    showFeedback(true,`Perfect ${o.size} ${o.drink} · ${o.correctScoops} scoop${o.correctScoops!==1?"s":""}`,xpGain);
  } else {
    state.streak=0;
    const misses=[];
    if (!sizeOk) misses.push(`Cup: ${o.size} (not ${state.selectedSize||"—"})`);
    if (!drinkOk) misses.push(`Drink: ${o.drink}`);
    if (!scoopOk) misses.push(`Scoops: ${o.correctScoops} (not ${state.selectedScoops})`);
    showFeedback(false, misses.join(" · "));
  }
  save(); updateCounterScore(); checkAchievements();
}

function buildDecks() {
  state.decks={
    signature: SIGNATURES.map(s=>({front:s.name,back:s.flavors,extra:s.milk,cat:"Signature"})),
    scoops: DRINKS.flatMap(d=>["Small","Medium","Large"].map(sz=>({front:sz+" "+d.name,back:d.scoops[sz]+" scoop"+(d.scoops[sz]!==1?"s":""),extra:d.group,cat:"Scoops"}))),
    fills: [
      {front:"Large Iced fill line",back:"16 oz",extra:"Kids 5 · S 8 · M 12 · L 16",cat:"Fill Lines"},
      {front:"Medium Hot Espresso",back:"10 oz",extra:"Kids 6 · S 8 · M 10 · L 12",cat:"Fill Lines"},
      {front:"Large Hot Non-Espresso",back:"18 oz",extra:"Kids 8 · S 10 · M 14 · L 18",cat:"Fill Lines"},
      {front:"Light Ice",back:"+4 oz",extra:"",cat:"Fill Lines"},
      {front:"No Ice",back:"Fill to the top",extra:"",cat:"Fill Lines"},
      {front:"Kids Iced",back:"5 oz",extra:"",cat:"Fill Lines"}
    ],
    temps: [
      {front:"Regular temp",back:"160–170 °F",extra:"",cat:"Temps"},
      {front:"Kids temp",back:"110–120 °F",extra:"",cat:"Temps"},
      {front:"Extra Hot",back:"175–180 °F",extra:"",cat:"Temps"},
      {front:"Perfect shot",back:"22 seconds",extra:"Window 17–27 s",cat:"Temps"},
      {front:"Drinkable",back:"140–150 °F",extra:"",cat:"Temps"},
      {front:"Burnt",back:"181 °F+",extra:"",cat:"Temps"}
    ]
  };
}
function initStudy() {
  if (!Object.keys(state.decks).length) buildDecks();
  document.querySelectorAll(".study-tabs .tab").forEach(t=>t.classList.toggle("active",t.dataset.deck===state.deck));
  state.cardIndex=0; showCard(false);
}
function showCard(flipped) {
  const deck=state.decks[state.deck]; if (!deck?.length) return;
  const card=deck[state.cardIndex%deck.length];
  document.getElementById("card-cat").textContent=card.cat;
  document.getElementById("card-title").textContent=card.front;
  document.getElementById("card-answer").textContent=card.back;
  document.getElementById("card-extra").textContent=card.extra||"";
  document.getElementById("card-front").hidden=flipped;
  document.getElementById("card-back").hidden=!flipped;
  document.getElementById("deck-pos").textContent=(state.cardIndex%deck.length)+1;
  document.getElementById("deck-total").textContent=deck.length;
}
function updateDrills() {
  document.getElementById("stat-served").textContent=state.served;
  document.getElementById("stat-streak").textContent=state.bestStreak;
  document.getElementById("stat-accuracy").textContent=state.served?Math.round(state.correct/state.served*100)+"%":"—";
}

function startQuiz() {
  state.quiz=shuffle(buildQuizBank()).slice(0,10);
  state.qIndex=0; state.qCorrect=0; state.selectedOption=null;
  document.getElementById("quiz-result").hidden=true;
  document.getElementById("quiz-card").hidden=false;
  renderQuestion();
}
function renderQuestion() {
  if (state.qIndex>=state.quiz.length) return endQuiz();
  const q=state.quiz[state.qIndex];
  document.getElementById("q-num").textContent=state.qIndex+1;
  document.getElementById("q-correct").textContent=state.qCorrect;
  document.getElementById("q-cat").textContent=q.cat;
  document.getElementById("q-text").textContent=q.text;
  document.getElementById("q-options").innerHTML=q.options.map(o=>`<button class="q-opt" data-val="${o}">${o}</button>`).join("");
  document.getElementById("q-check").disabled=true;
  state.selectedOption=null;
  document.querySelectorAll(".q-opt").forEach(btn=>{
    btn.onclick=()=>{ document.querySelectorAll(".q-opt").forEach(b=>b.classList.remove("selected")); btn.classList.add("selected"); state.selectedOption=btn.dataset.val; document.getElementById("q-check").disabled=false; sfxClick(); };
  });
}
function endQuiz() {
  document.getElementById("quiz-card").hidden=true;
  document.getElementById("quiz-result").hidden=false;
  document.getElementById("quiz-final-score").textContent=state.qCorrect+"/10";
  document.getElementById("quiz-final-msg").textContent=state.qCorrect>=9?"Barista legend material.":state.qCorrect>=7?"Solid work, barista.":state.qCorrect>=5?"Keep studying those keys.":"Review flashcards and try again.";
  if (state.qCorrect===10) state.perfectQuiz=true;
  state.xp+=state.qCorrect*5; save(); checkAchievements();
  if (state.qCorrect>=8) fireConfetti();
}

document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll("[data-go]").forEach(btn=>{
    btn.addEventListener("click",()=>{ const opts={}; if (btn.dataset.rush) opts.rush=true; if (btn.dataset.deck) opts.deck=btn.dataset.deck; showScreen(btn.dataset.go, opts); });
  });
  document.querySelectorAll(".cup-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{ sfxClick(); document.querySelectorAll(".cup-btn").forEach(b=>b.classList.remove("selected")); btn.classList.add("selected"); state.selectedSize=btn.dataset.size; setTimeout(()=>goToStep(2),200); });
  });
  document.getElementById("drink-filter").addEventListener("input",e=>renderDrinkGrid(e.target.value));
  document.getElementById("scoop-minus").onclick=()=>{ state.selectedScoops=Math.max(0,state.selectedScoops-1); document.getElementById("scoop-count").textContent=state.selectedScoops; sfxClick(); };
  document.getElementById("scoop-plus").onclick=()=>{ state.selectedScoops=Math.min(8,state.selectedScoops+1); document.getElementById("scoop-count").textContent=state.selectedScoops; sfxClick(); };
  document.getElementById("confirm-scoops").onclick=()=>{
    const o=state.order;
    document.getElementById("check-summary").innerHTML=`<div class="sum-row"><span>Cup</span><strong>${state.selectedSize||"—"}</strong></div><div class="sum-row"><span>Drink</span><strong>${state.selectedDrink||"—"}</strong></div><div class="sum-row"><span>Scoops</span><strong>${state.selectedScoops}</strong></div><div class="sum-row muted"><span>Ticket</span><strong>${o.orderLine}</strong></div>`;
    goToStep(4); sfxClick();
  };
  document.getElementById("serve-btn").onclick=evaluateOrder;
  document.getElementById("restart-order").onclick=startNewOrder;
  document.getElementById("next-customer").onclick=()=>{ if (state.rush&&state.rushLeft<=0) return; startNewOrder(); };
  document.querySelectorAll(".study-tabs .tab").forEach(tab=>{
    tab.onclick=()=>{ state.deck=tab.dataset.deck; state.cardIndex=0; document.querySelectorAll(".study-tabs .tab").forEach(t=>t.classList.remove("active")); tab.classList.add("active"); showCard(false); };
  });
  document.getElementById("flashcard").onclick=()=>{ const flipped=document.getElementById("card-front").hidden; showCard(!flipped); sfxClick(); };
  document.getElementById("card-again").onclick=()=>showCard(false);
  document.getElementById("card-gotit").onclick=()=>{ state.cardIndex++; showCard(false); sfxClick(); };
  document.getElementById("q-check").onclick=()=>{
    const q=state.quiz[state.qIndex]; const ok=state.selectedOption===q.answer;
    if (ok){ state.qCorrect++; sfxOk(); } else sfxBad();
    document.querySelectorAll(".q-opt").forEach(btn=>{ if (btn.dataset.val===q.answer) btn.classList.add("correct"); else if (btn.dataset.val===state.selectedOption) btn.classList.add("wrong"); btn.disabled=true; });
    setTimeout(()=>{ state.qIndex++; renderQuestion(); },850);
  };
  document.getElementById("q-hint").onclick=()=>alert(state.quiz[state.qIndex].hint||"Check the keys!");
  document.getElementById("quiz-retry").onclick=startQuiz;
  showScreen("home");
});
