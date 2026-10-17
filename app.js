(function () {
  var B = window.BREW;
  var ART = window.BREW_ART;
  var KEY = 'brew-crew-v2-progress';

  function loadP() {
    try {
      var r = localStorage.getItem(KEY);
      if (r) return Object.assign(defP(), JSON.parse(r));
    } catch (e) {}
    return defP();
  }
  function defP() {
    return {
      servedCount: 0, correctOrders: 0, bestStreak: 0, currentStreak: 0,
      xp: 0, masteredIds: [], quizBest: 0, trainingShifts: 0, bestRush: 0,
      detailCorrect: 0, detailTotal: 0
    };
  }
  function saveP(p) { localStorage.setItem(KEY, JSON.stringify(p)); }

  var progress = loadP();

  function rankFor(xp) {
    var ranks = B.RANKS;
    var r = ranks[0];
    for (var i = 0; i < ranks.length; i++) {
      if (xp >= ranks[i].minXp) r = ranks[i];
    }
    return r;
  }
  function nextRank(xp) {
    var ranks = B.RANKS;
    for (var i = 0; i < ranks.length; i++) {
      if (ranks[i].minXp > xp) return ranks[i];
    }
    return null;
  }
  function pctToNext(xp) {
    var cur = rankFor(xp);
    var nxt = nextRank(xp);
    if (!nxt) return 100;
    var span = nxt.minXp - cur.minXp;
    return Math.min(100, Math.round(((xp - cur.minXp) / span) * 100));
  }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function setActiveNav(path) {
    $$('.nav-item').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-route') === path || (path === '/' && a.getAttribute('data-route') === '/'));
    });
  }

  function toast(msg, ok) {
    var t = document.createElement('div');
    t.className = 'toast' + (ok ? ' ok' : '');
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.classList.add('show'); }, 10);
    setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 300); }, 2200);
  }

  // ---------- HOME ----------
  function renderHome() {
    var rank = rankFor(progress.xp);
    var nxt = nextRank(progress.xp);
    var pct = pctToNext(progress.xp);
    var toNext = nxt ? (nxt.minXp - progress.xp) : 0;
    var accuracy = progress.detailTotal ? Math.round((progress.detailCorrect / progress.detailTotal) * 100) : 0;
    var main = document.getElementById('main');
    main.innerHTML =
      '<section class="hero-card">' +
        '<div class="hero-kicker">YOUR TRAINING SHIFT</div>' +
        '<h1 class="hero-title">GOOD COFFEE.<br><span class="red">GREAT HANDS.</span></h1>' +
        '<p class="hero-sub">Every order is a chance to get sharper. Practice builds, learn the sheet, and find your rhythm behind the bar.</p>' +
        '<div class="hero-art">' + (ART.drinkSVG(B.DRINKS[0], 120) || '') + '</div>' +
        '<a href="#/counter" class="btn btn-primary btn-lg">Pick up where you left off →</a>' +
      '</section>' +
      '<section class="journey-card">' +
        '<div class="journey-top">' +
          '<div><div class="journey-label">YOUR BARISTA JOURNEY</div>' +
          '<div class="journey-rank">' + rank.name + '</div>' +
          '<div class="journey-xp">' + (nxt ? toNext + ' XP to ' + nxt.name : 'Max rank') + '</div></div>' +
          '<div class="trophy">🏆</div>' +
        '</div>' +
        '<div class="xp-bar"><div class="xp-fill" style="width:' + pct + '%"></div></div>' +
        '<div class="xp-meta">' + progress.xp + ' XP earned · ' + pct + '%</div>' +
        '<div class="rank-track">' + B.RANKS.map(function (r) {
          return '<span class="' + (r.id === rank.id ? 'on' : '') + '">' + r.name + '</span>';
        }).join('') + '</div>' +
      '</section>' +
      '<section class="stats-grid">' +
        '<div class="stat-card"><div class="stat-val">' + progress.servedCount + '</div><div class="stat-label">Orders served</div></div>' +
        '<div class="stat-card"><div class="stat-val">' + accuracy + '%</div><div class="stat-label">Build accuracy</div></div>' +
        '<div class="stat-card"><div class="stat-val">' + progress.bestStreak + '</div><div class="stat-label">Best streak</div></div>' +
        '<div class="stat-card"><div class="stat-val">' + progress.trainingShifts + '</div><div class="stat-label">Training shifts</div></div>' +
      '</section>' +
      '<section class="station-picker">' +
        '<h2>What sounds good?</h2>' +
        '<a href="#/counter" class="station station-red"><div class="station-title">Take the front counter</div><div class="station-sub">Build real customer orders one drink at a time.</div></a>' +
        '<a href="#/study" class="station station-cream"><div class="station-title">Flip through the recipe sheet</div><div class="station-sub">Scoops, fill lines, temperatures and shots.</div></a>' +
        '<a href="#/drills" class="station"><div class="station-title">Sharpen one skill at a time</div><div class="station-sub">Short rounds on a single topic.</div></a>' +
        '<a href="#/quiz" class="station"><div class="station-title">Test what you know</div><div class="station-sub">Quick multiple choice.</div></a>' +
      '</section>';
  }

  // ---------- COUNTER ----------
  var counter = null;
  function newOrder() {
    var drink = B.DRINKS[Math.floor(Math.random() * B.DRINKS.length)];
    var size = B.SIZES[Math.floor(Math.random() * B.SIZES.length)];
    var cust = B.CUSTOMERS[Math.floor(Math.random() * B.CUSTOMERS.length)];
    var line = B.ORDER_LINES[Math.floor(Math.random() * B.ORDER_LINES.length)]
      .replace('{size}', B.SIZE_LABELS[size]).replace('{drink}', drink.name);
    return { drink: drink, size: size, customer: cust, line: line, step: 1, picks: {}, ticket: String(Math.floor(Math.random() * 900) + 100).padStart(3, '0') };
  }
  function scoopFor(drink, size) {
    var cat = B.SCOOP_CATEGORIES.find(function (c) { return c.id === drink.scoopCat; });
    if (!cat) return 1;
    if (size === 'kids') return 1;
    return cat.scoops[size] || 1;
  }
  function fillFor(drink, size) {
    var table = B.FILL_LINES[drink.fill] || B.FILL_LINES.iced;
    return table[size] || 0;
  }
  function renderCounter() {
    if (!counter) counter = newOrder();
    var o = counter;
    var main = document.getElementById('main');
    var steps = ['CUP', 'DRINK', 'SCOOPS'];
    var stepHtml = steps.map(function (s, i) {
      var n = i + 1;
      var cls = n === o.step ? 'on' : (n < o.step ? 'done' : '');
      return '<div class="step-pill ' + cls + '">' + n + ' ' + s + '</div>';
    }).join('');
    var body = '';
    if (o.step === 1) {
      body = '<h2 class="step-title">GRAB THE RIGHT CUP</h2><div class="cup-grid">' +
        B.SIZES.map(function (sz) {
          var sel = o.picks.size === sz ? ' selected' : '';
          return '<button class="cup-btn' + sel + '" data-size="' + sz + '">' + ART.cupSizeSVG(sz, o.picks.size === sz) + '<span>' + B.SIZE_LABELS[sz] + '</span></button>';
        }).join('') + '</div>';
    } else if (o.step === 2) {
      body = '<h2 class="step-title">PICK THE DRINK</h2><div class="drink-grid">' +
        B.DRINKS.slice(0, 12).map(function (d) {
          var sel = o.picks.drinkId === d.id ? ' selected' : '';
          return '<button class="drink-btn' + sel + '" data-drink="' + d.id + '">' + ART.drinkSVG(d, 56) + '<span>' + d.name + '</span></button>';
        }).join('') + '</div>';
    } else {
      var need = scoopFor(o.drink, o.size);
      body = '<h2 class="step-title">HOW MANY SCOOPS?</h2><p class="hint-line">' + o.drink.name + ' · ' + B.SIZE_LABELS[o.size] + '</p><div class="scoop-row">' +
        [1,2,3,4].map(function (n) {
          var sel = o.picks.scoops === n ? ' selected' : '';
          return '<button class="scoop-btn' + sel + '" data-scoops="' + n + '">' + n + '</button>';
        }).join('') + '</div>';
    }
    main.innerHTML =
      '<div class="counter-top">' +
        '<div class="ticket">TICKET #' + o.ticket + '<br><strong>' + o.customer.name.toUpperCase() + '</strong></div>' +
        '<div class="customer-art">' + ART.customerSVG(o.customer, 80) + '</div>' +
        '<p class="order-line">“' + o.line + '”</p>' +
      '</div>' +
      '<div class="step-bar">' + stepHtml + '</div>' +
      '<div class="step-body">' + body + '</div>' +
      '<div class="counter-actions">' +
        '<button class="btn btn-ghost" id="c-hint">💡 Hint</button>' +
        '<button class="btn btn-primary" id="c-next">' + (o.step < 3 ? 'Next →' : 'Complete order') + '</button>' +
      '</div>';
    bindCounter();
  }
  function bindCounter() {
    $$('.cup-btn').forEach(function (b) {
      b.addEventListener('click', function () { counter.picks.size = b.getAttribute('data-size'); renderCounter(); });
    });
    $$('.drink-btn').forEach(function (b) {
      b.addEventListener('click', function () { counter.picks.drinkId = b.getAttribute('data-drink'); renderCounter(); });
    });
    $$('.scoop-btn').forEach(function (b) {
      b.addEventListener('click', function () { counter.picks.scoops = +b.getAttribute('data-scoops'); renderCounter(); });
    });
    var hint = document.getElementById('c-hint');
    if (hint) hint.addEventListener('click', function () {
      var o = counter;
      if (o.step === 1) toast('Cup size: ' + B.SIZE_LABELS[o.size], true);
      else if (o.step === 2) toast('Drink: ' + o.drink.name, true);
      else toast('Scoops for ' + o.drink.name + ' ' + B.SIZE_LABELS[o.size] + ': ' + scoopFor(o.drink, o.size), true);
    });
    var next = document.getElementById('c-next');
    if (next) next.addEventListener('click', function () {
      var o = counter;
      if (o.step === 1) {
        if (!o.picks.size) { toast('Pick a cup size'); return; }
        progress.detailTotal++;
        if (o.picks.size === o.size) { progress.detailCorrect++; progress.xp += 5; toast('Right cup!', true); }
        else toast('Wrong size — needed ' + B.SIZE_LABELS[o.size]);
        o.step = 2; saveP(progress); renderCounter();
      } else if (o.step === 2) {
        if (!o.picks.drinkId) { toast('Pick a drink'); return; }
        progress.detailTotal++;
        if (o.picks.drinkId === o.drink.id) { progress.detailCorrect++; progress.xp += 8; toast('Correct drink!', true); }
        else toast('Wrong drink — needed ' + o.drink.name);
        o.step = 3; saveP(progress); renderCounter();
      } else {
        if (!o.picks.scoops) { toast('Pick scoop count'); return; }
        var need = scoopFor(o.drink, o.size);
        progress.detailTotal++;
        var ok = o.picks.scoops === need;
        if (ok) { progress.detailCorrect++; progress.xp += 10; progress.currentStreak++; progress.bestStreak = Math.max(progress.bestStreak, progress.currentStreak); toast('Perfect scoops! +10 XP', true); }
        else { progress.currentStreak = 0; toast('Needed ' + need + ' scoop(s)'); }
        progress.servedCount++;
        if (ok && o.picks.size === o.size && o.picks.drinkId === o.drink.id) progress.correctOrders++;
        progress.trainingShifts++;
        saveP(progress);
        counter = null;
        setTimeout(function () { location.hash = '#/'; }, 800);
      }
    });
  }

  // ---------- STUDY ----------
  var studyIdx = 0;
  function studyCards() {
    return B.DRINKS.map(function (d) {
      return { id: d.id, title: d.name, body: (d.mix ? d.mix + ' · ' : '') + d.flavors, drink: d };
    });
  }
  function renderStudy() {
    var cards = studyCards();
    var card = cards[studyIdx % cards.length];
    var mastered = progress.masteredIds.indexOf(card.id) >= 0;
    var main = document.getElementById('main');
    main.innerHTML =
      '<div class="study-header"><h1>STUDY</h1><div class="study-tabs"><span class="tab on">Flashcards</span></div></div>' +
      '<div class="master-count">' + progress.masteredIds.length + '/' + cards.length + ' mastered</div>' +
      '<div class="flash-card">' +
        '<div class="flash-art">' + ART.drinkSVG(card.drink, 100) + '</div>' +
        '<div class="flash-title">' + card.title + '</div>' +
        '<div class="flash-body">' + card.body + '</div>' +
      '</div>' +
      '<div class="flash-actions">' +
        '<button class="btn btn-ghost" id="s-again">Review again</button>' +
        '<button class="btn btn-primary" id="s-got">Got it</button>' +
      '</div>' +
      '<button class="link-btn" id="s-reset">Reset this deck</button>' +
      '<div class="recipe-sheet">' +
        '<h3>SIGNATURE DRINKS</h3>' +
        B.DRINKS.filter(function (d) { return d.cat === 'signature'; }).map(function (d) {
          return '<div class="recipe-row"><span>' + d.name + '</span><span class="tag">' + (d.mix || '') + '</span><span class="flav">' + d.flavors + '</span></div>';
        }).join('') +
        '<h3>SCOOPS (S / M / L)</h3>' +
        B.SCOOP_CATEGORIES.map(function (c) {
          return '<div class="scoop-chip"><strong>' + c.name + '</strong> ' + c.scoops.small + '-' + c.scoops.medium + '-' + c.scoops.large + (c.includes ? '<small>' + c.includes + '</small>' : '') + '</div>';
        }).join('') +
        '<h3>FILL LINES (OZ)</h3>' +
        '<table class="fill-table"><tr><th>Type</th><th>Kids</th><th>Small</th><th>Medium</th><th>Large</th></tr>' +
        '<tr><td>Iced</td><td>5</td><td>8</td><td>12</td><td>16</td></tr>' +
        '<tr><td>Hot Espresso</td><td>6</td><td>8</td><td>10</td><td>12</td></tr>' +
        '<tr><td>Hot Non-Espresso</td><td>8</td><td>10</td><td>14</td><td>18</td></tr></table>' +
        '<h3>TEMPERATURES</h3><div class="temp-row">Kids 110-120°F · Drinkable 140-150°F · Regular 160-170°F · Extra Hot 175-180°F · Burnt 181°F+</div>' +
        '<h3>SHOTS</h3><div class="temp-row">Shot window: 17-27 seconds · Perfect shot: 22 seconds</div>' +
      '</div>';
    document.getElementById('s-again').addEventListener('click', function () { studyIdx++; renderStudy(); });
    document.getElementById('s-got').addEventListener('click', function () {
      if (progress.masteredIds.indexOf(card.id) < 0) {
        progress.masteredIds.push(card.id);
        progress.xp += 3;
        saveP(progress);
      }
      studyIdx++;
      renderStudy();
    });
    document.getElementById('s-reset').addEventListener('click', function () {
      progress.masteredIds = [];
      saveP(progress);
      studyIdx = 0;
      renderStudy();
    });
  }

  // ---------- DRILLS ----------
  var drill = null;
  function startDrill(type) {
    var q;
    if (type === 'scoops') {
      var d = B.DRINKS[Math.floor(Math.random() * B.DRINKS.length)];
      var sz = B.SIZES[Math.floor(Math.random() * 3) + 1]; // skip kids sometimes
      q = { type: 'scoops', prompt: 'Scoops for ' + d.name + ' (' + B.SIZE_LABELS[sz] + ')?', answer: scoopFor(d, sz), options: [1,2,3,4] };
    } else if (type === 'fills') {
      var kinds = ['iced', 'hotEspresso', 'hotNonEspresso'];
      var k = kinds[Math.floor(Math.random() * kinds.length)];
      var sz = B.SIZES[Math.floor(Math.random() * B.SIZES.length)];
      var labels = { iced: 'Iced', hotEspresso: 'Hot Espresso', hotNonEspresso: 'Hot Non-Espresso' };
      q = { type: 'fills', prompt: 'Fill line (oz) for ' + labels[k] + ' ' + B.SIZE_LABELS[sz] + '?', answer: B.FILL_LINES[k][sz], options: [5,6,8,10,12,14,16,18] };
    } else if (type === 'temps') {
      var keys = Object.keys(B.TEMPS);
      var key = keys[Math.floor(Math.random() * keys.length)];
      q = { type: 'temps', prompt: 'Temperature range for "' + key + '"?', answer: B.TEMPS[key], options: Object.values(B.TEMPS) };
    } else {
      q = { type: 'shots', prompt: 'Perfect shot time (seconds)?', answer: B.SHOT.perfect, options: [18, 20, 22, 25] };
    }
    drill = { type: type, q: q, score: 0, total: 0 };
  }
  function renderDrills() {
    var main = document.getElementById('main');
    if (!drill) {
      main.innerHTML =
        '<h1 class="page-title">DRILLS</h1><p class="page-sub">Sharpen one skill at a time</p>' +
        '<div class="drill-list">' +
          '<button class="drill-card" data-type="scoops">Scoops</button>' +
          '<button class="drill-card" data-type="fills">Fill lines</button>' +
          '<button class="drill-card" data-type="temps">Temperatures</button>' +
          '<button class="drill-card" data-type="shots">Shot timing</button>' +
        '</div>';
      $$('.drill-card').forEach(function (b) {
        b.addEventListener('click', function () { startDrill(b.getAttribute('data-type')); renderDrills(); });
      });
      return;
    }
    var q = drill.q;
    main.innerHTML =
      '<div class="drill-header"><button class="link-btn" id="d-back">← Back</button><span>' + drill.type + ' · ' + drill.score + '/' + drill.total + '</span></div>' +
      '<div class="quiz-card"><div class="q-prompt">' + q.prompt + '</div>' +
      q.options.map(function (opt, i) {
        return '<button class="opt-btn" data-val="' + opt + '">' + String.fromCharCode(65 + i) + '. ' + opt + '</button>';
      }).join('') + '</div>';
    document.getElementById('d-back').addEventListener('click', function () { drill = null; renderDrills(); });
    $$('.opt-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        var val = b.getAttribute('data-val');
        var correct = String(val) === String(q.answer);
        drill.total++;
        progress.detailTotal++;
        if (correct) { drill.score++; progress.detailCorrect++; progress.xp += 4; toast('Correct!', true); }
        else toast('Answer: ' + q.answer);
        saveP(progress);
        startDrill(drill.type);
        renderDrills();
      });
    });
  }

  // ---------- QUIZ ----------
  var quiz = null;
  function buildQuiz() {
    var qs = [];
    // fills
    qs.push({ cat: 'FILL LINES', q: 'How many oz is the Large iced drink fill line?', a: '16 oz', opts: ['12 oz', '14 oz', '16 oz', '18 oz'] });
    qs.push({ cat: 'FILL LINES', q: 'Kids hot espresso fill line?', a: '6 oz', opts: ['5 oz', '6 oz', '8 oz', '10 oz'] });
    // scoops
    qs.push({ cat: 'SCOOPS', q: 'Original Breves scoops for Medium?', a: '2', opts: ['1', '2', '3', '4'] });
    qs.push({ cat: 'SCOOPS', q: 'Classics scoops for Large?', a: '1', opts: ['1', '2', '3', '4'] });
    qs.push({ cat: 'SCOOPS', q: '7 Fizz Chiller scoops Small/Med/Large?', a: '2-3-4', opts: ['1-1-2', '2-3-4', '1-2-2', '2-2-3'] });
    // temps
    qs.push({ cat: 'TEMPS', q: 'Regular temperature range?', a: '160-170°F', opts: ['140-150°F', '160-170°F', '175-180°F', '110-120°F'] });
    qs.push({ cat: 'TEMPS', q: 'Extra Hot range?', a: '175-180°F', opts: ['160-170°F', '175-180°F', '181°F+', '140-150°F'] });
    // shots
    qs.push({ cat: 'SHOTS', q: 'Perfect shot time?', a: '22 seconds', opts: ['18 seconds', '20 seconds', '22 seconds', '25 seconds'] });
    qs.push({ cat: 'SHOTS', q: 'Shot window?', a: '17-27 seconds', opts: ['15-20 seconds', '17-27 seconds', '20-30 seconds', '22-28 seconds'] });
    // signature
    qs.push({ cat: 'SIGNATURE', q: 'Brunette flavors + mix?', a: 'Caramel, Hazelnut · Mocha Mix', opts: ['Caramel, Vanilla · Smooth Mix', 'Caramel, Hazelnut · Mocha Mix', 'Banana, Hazelnut · Mocha Mix', 'Irish Cream · Smooth Mix'] });
    // shuffle
    for (var i = qs.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = qs[i]; qs[i] = qs[j]; qs[j] = t;
    }
    return { qs: qs.slice(0, 10), idx: 0, correct: 0 };
  }
  function renderQuiz() {
    var main = document.getElementById('main');
    if (!quiz) {
      main.innerHTML =
        '<div class="quiz-hero"><div class="kicker">QUIZ SHIFT</div><h1>Test what you know</h1>' +
        '<button class="btn btn-primary btn-lg" id="q-start">Start 10-question quiz</button></div>';
      document.getElementById('q-start').addEventListener('click', function () { quiz = buildQuiz(); renderQuiz(); });
      return;
    }
    if (quiz.idx >= quiz.qs.length) {
      var pct = Math.round((quiz.correct / quiz.qs.length) * 100);
      if (pct > progress.quizBest) progress.quizBest = pct;
      progress.xp += quiz.correct * 5;
      saveP(progress);
      main.innerHTML =
        '<div class="quiz-result"><h1>' + quiz.correct + ' / ' + quiz.qs.length + '</h1><p>' + pct + '% correct</p>' +
        '<button class="btn btn-primary" id="q-again">Try again</button><a href="#/" class="btn btn-ghost">Home</a></div>';
      document.getElementById('q-again').addEventListener('click', function () { quiz = null; renderQuiz(); });
      return;
    }
    var item = quiz.qs[quiz.idx];
    main.innerHTML =
      '<div class="quiz-progress">Question ' + (quiz.idx + 1) + ' of ' + quiz.qs.length + ' · ' + quiz.correct + ' correct</div>' +
      '<div class="quiz-card"><div class="q-cat">' + item.cat + '</div><div class="q-prompt">' + item.q + '</div>' +
      item.opts.map(function (opt, i) {
        return '<button class="opt-btn" data-opt="' + opt.replace(/"/g, '"') + '">' + String.fromCharCode(65 + i) + '. ' + opt + '</button>';
      }).join('') +
      '</div><div class="counter-actions"><button class="btn btn-ghost" id="q-hint">💡 Hint</button></div>';
    $$('.opt-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        var val = b.getAttribute('data-opt');
        var ok = val === item.a;
        if (ok) { quiz.correct++; progress.detailCorrect++; toast('Correct!', true); }
        else toast('Answer: ' + item.a);
        progress.detailTotal++;
        saveP(progress);
        quiz.idx++;
        renderQuiz();
      });
    });
    var h = document.getElementById('q-hint');
    if (h) h.addEventListener('click', function () { toast(item.a, true); });
  }

  // ---------- ROUTER ----------
  function route() {
    var hash = (location.hash || '#/').replace(/^#/, '') || '/';
    var path = hash.split('?')[0];
    setActiveNav(path === '' ? '/' : path);
    if (path === '/' || path === '') renderHome();
    else if (path === '/counter') renderCounter();
    else if (path === '/study') renderStudy();
    else if (path === '/drills') renderDrills();
    else if (path === '/quiz') renderQuiz();
    else renderHome();
  }

  window.addEventListener('hashchange', route);
  route();
})();
