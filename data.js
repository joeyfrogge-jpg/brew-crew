/* Brew Crew — Scoops Test Key + Brewista 101 Key */
const CUSTOMERS = [
  { name: "Avery", emoji: "😎", vibe: "chill", lines: ["Take your time.", "I know what I want."] },
  { name: "Marcus", emoji: "😤", vibe: "impatient", lines: ["Clock's ticking!", "ASAP please."] },
  { name: "Priya", emoji: "✨", vibe: "extra", lines: ["Make it Instagram-worthy!", "Extra foam!"] },
  { name: "Hana", emoji: "🌸", vibe: "sweet", lines: ["You're doing great!", "Thank you!"] },
  { name: "Gus", emoji: "🧔", vibe: "classic", lines: ["Just like last time.", "Keep it simple."] },
  { name: "Jordan", emoji: "🏀", vibe: "energetic", lines: ["Fuel me up!", "Game day!"] },
  { name: "Mei", emoji: "📚", vibe: "focused", lines: ["I have a deadline.", "Fast and accurate."] },
  { name: "Dre", emoji: "🎧", vibe: "cool", lines: ["You got this.", "Nice playlist."] },
  { name: "Cole", emoji: "🤠", vibe: "friendly", lines: ["How's the shift?", "Appreciate you!"] },
  { name: "Rosa", emoji: "💃", vibe: "extra", lines: ["Make it fabulous!", "I tip in compliments."] },
  { name: "Sam", emoji: "🤓", vibe: "curious", lines: ["Teach me while you make it.", "What's the difference?"] },
  { name: "Elena", emoji: "☕", vibe: "regular", lines: ["The usual.", "You know the drill."] },
  { name: "Kwame", emoji: "🔥", vibe: "hype", lines: ["Let's GOOO!", "Best barista!"] },
  { name: "Lily", emoji: "🌱", vibe: "sweet", lines: ["Gentle hands.", "You're my favorite."] },
  { name: "Hiro", emoji: "🎯", vibe: "precise", lines: ["Exact specs.", "Precision is kindness."] },
  { name: "Nora", emoji: "🌙", vibe: "chill", lines: ["Slow morning vibes.", "No rush."] },
  { name: "Mateo", emoji: "🎸", vibe: "cool", lines: ["Rock on.", "Make it sing."] },
  { name: "Marisol", emoji: "☀️", vibe: "hype", lines: ["Sunshine in a cup!", "Brighten my day."] },
  { name: "Kai", emoji: "🌊", vibe: "chill", lines: ["Go with the flow.", "Easy does it."] },
  { name: "Sofia", emoji: "👑", vibe: "extra", lines: ["Treat me like royalty.", "I expect greatness."] },
  { name: "Jamal", emoji: "💪", vibe: "energetic", lines: ["Pre-workout fuel!", "Let's crush it."] },
  { name: "Iris", emoji: "🎨", vibe: "creative", lines: ["Art in a cup.", "Surprise the foam."] },
  { name: "Theo", emoji: "🐢", vibe: "patient", lines: ["I can wait.", "Quality over speed."] },
  { name: "Zoe", emoji: "⚡", vibe: "impatient", lines: ["ASAP energy!", "In and out."] },
  { name: "Leo", emoji: "🦁", vibe: "bold", lines: ["Bold choice.", "Don't hold back."] },
  { name: "Aisha", emoji: "💎", vibe: "extra", lines: ["Make it sparkle.", "Details matter."] },
  { name: "Finn", emoji: "🍀", vibe: "lucky", lines: ["Feeling lucky.", "Nail this one."] },
  { name: "Nadia", emoji: "🧿", vibe: "mystical", lines: ["Good vibes only.", "The universe wants this."] },
  { name: "Owen", emoji: "🛠️", vibe: "practical", lines: ["No frills.", "Solid work."] },
  { name: "Yara", emoji: "🌟", vibe: "hype", lines: ["You're a star!", "This is the one."] }
];
const WIN_LINES = ["Clean pour!", "Barista magic!", "That's the one!", "Flawless!", "Textbook perfect.", "Smooth operator."];
const LOSE_LINES = ["Close, but not quite.", "Check the key again.", "Almost had it!", "Shake it off.", "The scoops don't lie."];
const STREAK_LINES = ["🔥 On fire!", "⚡ Unstoppable!", "🚀 In the zone!", "👑 Dynasty mode!"];
const SIGNATURES = [
  { name: "Blondie", flavors: "Caramel & Vanilla", milk: "Smooth Mix" },
  { name: "Sweet & Salty", flavors: "Salted Caramel & White Chocolate", milk: "Smooth Mix" },
  { name: "Cinnamon Roll", flavors: "Brown Sugar Cinnamon & White Chocolate", milk: "Smooth Mix" },
  { name: "Brunette", flavors: "Caramel & Hazelnut", milk: "Mocha Mix" },
  { name: "Banana Bread", flavors: "Banana & Hazelnut", milk: "Mocha Mix" },
  { name: "Smooth 7", flavors: "Irish Cream & White Chocolate", milk: "Smooth Mix" },
  { name: "Cookie Butter", flavors: "White Chocolate, Toasted Marshmallow & Hazelnut", milk: "Smooth Mix" }
];
const DRINKS = [
  { name: "Latte", group: "Classics", scoops: { Kids:1, Small:1, Medium:1, Large:1 }, hot:true, iced:true },
  { name: "Mocha", group: "Classics", scoops: { Kids:1, Small:1, Medium:1, Large:1 }, hot:true, iced:true },
  { name: "Breve", group: "Classics", scoops: { Kids:1, Small:1, Medium:1, Large:1 }, hot:true, iced:true },
  { name: "Macchiato", group: "Classics", scoops: { Kids:1, Small:1, Medium:1, Large:1 }, hot:true, iced:true },
  { name: "House Blend", group: "Classics", scoops: { Kids:1, Small:1, Medium:1, Large:1 }, hot:true, iced:false },
  { name: "Chai Latte", group: "Classics", scoops: { Kids:1, Small:1, Medium:1, Large:1 }, hot:true, iced:true },
  { name: "Matcha Latte", group: "Classics", scoops: { Kids:1, Small:1, Medium:1, Large:1 }, hot:true, iced:true },
  { name: "Cocoa", group: "Classics", scoops: { Kids:1, Small:1, Medium:1, Large:1 }, hot:true, iced:false },
  { name: "Cold Brew", group: "Classics", scoops: { Kids:1, Small:1, Medium:1, Large:1 }, hot:false, iced:true },
  { name: "Blondie", group: "Original Breves", scoops: { Kids:1, Small:1, Medium:2, Large:2 }, hot:true, iced:true, signature:true },
  { name: "Sweet & Salty", group: "Original Breves", scoops: { Kids:1, Small:1, Medium:2, Large:2 }, hot:true, iced:true, signature:true },
  { name: "Cinnamon Roll", group: "Original Breves", scoops: { Kids:1, Small:1, Medium:2, Large:2 }, hot:true, iced:true, signature:true },
  { name: "Smooth 7", group: "Original Breves", scoops: { Kids:1, Small:1, Medium:2, Large:2 }, hot:true, iced:true, signature:true },
  { name: "Cookie Butter", group: "Original Breves", scoops: { Kids:1, Small:1, Medium:2, Large:2 }, hot:true, iced:true, signature:true },
  { name: "Brunette", group: "Original Mochas", scoops: { Kids:1, Small:1, Medium:1, Large:2 }, hot:true, iced:true, signature:true },
  { name: "Banana Bread", group: "Original Mochas", scoops: { Kids:1, Small:1, Medium:1, Large:2 }, hot:true, iced:true, signature:true },
  { name: "7 Fizz Chiller", group: "Chillers", scoops: { Kids:1, Small:2, Medium:3, Large:4 }, hot:false, iced:true },
  { name: "Tea Chiller", group: "Chillers", scoops: { Kids:1, Small:2, Medium:3, Large:4 }, hot:false, iced:true },
  { name: "7 Energy Chiller", group: "Chillers", scoops: { Kids:1, Small:1, Medium:1, Large:2 }, hot:false, iced:true },
  { name: "Special 7's", group: "Chillers", scoops: { Kids:1, Small:2, Medium:3, Large:4 }, hot:false, iced:true },
  { name: "Coffee Chiller", group: "Chillers", scoops: { Kids:1, Small:1, Medium:1, Large:2 }, hot:false, iced:true },
  { name: "Matcha Chiller", group: "Chillers", scoops: { Kids:1, Small:1, Medium:1, Large:2 }, hot:false, iced:true },
  { name: "Chai Chiller", group: "Chillers", scoops: { Kids:1, Small:1, Medium:1, Large:2 }, hot:false, iced:true },
  { name: "Lemonade Chiller", group: "Chillers", scoops: { Kids:1, Small:1, Medium:1, Large:2 }, hot:false, iced:true },
  { name: "S.F. 7 Energy Chiller", group: "Chillers", scoops: { Kids:1, Small:2, Medium:3, Large:4 }, hot:false, iced:true },
  { name: "7 Fizz", group: "Soda", scoops: { Kids:1, Small:2, Medium:3, Large:4 }, hot:false, iced:true },
  { name: "Iced Lemonade", group: "Lemonade", scoops: { Kids:1, Small:1, Medium:1, Large:2 }, hot:false, iced:true },
  { name: "Iced 7 Energy", group: "Energy", scoops: { Kids:1, Small:1, Medium:1, Large:2 }, hot:false, iced:true },
  { name: "Lemon Freeze", group: "Freeze", scoops: { Kids:1, Small:1, Medium:1, Large:2 }, hot:false, iced:true },
  { name: "Smoothie", group: "Smoothies", scoops: { Kids:1, Small:1, Medium:1, Large:2 }, hot:false, iced:true },
  { name: "Shake", group: "Shakes", scoops: { Kids:1, Small:2, Medium:3, Large:4 }, hot:false, iced:true },
  { name: "Hot Tea", group: "Tea", scoops: { Kids:1, Small:1, Medium:1, Large:1 }, hot:true, iced:false },
  { name: "Iced Tea", group: "Tea", scoops: { Kids:1, Small:1, Medium:2, Large:3 }, hot:false, iced:true },
  { name: "Flavored Water", group: "Water", scoops: { Kids:1, Small:1, Medium:2, Large:3 }, hot:false, iced:true },
  { name: "S.F. / Milk Alt. Mocha", group: "Alt Milk", scoops: { Kids:1, Small:1, Medium:2, Large:2 }, hot:true, iced:true },
  { name: "Cream Scoops", group: "Cream", scoops: { Kids:1, Small:1, Medium:2, Large:2 }, hot:true, iced:true }
];
const FILL_LINES = { iced: { Kids:5, Small:8, Medium:12, Large:16 }, hotEspresso: { Kids:6, Small:8, Medium:10, Large:12 }, hotNonEspresso: { Kids:8, Small:10, Medium:14, Large:18 } };
const LIGHT_ICE_EXTRA = 4;
const NO_ICE = "Fill to the top";
const RANKS = [
  { name: "New Bean", xp: 0, emoji: "🌱" },
  { name: "Cup Rookie", xp: 250, emoji: "☕" },
  { name: "Scoop Scout", xp: 600, emoji: "🥄" },
  { name: "Bar Legend", xp: 1200, emoji: "👑" }
];
const ACHIEVEMENTS = [
  { id: "first_serve", name: "First Pour", desc: "Serve your first correct drink", icon: "🎉", check: s => s.correct >= 1 },
  { id: "streak_3", name: "Heating Up", desc: "3 correct in a row", icon: "🔥", check: s => s.bestStreak >= 3 },
  { id: "streak_5", name: "On Fire", desc: "5 correct in a row", icon: "⚡", check: s => s.bestStreak >= 5 },
  { id: "streak_10", name: "Untouchable", desc: "10 correct in a row", icon: "👑", check: s => s.bestStreak >= 10 },
  { id: "served_10", name: "Busy Shift", desc: "Serve 10 orders", icon: "📋", check: s => s.served >= 10 },
  { id: "perfect_quiz", name: "Key Master", desc: "Score 10/10 on a quiz", icon: "🔑", check: s => s.perfectQuiz },
  { id: "rush_win", name: "Rush Survivor", desc: "Finish Rush with 70%+", icon: "⏱️", check: s => s.rushWin },
  { id: "legend", name: "Bar Legend", desc: "Reach Bar Legend rank", icon: "🏆", check: s => s.xp >= 1200 }
];
function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function generateRandomOrder() {
  const customer = rand(CUSTOMERS);
  const drink = rand(DRINKS);
  const size = rand(["Kids", "Small", "Medium", "Large"]);
  let tempType;
  if (drink.hot && drink.iced) tempType = Math.random() < 0.55 ? "Iced" : "Hot";
  else if (drink.hot) tempType = "Hot";
  else tempType = "Iced";
  let tempPref = null;
  if (tempType === "Hot") tempPref = rand(["Regular", "Extra Hot", "Drinkable"]);
  let icePref = null;
  if (tempType === "Iced") icePref = rand(["Regular Ice", "Light Ice", "No Ice"]);
  const correctScoops = drink.scoops[size] ?? 1;
  let fillLine;
  if (tempType === "Iced") {
    fillLine = FILL_LINES.iced[size];
    if (icePref === "Light Ice") fillLine += LIGHT_ICE_EXTRA;
    if (icePref === "No Ice") fillLine = NO_ICE;
  } else {
    const isEspresso = ["Latte","Mocha","Breve","Macchiato","Blondie","Sweet & Salty","Cinnamon Roll","Brunette","Banana Bread","Smooth 7","Cookie Butter","S.F. / Milk Alt. Mocha"].includes(drink.name);
    fillLine = isEspresso ? FILL_LINES.hotEspresso[size] : FILL_LINES.hotNonEspresso[size];
  }
  return {
    id: Date.now() + Math.random(),
    customer: customer.name, emoji: customer.emoji, vibe: customer.vibe, speech: rand(customer.lines),
    drink: drink.name, group: drink.group, size, tempType, tempPref, icePref, correctScoops, fillLine,
    signatureInfo: drink.signature ? SIGNATURES.find(s => s.name === drink.name) : null,
    orderLine: size + " " + drink.name,
    orderDetail: [tempType, tempPref, icePref].filter(Boolean).join(" · ")
  };
}
function buildQuizBank() {
  const qs = [];
  DRINKS.forEach(d => {
    ["Small","Medium","Large"].forEach(sz => {
      const ans = String(d.scoops[sz]);
      qs.push({ cat: "Scoops", text: "How many scoops for a " + sz + " " + d.name + "?", options: shuffle([ans, String(+ans+1), String(Math.max(1,+ans-1)), "4"].filter((v,i,a)=>a.indexOf(v)===i).slice(0,4)), answer: ans, hint: "Scoops Test Key -> " + d.group });
    });
  });
  qs.push(
    { cat: "Fill lines", text: "How many oz is the Large iced fill line?", options: ["12","14","16","18"], answer: "16", hint: "Iced: Kids 5 · S 8 · M 12 · L 16" },
    { cat: "Fill lines", text: "Medium hot espresso fill line?", options: ["8","10","12","14"], answer: "10", hint: "Hot espresso: Kids 6 · S 8 · M 10 · L 12" },
    { cat: "Fill lines", text: "Light ice adds how many oz?", options: ["2","3","4","5"], answer: "4", hint: "Light Ice = +4 oz" },
    { cat: "Temperatures", text: "Regular temperature range?", options: ["140-150","160-170","175-180","110-120"], answer: "160-170", hint: "Regular = 160-170 F" },
    { cat: "Temperatures", text: "Perfect shot time (seconds)?", options: ["18","20","22","25"], answer: "22", hint: "Window 17-27 · Perfect = 22" }
  );
  SIGNATURES.forEach(s => {
    qs.push({ cat: "Signature", text: "Flavors in a " + s.name + "?", options: shuffle([s.flavors, rand(SIGNATURES).flavors, "Caramel & Vanilla", "Irish Cream & White Chocolate"].filter((v,i,a)=>a.indexOf(v)===i).slice(0,4)), answer: s.flavors, hint: s.name + " uses " + s.milk });
    qs.push({ cat: "Signature", text: "Milk mix for " + s.name + "?", options: ["Smooth Mix", "Mocha Mix"], answer: s.milk, hint: "Breves -> Smooth Mix · Mochas -> Mocha Mix" });
  });
  return qs;
}
