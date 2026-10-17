(function () {
  var B = window.BREW;
  var KEY = 'brew-crew-progress-v1';

  function loadProgress() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) return Object.assign(defaultProgress(), JSON.parse(raw));
    } catch (e) {}
    return defaultProgress();
  }
  function defaultProgress() {
    return {
      servedCount: 0, correctOrders: 0, bestStreak: 0, currentStreak: 0,
      xp: 0, masteredIds: [], quizBest: 0
    };
  }
  function saveProgress(p) {
    localStorage.setItem(KEY, JSON.stringify(p));
  }
  var progress = loadProgress();

  function rankInfo() {
    var xp = progress.xp;
    if (xp >= 2000) return { name: 'Legend', next: null, need: 0 };
    if (xp >= 1000) return { name: 'Scoop Scout', next: 'Legend', need: 2000 - xp };
    if (xp >= 500) return { name: 'Cup Rookie', next: 'Scoop Scout', need: 1000 - xp };
    if (xp >= 250) return { name: 'Cup Rookie', next: 'Scoop Scout', need: 500 - xp };
    return { name: 'New Bean', next: 'Cup Rookie', need: 250 - xp };
  }

  function recordOrder(ok) {
    progress.servedCount++;
    if (ok) {
      progress.correctOrders++;
      progress.currentStreak++;
      progress.xp += 25;
      if (progress.currentStreak > progress.bestStreak) progress.bestStreak = progress.currentStreak;
    } else {
      progress.currentStreak = 0;
      progress.xp += 5;
    }
    saveProgress(progress);
  }

  function masterCard(id) {
    if (progress.masteredIds.indexOf(id) === -1) {
      progress.masteredIds.push(id);
      progress.xp += 10;
      saveProgress(progress);
    }
  }
  function unmasterCard(id) {
    progress.masteredIds = progress.masteredIds.filter(function (x) { return x !== id; });
    saveProgress(progress);
  }
  function recordQuiz(score) {
    if (score > progress.quizBest) progress.quizBest = score;
    progress.xp += score * 5;
    saveProgress(progress);
  }

  function route() {
    var hash = (location.hash || '#/').replace(/^#/, '') || '/';
    var path = hash.split('?')[0];
    document.querySelectorAll('#nav a').forEach(function (a) {
      var href = a.getAttribute('href').replace(/^#/, '') || '/';
      a.classList.toggle('active', href === path || (path === '/' && href === '/'));
    });
    var main = document.getElementById('main');
    if (path === '/' || path === '') main.innerHTML = renderHome();
    else if (path === '/counter') main.innerHTML = renderCounter();
    else if (path === '/study') main.innerHTML = renderStudy();
    else if (path === '/cheat-sheet') main.innerHTML = renderCheat();
    else if (path === '/free-play') main.innerHTML = renderFreePlay();
    else if (path === '/quiz') main.innerHTML = renderQuiz();
    else main.innerHTML = renderHome();
    bindPage(path);
  }

  window.addEventListener('hashchange', route);

  function renderHome() {
    var r = rankInfo();
    var pct = r.next ? Math.min(100, (progress.xp / (progress.xp + r.need)) * 100) : 100;
    var acc = progress.servedCount ? Math.round((progress.correctOrders / progress.servedCount) * 100) + '%' : '—';
    return (
      '<section class="hero">' +
        '<div class="badge">YOUR TRAINING SHIFT</div>' +
        '<h1>GOOD COFFEE.<br><span class="red">GREAT HANDS.</span></h1>' +
        '<p>Every order is a chance to get sharper. Practice the builds, learn the sheet, and find your rhythm behind the bar.</p>' +
        '<a href="#/counter" class="btn btn-accent btn-lg" data-link>Pick up where you left off →</a>' +
      '</section>' +
      '<div class="rank-card">' +
          '<p class="label">YOUR BARISTA JOURNEY</p>' +
          '<div style="display:flex;justify-content:space-between;align-items:flex-start">' +
            '<div><h2>' + r.name + '</h2>' +
            '<p class="text-sm muted mt-1" style="color:#6b6558">' + (r.next ? r.need + ' XP to ' + r.next : 'Max rank unlocked') + '</p></div>' +
            '<div style="width:40px;height:40px;border-radius:12px;background:#fbbf24;display:flex;align-items:center;justify-content:center;font-size:20px">🏆</div>' +
          '</div>' +
          '<div class="progress-track"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
          '<div style="display:flex;justify-content:space-between;margin-top:8px;font-size:12px;color:#6b6558">' +
            '<span>' + progress.xp + ' XP earned</span><span>' + Math.round(pct) + '%</span></div>' +
          '<div style="display:flex;justify-content:space-between;margin-top:10px;font-size:10px;font-weight:700;color:#9a9080">' +
            '<span>New Bean</span><span>Cup Rookie</span><span>Scoop Scout</span><span>Legend</span></div>' +
        '</div>' +
        '<div class="tip-card">' +
          '<p class="label">A SMALL WIN TO WORK ON</p>' +
          '<h2 style="font-size:1.35rem;font-weight:900;margin-top:6px">' +
            (progress.servedCount ? 'Review milk mix' : 'Learn one drink, then another.') +
          '</h2>' +
          '<p class="text-sm mt-2" style="color:#715b46;line-height:1.45">' +
            (progress.servedCount
              ? '2 misses so far. A quick recipe-book review can make the next order feel easier.'
              : 'Start with a practice customer. Hints are on, and you can fix your build before serving.') +
          '</p>' +
          '<a href="#' + (progress.servedCount ? '/study' : '/counter') + '" data-link>' +
            (progress.servedCount ? 'Open the recipe book →' : 'Meet your first customer →') +
          '</a>' +
        '</div>' +
      '<h2 style="font-size:1.25rem;font-weight:800;margin:1.5rem 0 0.75rem;color:#fff">Progress, not perfection.</h2>' +
      '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px">' +
        '<div class="stat-card"><div class="value">' + progress.servedCount + '</div><div class="label">Orders served</div></div>' +
        '<div class="stat-card"><div class="value">' + acc + '</div><div class="label">Accuracy</div></div>' +
        '<div class="stat-card"><div class="value">' + progress.bestStreak + '</div><div class="label">Best streak</div></div>' +
        '<div class="stat-card"><div class="value">' + progress.masteredIds.length + '</div><div class="label">Mastered</div></div>' +
      '</div>' +
      '<h2 style="font-size:1.25rem;font-weight:800;margin:1.5rem 0 0.75rem;color:#fff">Choose your next station</h2>' +
      '<div style="display:grid;gap:12px">' +
        stationCard('/counter', 'PRACTICE', 'Take the front counter', 'Build real customer orders one drink at a time.') +
        stationCard('/study', 'RECIPE BOOK', 'Flip through the recipe sheet', 'Lock in signature drinks, scoops, fills and temps.') +
        stationCard('/free-play', 'NO PRESSURE', 'Pick a quick drill', 'Scoops, fills, and temperature at your pace.') +
        stationCard('/quiz', '10 QUESTIONS', 'Check your barista basics', 'A friendly check-in on what you know so far.') +
      '</div>'
    );
  }
  function stationCard(href, tag, title, desc) {
    return '<a href="#' + href + '" class="dark-panel" style="display:block;color:#eee" data-link>' +
      '<p style="font-size:10px;font-weight:800;letter-spacing:.12em;color:var(--primary)">' + tag + '</p>' +
      '<h3 style="font-weight:800;margin-top:4px;color:#fff">' + title + '</h3>' +
      '<p class="text-sm muted mt-1">' + desc + '</p></a>';
  }

  // Minimal stubs for other routes to keep site working
  function renderCounter() {
    return '<h1 class="page-title">Counter</h1><p class="muted">Practice orders coming back fully in next polish. Theme is live.</p><a href="#/" class="btn btn-primary mt-4" data-link>Home</a>';
  }
  function renderStudy() {
    var sig = B.DRINKS.filter(function(d){ return d.group === 'signature'; });
    var html = '<h1 class="page-title">Study</h1><p class="section-title">Signature Drinks</p><div class="drink-grid">';
    sig.forEach(function(d){
      html += '<div class="drink-card">' + (window.DRINK_SVG ? window.DRINK_SVG.get(d.id) : '') + '<h3>' + d.name + '</h3><p>' + (d.recipe ? d.recipe.milk + ' · ' + d.recipe.flavors.join(', ') : '') + '</p></div>';
    });
    html += '</div>';
    return html;
  }
  function renderCheat() { return '<h1 class="page-title">Cheat sheet</h1><p class="muted">Reference tables.</p>'; }
  function renderFreePlay() { return '<h1 class="page-title">Drills</h1><p class="muted">Free play drills.</p>'; }
  function renderQuiz() { return '<h1 class="page-title">Quiz</h1><p class="muted">10 questions.</p>'; }
  function bindPage() {
    document.querySelectorAll('[data-link]').forEach(function(a){
      a.addEventListener('click', function(e){ e.preventDefault(); location.hash = a.getAttribute('href'); });
    });
  }

  route();
})();
