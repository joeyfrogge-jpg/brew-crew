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
    if (xp >= 1000) return { name: 'Brew Boss', next: 'Legend', need: 2000 - xp };
    if (xp >= 500) return { name: 'Scoop Scout', next: 'Brew Boss', need: 1000 - xp };
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
    document.querySelectorAll('.nav a').forEach(function (a) {
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
        '<div class="badge">Your training shift</div>' +
        '<h1>GOOD COFFEE.<br><span class="gold">GREAT HANDS.</span></h1>' +
        '<p>Every order is a chance to get sharper. Practice the builds, learn the sheet, and find your rhythm behind the bar.</p>' +
        '<a href="#/counter" class="btn btn-accent btn-lg" data-link>Start your first practice order →</a>' +
      '</section>' +
      '<div class="grid-2 mb-4">' +
        '<div class="card">' +
          '<p class="text-sm muted" style="font-weight:800;letter-spacing:.12em;text-transform:uppercase;font-size:10px">Your barista journey</p>' +
          '<h2 style="font-size:1.75rem;font-weight:800;margin-top:4px">' + r.name + '</h2>' +
          '<p class="text-sm muted mt-1">' + (r.next ? r.need + ' XP to ' + r.next : 'Max rank unlocked') + '</p>' +
          '<div class="progress-track mt-3"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
          '<p class="text-sm muted mt-2">' + progress.xp + ' XP earned</p>' +
        '</div>' +
        '<div class="card" style="background:#f2e6ce;border-color:#d8c39f">' +
          '<p style="font-size:10px;font-weight:800;letter-spacing:.15em;text-transform:uppercase;color:#795637">A small win to work on</p>' +
          '<h2 style="font-size:1.5rem;font-weight:800;margin-top:8px;color:#39291f">' +
            (progress.servedCount ? 'Keep building your rhythm' : 'Learn one drink, then another.') +
          '</h2>' +
          '<p class="text-sm mt-2" style="color:#715b46;line-height:1.5">' +
            (progress.servedCount
              ? 'No rush to master it all. Repetition is how confident hands are made.'
              : 'Start with a practice customer. Hints are on, and you can fix your build before serving.') +
          '</p>' +
          '<a href="#' + (progress.servedCount ? '/study' : '/counter') + '" style="display:inline-block;margin-top:12px;font-weight:800;color:var(--primary)" data-link>' +
            (progress.servedCount ? 'Open the recipe book →' : 'Meet your first customer →') +
          '</a>' +
        '</div>' +
      '</div>' +
      '<h2 style="font-size:1.5rem;font-weight:800;margin-bottom:4px">Progress, not perfection.</h2>' +
      '<p class="text-sm muted mb-4">Saved on this device</p>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px">' +
        '<div class="stat-card"><div class="value">' + progress.servedCount + '</div><div class="label">Orders served</div><p class="text-sm muted mt-1">' + progress.correctOrders + ' right on the mark</p></div>' +
        '<div class="stat-card"><div class="value">' + acc + '</div><div class="label">Build accuracy</div></div>' +
        '<div class="stat-card"><div class="value">' + progress.bestStreak + '</div><div class="label">Best streak</div><p class="text-sm muted mt-1">Current: ' + progress.currentStreak + '</p></div>' +
        '<div class="stat-card"><div class="value">' + progress.masteredIds.length + '</div><div class="label">Cards mastered</div><p class="text-sm muted mt-1">Quiz best: ' + progress.quizBest + '/10</p></div>' +
      '</div>' +
      '<h2 style="font-size:1.5rem;font-weight:800;margin:2rem 0 1rem">Choose your next station</h2>' +
      '<div class="grid-2">' +
        stationCard('/counter', 'PRACTICE', 'Take the front counter', 'Build real customer orders one drink at a time.') +
        stationCard('/study', 'RECIPE BOOK', 'Flip through the recipe sheet', 'Lock in signature drinks, scoops, fills and temps.') +
        stationCard('/free-play', 'NO PRESSURE', 'Pick a quick drill', 'Scoops, fills, and temperature at your pace.') +
        stationCard('/quiz', '10 QUESTIONS', 'Check your barista basics', 'A friendly check-in on what you know so far.') +
      '</div>'
    );
  }
  function stationCard(href, tag, title, desc) {
    return '<a href="#' + href + '" class="card" style="display:block" data-link>' +
      '<p style="font-size:10px;font-weight:800;letter-spacing:.12em;color:var(--primary)">' + tag + '</p>' +
      '<h3 style="font-weight:800;margin-top:4px">' + title + '</h3>' +
      '<p class="text-sm muted mt-1">' + desc + '</p></a>';
  }

  var studyState = { filter: 'all', index: 0, flipped: false };

  function buildCards() {
    var cards = [];
    B.DRINKS.filter(function (d) { return d.group === 'signature'; }).forEach(function (d) {
      var r = d.recipe;
      cards.push({
        kind: 'drink', id: 'drink-' + d.id, title: d.name,
        subtitle: 'Flavors + milk mix', liquid: d.liquid,
        back: r.flavors.join(' + ') + '\nMilk: ' + r.milk +
          '\nScoops: S ' + B.getScoop(d.scoopCategory, 'small') +
          ' · M ' + B.getScoop(d.scoopCategory, 'medium') +
          ' · L ' + B.getScoop(d.scoopCategory, 'large')
      });
    });
    B.SCOOP_CATEGORIES.forEach(function (c) {
      cards.push({
        kind: 'scoop', id: 'scoop-' + c.id, title: c.name,
        subtitle: c.includes || c.note || 'Scoop counts',
        back: 'Kids: 1\nSmall: ' + c.scoops.small + '\nMedium: ' + c.scoops.medium + '\nLarge: ' + c.scoops.large
      });
    });
    cards.push(
      { kind: 'fill', id: 'fill-iced', title: 'Iced Drinks', subtitle: 'Fill lines (oz)', back: 'Kids 5 · Small 8 · Medium 12 · Large 16' },
      { kind: 'fill', id: 'fill-hot-e', title: 'Hot Espresso', subtitle: 'Fill lines (oz)', back: 'Kids 6 · Small 8 · Medium 10 · Large 12' },
      { kind: 'fill', id: 'fill-hot-n', title: 'Hot Non-Espresso', subtitle: 'Cocoas, Matchas, Chais…', back: 'Kids 8 · Small 10 · Medium 14 · Large 18' },
      { kind: 'temp', id: 'temp-kids', title: 'Kids temperature', subtitle: 'Steam range', back: '110–120°F' },
      { kind: 'temp', id: 'temp-drink', title: 'Drinkable', subtitle: 'Steam range', back: '140–150°F' },
      { kind: 'temp', id: 'temp-reg', title: 'Regular', subtitle: 'Steam range', back: '160–170°F' },
      { kind: 'temp', id: 'temp-extra', title: 'Extra Hot', subtitle: 'Steam range', back: '175–180°F' }
    );
    return cards;
  }
  var ALL_CARDS = buildCards();

  function filteredCards() {
    var f = studyState.filter;
    if (f === 'all') return ALL_CARDS;
    if (f === 'signature') return ALL_CARDS.filter(function (c) { return c.kind === 'drink'; });
    if (f === 'scoops') return ALL_CARDS.filter(function (c) { return c.kind === 'scoop'; });
    if (f === 'fills') return ALL_CARDS.filter(function (c) { return c.kind === 'fill'; });
    return ALL_CARDS.filter(function (c) { return c.kind === 'temp'; });
  }

  function renderStudy() {
    var list = filteredCards();
    if (!list.length) return '<p>No cards.</p>';
    var card = list[studyState.index % list.length];
    var masteredN = progress.masteredIds.filter(function (id) {
      return list.some(function (c) { return c.id === id; });
    }).length;
    var kindLabel = { drink: 'SIGNATURE DRINKS', scoop: 'SCOOPS', fill: 'FILL LINES', temp: 'TEMPERATURE' }[card.kind];
    function chip(id, label) {
      return '<button type="button" class="chip' + (studyState.filter === id ? ' active' : '') + '" data-filter="' + id + '">' + label + '</button>';
    }
    return (
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">' +
        '<h1 style="font-size:1.75rem;font-weight:800">STUDY</h1>' +
        '<a href="#/cheat-sheet" class="btn btn-ghost" style="padding:.4rem .9rem;font-size:13px" data-link>Cheat sheet</a>' +
      '</div>' +
      '<div class="chips" id="study-chips">' +
        chip('all', 'All') + chip('signature', 'Signature Drinks') + chip('scoops', 'Scoops') +
        chip('fills', 'Fill Lines') + chip('temps', 'Temperature') +
      '</div>' +
      '<p class="text-sm muted mb-2" style="text-align:right">' + masteredN + '/' + list.length + ' mastered</p>' +
      '<div class="flashcard' + (studyState.flipped ? ' flipped' : '') + '" id="flashcard">' +
        '<div class="flashcard-inner">' +
          '<div class="flashcard-face front">' +
            '<p style="font-size:10px;font-weight:800;letter-spacing:.15em;color:var(--primary);margin-bottom:12px">' + kindLabel + '</p>' +
            (card.kind === 'drink' ? '<div class="drink-icon" style="background:' + card.liquid + '"></div>' : '') +
            '<h2 style="font-size:1.75rem;font-weight:800">' + card.title + '</h2>' +
            '<p class="text-sm muted mt-2">' + card.subtitle + '</p>' +
            '<p class="text-sm muted mt-4" style="font-size:11px;letter-spacing:.1em">TAP TO FLIP</p>' +
          '</div>' +
          '<div class="flashcard-face back">' +
            '<p style="font-size:10px;font-weight:800;letter-spacing:.15em;color:var(--primary);margin-bottom:12px">ANSWER</p>' +
            '<h2 style="font-size:1.5rem;font-weight:800;margin-bottom:12px">' + card.title + '</h2>' +
            '<pre style="font-family:inherit;white-space:pre-wrap;font-size:1rem;line-height:1.6;font-weight:600">' + card.back + '</pre>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div style="display:flex;gap:12px;margin-top:20px;flex-wrap:wrap">' +
        '<button type="button" class="btn btn-ghost" style="flex:1;min-width:140px" id="btn-review">↻ Review again</button>' +
        '<button type="button" class="btn btn-success" style="flex:1;min-width:140px" id="btn-gotit">👍 Got it</button>' +
      '</div>'
    );
  }

  var counterState = null;
  function newOrder() {
    var drink = B.DRINKS[Math.floor(Math.random() * B.DRINKS.length)];
    var size = B.SIZES[Math.floor(Math.random() * B.SIZES.length)];
    var lines = ['Yo yo yo! Hook me up with a', 'Can I get a', 'I need a', 'One', 'Hit me with a'];
    return {
      drink: drink, size: size,
      line: lines[Math.floor(Math.random() * lines.length)],
      step: 'cup', pickedSize: null, pickedDrink: null, pickedScoops: null,
      showHint: false, ticket: (counterState ? counterState.ticket : 0) + 1
    };
  }
  function renderCounter() {
    if (!counterState) counterState = newOrder();
    var o = counterState;
    var html =
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
        '<h1 style="font-size:1.25rem;font-weight:800">Counter Practice</h1>' +
        '<span class="text-sm muted">🏆 ' + progress.currentStreak + ' streak</span>' +
      '</div>' +
      '<div style="background:linear-gradient(180deg,#87ceeb 0%,#b8e0f0 40%,#f5d0a9 40%,#e8c49a 100%);border-radius:20px;padding:1rem;margin-bottom:16px;min-height:120px;position:relative">' +
        '<div style="display:flex;gap:16px;flex-wrap:wrap">' +
          '<div class="ticket" style="min-width:160px">' +
            '<div class="label">Ticket #' + String(o.ticket).padStart(3, '0') + '</div>' +
            '<p style="font-weight:800;margin-top:4px">' + B.SIZE_LABELS[o.size] + ' ' + o.drink.name + '</p>' +
            '<p class="text-sm muted">DANTE</p>' +
          '</div>' +
          '<div style="background:#fff;border-radius:16px;padding:.75rem 1rem;max-width:320px;box-shadow:0 4px 12px rgba(0,0,0,.1)">' +
            '<p style="font-weight:600">' + o.line + ' ' + B.SIZE_LABELS[o.size].toLowerCase() + ' ' + o.drink.name + '!</p>' +
          '</div>' +
        '</div>' +
        '<div style="position:absolute;right:24px;bottom:8px;font-size:48px">🧑‍🎤</div>' +
      '</div>' +
      '<div class="steps">' +
        '<span class="step-pill' + (o.step === 'cup' ? ' active' : o.step !== 'cup' ? ' done' : '') + '">1 CUP</span>' +
        '<span class="step-pill' + (o.step === 'drink' ? ' active' : (o.step === 'scoops' || o.step === 'result') ? ' done' : '') + '">2 DRINK</span>' +
        '<span class="step-pill' + (o.step === 'scoops' ? ' active' : o.step === 'result' ? ' done' : '') + '">3 SCOOPS</span>' +
      '</div>';

    if (o.step === 'cup') {
      html += '<div class="card"><h2 style="font-weight:800;text-align:center;margin-bottom:12px">GRAB THE RIGHT CUP</h2><div class="cup-grid">';
      B.SIZES.forEach(function (s) {
        html += '<button type="button" class="cup-option' + (o.pickedSize === s ? ' selected' : '') + '" data-size="' + s + '">' +
          '<div class="cup-visual ' + s + '"></div><span style="font-weight:700;font-size:13px">' + B.SIZE_LABELS[s] + '</span></button>';
      });
      html += '</div></div>';
    }
    if (o.step === 'drink') {
      var choices = [o.drink].concat(
        B.DRINKS.filter(function (d) { return d.id !== o.drink.id; }).sort(function () { return Math.random() - 0.5; }).slice(0, 5)
      ).sort(function () { return Math.random() - 0.5; });
      html += '<div class="card"><h2 style="font-weight:800;text-align:center;margin-bottom:12px">PICK THE DRINK</h2>' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px">';
      choices.forEach(function (d) {
        html += '<button type="button" class="quiz-option' + (o.pickedDrink === d.id ? ' correct' : '') + '" style="margin:0;text-align:center" data-drink="' + d.id + '">' + d.name + '</button>';
      });
      html += '</div></div>';
    }
    if (o.step === 'scoops') {
      html += '<div class="card"><h2 style="font-weight:800;text-align:center;margin-bottom:12px">HOW MANY SCOOPS?</h2>' +
        '<p class="text-sm muted" style="text-align:center;margin-bottom:12px">' + B.SIZE_LABELS[o.size] + ' ' + o.drink.name + '</p>' +
        '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">';
      [1, 2, 3, 4].forEach(function (n) {
        html += '<button type="button" class="btn ' + (o.pickedScoops === n ? 'btn-primary' : 'btn-ghost') + '" style="width:64px;height:64px;font-size:24px;border-radius:16px" data-scoops="' + n + '">' + n + '</button>';
      });
      html += '</div></div>';
    }
    if (o.step === 'result') {
      var sizeOk = o.pickedSize === o.size;
      var drinkOk = o.pickedDrink === o.drink.id;
      var scoopsOk = o.pickedScoops === B.getScoop(o.drink.scoopCategory, o.size);
      var allOk = sizeOk && drinkOk && scoopsOk;
      html += '<div class="card" style="text-align:center">' +
        '<h2 style="font-size:1.75rem;font-weight:800;color:' + (allOk ? 'var(--success)' : 'var(--primary)') + '">' +
          (allOk ? 'Nailed it! 🎉' : 'Almost — check the sheet') + '</h2>' +
        '<ul style="list-style:none;margin:16px auto;text-align:left;max-width:280px">' +
          '<li style="margin-bottom:6px">' + (sizeOk ? '✅' : '❌') + ' Cup: ' + B.SIZE_LABELS[o.size] + '</li>' +
          '<li style="margin-bottom:6px">' + (drinkOk ? '✅' : '❌') + ' Drink: ' + o.drink.name + '</li>' +
          '<li>' + (scoopsOk ? '✅' : '❌') + ' Scoops: ' + B.getScoop(o.drink.scoopCategory, o.size) + '</li>' +
        '</ul>' +
        '<button type="button" class="btn btn-primary btn-lg" id="btn-next-order">Next order →</button></div>';
    }
    if (o.step !== 'result') {
      html += '<div style="display:flex;gap:12px;margin-top:16px;align-items:center">' +
        '<button type="button" class="btn btn-ghost" id="btn-hint">💡 Hint</button>' +
        '<button type="button" class="btn btn-primary" style="flex:1" id="btn-advance"' +
          ((o.step === 'cup' && !o.pickedSize) || (o.step === 'drink' && !o.pickedDrink) || (o.step === 'scoops' && o.pickedScoops == null) ? ' disabled' : '') +
        '>' + (o.step === 'scoops' ? 'SERVE' : 'NEXT →') + '</button></div>';
      if (o.showHint) {
        var hint = '';
        if (o.step === 'cup') hint = 'Customer asked for ' + B.SIZE_LABELS[o.size] + '.';
        if (o.step === 'drink') hint = "They're ordering a " + o.drink.name + '.';
        if (o.step === 'scoops') hint = o.drink.name + ' → ' + B.getScoop(o.drink.scoopCategory, o.size) + ' scoops for ' + B.SIZE_LABELS[o.size] + '.';
        html += '<div class="card mt-3" style="background:#fdf6e8;border-color:#e8d4a8"><p class="text-sm"><strong>Hint:</strong> ' + hint + '</p></div>';
      }
    }
    return html;
  }

  var quizState = null;
  function buildQuizQs() {
    var qs = [];
    B.DRINKS.filter(function (d) { return d.recipe; }).forEach(function (d) {
      var flavors = d.recipe.flavors.join(' + ');
      var wrong = B.DRINKS.filter(function (x) { return x.recipe && x.id !== d.id; })
        .map(function (x) { return x.recipe.flavors.join(' + '); }).slice(0, 3);
      var options = [flavors].concat(wrong).sort(function () { return Math.random() - 0.5; });
      qs.push({ prompt: 'What flavors are in a ' + d.name + '?', options: options, answer: options.indexOf(flavors) });
    });
    B.SCOOP_CATEGORIES.slice(0, 8).forEach(function (c) {
      var size = ['small', 'medium', 'large'][Math.floor(Math.random() * 3)];
      var correct = String(c.scoops[size]);
      var options = ['1', '2', '3', '4'].sort(function () { return Math.random() - 0.5; });
      qs.push({ prompt: 'How many scoops for a ' + B.SIZE_LABELS[size] + ' ' + c.name + '?', options: options, answer: options.indexOf(correct) });
    });
    ['kids', 'regular', 'extraHot'].forEach(function (k) {
      var correct = B.formatTemp(k);
      var options = [B.formatTemp('kids'), B.formatTemp('drinkable'), B.formatTemp('regular'), B.formatTemp('extraHot')]
        .sort(function () { return Math.random() - 0.5; });
      qs.push({ prompt: 'What is the ' + B.TEMPERATURES[k].name + ' steam range?', options: options, answer: options.indexOf(correct) });
    });
    return qs.sort(function () { return Math.random() - 0.5; }).slice(0, 10);
  }
  function renderQuiz() {
    if (!quizState) quizState = { questions: buildQuizQs(), idx: 0, selected: null, score: 0, done: false, locked: false };
    var qs = quizState.questions;
    if (quizState.done) {
      return '<div class="card" style="text-align:center;max-width:420px;margin:2rem auto">' +
        '<h1 style="font-size:2rem;font-weight:800">Quiz complete</h1>' +
        '<p style="font-size:3rem;font-weight:800;margin:1rem 0;color:var(--primary)">' + quizState.score + '/' + qs.length + '</p>' +
        '<p class="muted mb-4">' + (quizState.score >= 8 ? 'Brew Boss energy.' : quizState.score >= 5 ? 'Solid shift — keep drilling.' : 'Hit the recipe book and try again.') + '</p>' +
        '<button type="button" class="btn btn-primary" id="btn-quiz-again">Take again</button></div>';
    }
    var q = qs[quizState.idx];
    var html =
      '<div style="max-width:520px;margin:0 auto">' +
        '<div style="display:flex;justify-content:space-between;margin-bottom:16px">' +
          '<h1 style="font-size:1.5rem;font-weight:800">Quiz</h1>' +
          '<span class="text-sm muted">' + (quizState.idx + 1) + ' / ' + qs.length + ' · Score ' + quizState.score + '</span>' +
        '</div>' +
        '<div class="progress-track mb-4"><div class="progress-fill" style="width:' + (((quizState.idx + (quizState.locked ? 1 : 0)) / qs.length) * 100) + '%"></div></div>' +
        '<div class="card"><h2 style="font-weight:800;margin-bottom:16px;line-height:1.3">' + q.prompt + '</h2>';
    q.options.forEach(function (opt, i) {
      var cls = '';
      if (quizState.locked) {
        if (i === q.answer) cls = ' correct';
        else if (quizState.selected === i) cls = ' wrong';
      }
      html += '<button type="button" class="quiz-option' + cls + '" data-qi="' + i + '"' + (quizState.locked ? ' disabled' : '') + '>' + opt + '</button>';
    });
    if (quizState.locked) {
      html += '<button type="button" class="btn btn-primary" style="width:100%;margin-top:12px" id="btn-quiz-next">' +
        (quizState.idx + 1 >= qs.length ? 'See results' : 'Next question →') + '</button>';
    }
    html += '</div></div>';
    return html;
  }

  var freeState = { drill: 'scoops', catIdx: 0, size: 'medium', guess: null, revealed: false };
  function renderFreePlay() {
    var fs = freeState;
    var cat = B.SCOOP_CATEGORIES[fs.catIdx % B.SCOOP_CATEGORIES.length];
    var html =
      '<div style="max-width:560px;margin:0 auto">' +
        '<h1 style="font-size:1.75rem;font-weight:800;margin-bottom:8px">Free play</h1>' +
        '<p class="text-sm muted mb-4">No pressure drills — scoops, fill lines, and temperatures.</p>' +
        '<div class="chips">' +
          '<button type="button" class="chip' + (fs.drill === 'scoops' ? ' active' : '') + '" data-drill="scoops">Scoops</button>' +
          '<button type="button" class="chip' + (fs.drill === 'fills' ? ' active' : '') + '" data-drill="fills">Fill lines</button>' +
          '<button type="button" class="chip' + (fs.drill === 'temps' ? ' active' : '') + '" data-drill="temps">Temperature</button>' +
        '</div>';

    if (fs.drill === 'scoops') {
      var correct = B.getScoop(cat.id, fs.size);
      html += '<div class="card"><p style="font-size:10px;font-weight:800;letter-spacing:.12em;color:var(--primary)">SCOOP DRILL</p>' +
        '<h2 style="font-weight:800;margin-top:8px">' + cat.name + '</h2>' +
        (cat.includes ? '<p class="text-sm muted mt-1">' + cat.includes + '</p>' : '') +
        '<div style="display:flex;gap:8px;margin:16px 0;flex-wrap:wrap" id="size-chips">';
      B.SIZES.forEach(function (s) {
        html += '<button type="button" class="chip' + (fs.size === s ? ' active' : '') + '" data-fsize="' + s + '">' + B.SIZE_LABELS[s] + '</button>';
      });
      html += '</div><p class="mb-2" style="font-weight:600">How many scoops?</p><div style="display:flex;gap:8px">';
      [1, 2, 3, 4].forEach(function (n) {
        html += '<button type="button" class="btn ' + (fs.guess === n ? 'btn-primary' : 'btn-ghost') + '" style="width:56px;height:56px;border-radius:12px;font-size:20px" data-fguess="' + n + '">' + n + '</button>';
      });
      html += '</div><div style="display:flex;gap:8px;margin-top:16px">' +
        '<button type="button" class="btn btn-primary" id="btn-fcheck"' + (fs.guess == null ? ' disabled' : '') + '>Check</button>' +
        '<button type="button" class="btn btn-ghost" id="btn-fnext">Next category</button></div>';
      if (fs.revealed) {
        html += '<p class="mt-3" style="font-weight:700;color:' + (fs.guess === correct ? 'var(--success)' : 'var(--primary)') + '">' +
          (fs.guess === correct ? '✅ Correct!' : '❌ It\'s ' + correct + ' scoops') + '</p>';
      }
      html += '</div>';
    } else if (fs.drill === 'fills') {
      var fillKeys = Object.keys(B.FILL_LINES);
      var fk = fillKeys[fs.catIdx % fillKeys.length];
      var fill = B.FILL_LINES[fk];
      var correctOz = fill.oz[fs.size];
      html += '<div class="card"><p style="font-size:10px;font-weight:800;letter-spacing:.12em;color:var(--primary)">FILL LINE DRILL</p>' +
        '<h2 style="font-weight:800;margin-top:8px">' + fill.name + '</h2>' +
        '<div style="display:flex;gap:8px;margin:16px 0;flex-wrap:wrap">';
      B.SIZES.forEach(function (s) {
        html += '<button type="button" class="chip' + (fs.size === s ? ' active' : '') + '" data-fsize="' + s + '">' + B.SIZE_LABELS[s] + '</button>';
      });
      html += '</div><p class="mb-2" style="font-weight:600">Fill to how many oz?</p><div style="display:flex;gap:8px;flex-wrap:wrap">';
      [5, 6, 8, 10, 12, 14, 16, 18].forEach(function (n) {
        html += '<button type="button" class="btn ' + (fs.guess === n ? 'btn-primary' : 'btn-ghost') + '" style="min-width:48px;border-radius:12px" data-fguess="' + n + '">' + n + '</button>';
      });
      html += '</div><div style="display:flex;gap:8px;margin-top:16px">' +
        '<button type="button" class="btn btn-primary" id="btn-fcheck"' + (fs.guess == null ? ' disabled' : '') + '>Check</button>' +
        '<button type="button" class="btn btn-ghost" id="btn-fnext">Next</button></div>';
      if (fs.revealed) {
        html += '<p class="mt-3" style="font-weight:700;color:' + (fs.guess === correctOz ? 'var(--success)' : 'var(--primary)') + '">' +
          (fs.guess === correctOz ? '✅ Correct!' : '❌ Fill to ' + correctOz + ' oz') + '</p>';
      }
      html += '</div>';
    } else {
      var tKeys = Object.keys(B.TEMPERATURES);
      var tk = tKeys[fs.catIdx % tKeys.length];
      html += '<div class="card"><p style="font-size:10px;font-weight:800;letter-spacing:.12em;color:var(--primary)">TEMPERATURE DRILL</p>' +
        '<h2 style="font-weight:800;margin-top:8px">' + B.TEMPERATURES[tk].name + '</h2>' +
        '<p class="text-sm muted mt-1">What is the steam range?</p><div style="margin-top:16px">';
      tKeys.forEach(function (k, i) {
        var cls = '';
        if (fs.revealed) {
          if (k === tk) cls = ' correct';
          else if (fs.guess === i) cls = ' wrong';
        }
        html += '<button type="button" class="quiz-option' + cls + '" data-temp="' + i + '"' + (fs.revealed ? ' disabled' : '') + '>' + B.formatTemp(k) + '</button>';
      });
      html += '</div><button type="button" class="btn btn-ghost mt-3" id="btn-fnext">Next range</button></div>';
    }
    html += '</div>';
    return html;
  }

  function renderCheat() {
    var html =
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
        '<h1 style="font-size:1.75rem;font-weight:800">Cheat sheet</h1>' +
        '<a href="#/study" class="btn btn-ghost" style="font-size:13px" data-link>← Flashcards</a></div>' +
      '<section class="card mb-4"><h2 style="font-weight:800;margin-bottom:12px">Signature drinks</h2><table><thead><tr><th>Drink</th><th>Flavors</th><th>Milk</th></tr></thead><tbody>';
    B.DRINKS.filter(function (d) { return d.recipe; }).forEach(function (d) {
      html += '<tr><td style="font-weight:700">' + d.name + '</td><td>' + d.recipe.flavors.join(', ') + '</td><td>' + d.recipe.milk + '</td></tr>';
    });
    html += '</tbody></table></section>' +
      '<section class="card mb-4"><h2 style="font-weight:800;margin-bottom:12px">Scoop counts</h2><table><thead><tr><th>Category</th><th>S</th><th>M</th><th>L</th></tr></thead><tbody>';
    B.SCOOP_CATEGORIES.forEach(function (c) {
      html += '<tr><td style="font-weight:600">' + c.name + '</td><td>' + c.scoops.small + '</td><td>' + c.scoops.medium + '</td><td>' + c.scoops.large + '</td></tr>';
    });
    html += '</tbody></table><p class="text-sm muted mt-2">Kids cup: always 1 scoop</p></section>' +
      '<section class="card mb-4"><h2 style="font-weight:800;margin-bottom:12px">Fill lines (oz)</h2>';
    Object.keys(B.FILL_LINES).forEach(function (k) {
      var v = B.FILL_LINES[k];
      html += '<div style="margin-bottom:12px"><p style="font-weight:700">' + v.name + '</p><p class="text-sm">Kids ' + v.oz.kids + ' · Small ' + v.oz.small + ' · Medium ' + v.oz.medium + ' · Large ' + v.oz.large + '</p></div>';
    });
    html += '</section><section class="card"><h2 style="font-weight:800;margin-bottom:12px">Steam temperatures</h2>';
    Object.keys(B.TEMPERATURES).forEach(function (k) {
      html += '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border)"><span style="font-weight:600">' + B.TEMPERATURES[k].name + '</span><span>' + B.formatTemp(k) + '</span></div>';
    });
    html += '</section>';
    return html;
  }

  function bindPage(path) {
    if (path === '/study') {
      document.getElementById('flashcard') && document.getElementById('flashcard').addEventListener('click', function () {
        studyState.flipped = !studyState.flipped;
        route();
      });
      document.querySelectorAll('[data-filter]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          studyState.filter = btn.getAttribute('data-filter');
          studyState.index = 0;
          studyState.flipped = false;
          route();
        });
      });
      var list = filteredCards();
      var card = list[studyState.index % list.length];
      document.getElementById('btn-gotit') && document.getElementById('btn-gotit').addEventListener('click', function () {
        masterCard(card.id);
        studyState.flipped = false;
        studyState.index = (studyState.index + 1) % list.length;
        route();
      });
      document.getElementById('btn-review') && document.getElementById('btn-review').addEventListener('click', function () {
        unmasterCard(card.id);
        studyState.flipped = false;
        studyState.index = (studyState.index + 1) % list.length;
        route();
      });
    }
    if (path === '/counter') {
      document.querySelectorAll('[data-size]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          counterState.pickedSize = btn.getAttribute('data-size');
          route();
        });
      });
      document.querySelectorAll('[data-drink]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          counterState.pickedDrink = btn.getAttribute('data-drink');
          route();
        });
      });
      document.querySelectorAll('[data-scoops]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          counterState.pickedScoops = parseInt(btn.getAttribute('data-scoops'), 10);
          route();
        });
      });
      document.getElementById('btn-hint') && document.getElementById('btn-hint').addEventListener('click', function () {
        counterState.showHint = !counterState.showHint;
        route();
      });
      document.getElementById('btn-advance') && document.getElementById('btn-advance').addEventListener('click', function () {
        var o = counterState;
        if (o.step === 'cup' && o.pickedSize) o.step = 'drink';
        else if (o.step === 'drink' && o.pickedDrink) o.step = 'scoops';
        else if (o.step === 'scoops' && o.pickedScoops != null) {
          var ok = o.pickedSize === o.size && o.pickedDrink === o.drink.id &&
            o.pickedScoops === B.getScoop(o.drink.scoopCategory, o.size);
          recordOrder(ok);
          o.step = 'result';
        }
        route();
      });
      document.getElementById('btn-next-order') && document.getElementById('btn-next-order').addEventListener('click', function () {
        counterState = newOrder();
        route();
      });
    }
    if (path === '/quiz') {
      document.querySelectorAll('[data-qi]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (quizState.locked) return;
          var i = parseInt(btn.getAttribute('data-qi'), 10);
          quizState.selected = i;
          quizState.locked = true;
          if (i === quizState.questions[quizState.idx].answer) quizState.score++;
          route();
        });
      });
      document.getElementById('btn-quiz-next') && document.getElementById('btn-quiz-next').addEventListener('click', function () {
        if (quizState.idx + 1 >= quizState.questions.length) {
          recordQuiz(quizState.score);
          quizState.done = true;
        } else {
          quizState.idx++;
          quizState.selected = null;
          quizState.locked = false;
        }
        route();
      });
      document.getElementById('btn-quiz-again') && document.getElementById('btn-quiz-again').addEventListener('click', function () {
        quizState = null;
        route();
      });
    }
    if (path === '/free-play') {
      document.querySelectorAll('[data-drill]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          freeState.drill = btn.getAttribute('data-drill');
          freeState.guess = null;
          freeState.revealed = false;
          route();
        });
      });
      document.querySelectorAll('[data-fsize]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          freeState.size = btn.getAttribute('data-fsize');
          freeState.guess = null;
          freeState.revealed = false;
          route();
        });
      });
      document.querySelectorAll('[data-fguess]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          freeState.guess = parseInt(btn.getAttribute('data-fguess'), 10);
          freeState.revealed = false;
          route();
        });
      });
      document.querySelectorAll('[data-temp]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (freeState.revealed) return;
          freeState.guess = parseInt(btn.getAttribute('data-temp'), 10);
          freeState.revealed = true;
          route();
        });
      });
      document.getElementById('btn-fcheck') && document.getElementById('btn-fcheck').addEventListener('click', function () {
        freeState.revealed = true;
        route();
      });
      document.getElementById('btn-fnext') && document.getElementById('btn-fnext').addEventListener('click', function () {
        freeState.catIdx++;
        freeState.guess = null;
        freeState.revealed = false;
        route();
      });
    }
  }

  route();
})();
