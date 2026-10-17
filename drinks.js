/* Cartoon drink SVGs matching Brew Crew wireframe lineup exactly */
window.DRINK_SVG = (function () {
  function face() {
    return '<circle cx="32" cy="78" r="3.2" fill="#1a1a1a"/><circle cx="48" cy="78" r="3.2" fill="#1a1a1a"/><path d="M34 86 Q40 92 46 86" stroke="#1a1a1a" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
  }
  function logo() {
    return '<circle cx="40" cy="58" r="9" fill="#e11d48"/><text x="40" y="61.5" text-anchor="middle" font-size="8" font-weight="900" fill="#fff" font-family="system-ui">7B</text>';
  }
  function lid(color) {
    return '<rect x="18" y="28" width="44" height="8" rx="3" fill="' + (color || '#1a1a1a') + '"/><rect x="20" y="24" width="40" height="6" rx="2" fill="' + (color || '#1a1a1a') + '"/>';
  }
  function straw(color, x) {
    return '<rect x="' + (x || 48) + '" y="8" width="5" height="28" rx="2" fill="' + (color || '#e11d48') + '" transform="rotate(12 ' + (x || 48) + ' 22)"/>';
  }
  function whip() {
    return '<ellipse cx="40" cy="22" rx="18" ry="10" fill="#fff"/><ellipse cx="32" cy="16" rx="8" ry="6" fill="#fff"/><ellipse cx="48" cy="15" rx="7" ry="5" fill="#fff"/><ellipse cx="40" cy="12" rx="6" ry="4" fill="#fff"/>';
  }
  function cupBody(fill, topY) {
    return '<path d="M22 ' + (topY || 36) + ' L20 98 Q20 108 30 108 L50 108 Q60 108 60 98 L58 ' + (topY || 36) + ' Z" fill="' + fill + '" stroke="#1a1a1a" stroke-width="2.5"/>';
  }
  function cupBodyHot(fill) {
    return '<path d="M24 40 L22 95 Q22 105 32 105 L48 105 Q58 105 58 95 L56 40 Z" fill="' + fill + '" stroke="#1a1a1a" stroke-width="2.5"/>' +
      '<rect x="22" y="36" width="36" height="8" rx="2" fill="#e11d48"/>' +
      '<path d="M30 20 Q32 12 34 20 M40 18 Q42 8 44 18 M50 20 Q52 12 54 20" stroke="#aaa" stroke-width="1.5" fill="none" stroke-linecap="round"/>';
  }

  var MAP = {
    blondie: function () {
      return '<svg class="drink-svg" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">' +
        whip() + straw('#e11d48') + lid('#f5e6d3') +
        cupBody('#e8c9a0') + face() + logo() +
        '<ellipse cx="40" cy="48" rx="14" ry="4" fill="#fff" opacity="0.5"/>' +
        '</svg>';
    },
    'sweet-salty': function () {
      return '<svg class="drink-svg" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">' +
        whip() + straw('#e11d48') + lid('#f5e6d3') +
        cupBody('#d4a574') + face() + logo() +
        '<path d="M28 50 Q40 58 52 50" stroke="#c45c26" stroke-width="2" fill="none"/>' +
        '</svg>';
    },
    'cinnamon-roll': function () {
      return '<svg class="drink-svg" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">' +
        '<ellipse cx="40" cy="20" rx="16" ry="9" fill="#c4a484"/><ellipse cx="40" cy="16" rx="10" ry="5" fill="#a67c52"/>' +
        straw('#3b82f6', 52) + lid('#f5e6d3') +
        cupBody('#c9956a') + face() + logo() +
        '</svg>';
    },
    brunette: function () {
      return '<svg class="drink-svg" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">' +
        whip() + straw('#3b82f6') + lid('#f5e6d3') +
        cupBody('#5c3a21') + face() + logo() +
        '<path d="M26 52 Q40 62 54 52" stroke="#c45c26" stroke-width="2.5" fill="none"/>' +
        '</svg>';
    },
    'banana-bread': function () {
      return '<svg class="drink-svg" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">' +
        whip() + '<circle cx="48" cy="14" r="5" fill="#fbbf24"/>' + straw('#3b82f6') + lid('#f5e6d3') +
        cupBody('#6b4423') + face() + logo() +
        '</svg>';
    },
    'smooth-7': function () {
      return '<svg class="drink-svg" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">' +
        whip() + '<circle cx="36" cy="12" r="4" fill="#22c55e"/><circle cx="46" cy="10" r="3.5" fill="#22c55e"/>' +
        straw('#e11d48') + lid('#f5e6d3') +
        cupBody('#e0c9a0') + face() + logo() +
        '</svg>';
    },
    'cookie-butter': function () {
      return '<svg class="drink-svg" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">' +
        whip() + '<circle cx="44" cy="12" r="6" fill="#c4a484"/><circle cx="44" cy="12" r="3" fill="#8b6914"/>' +
        straw('#e11d48') + lid('#f5e6d3') +
        cupBody('#c9956a') + face() + logo() +
        '</svg>';
    },
    latte: function () {
      return '<svg class="drink-svg" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">' +
        straw('#e11d48') + lid('#1a1a1a') +
        cupBody('#e8c9a0') + face() + logo() +
        '</svg>';
    },
    mocha: function () {
      return '<svg class="drink-svg" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">' +
        whip() + straw('#e11d48') + lid('#1a1a1a') +
        cupBody('#4a2c1a') + face() + logo() +
        '<path d="M26 50 Q40 60 54 50" stroke="#3d2314" stroke-width="3" fill="none"/>' +
        '</svg>';
    },
    macchiato: function () {
      return '<svg class="drink-svg" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M30 18 Q40 8 50 18" stroke="#fbbf24" stroke-width="3" fill="none"/>' +
        straw('#e11d48') + lid('#1a1a1a') +
        cupBody('#d4b896') + face() + logo() +
        '</svg>';
    },
    'house-blend': function () {
      return '<svg class="drink-svg" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">' +
        cupBodyHot('#fff') + face() +
        '<circle cx="40" cy="70" r="9" fill="#e11d48"/><text x="40" y="73.5" text-anchor="middle" font-size="8" font-weight="900" fill="#fff" font-family="system-ui">7B</text>' +
        '</svg>';
    },
    'chai-latte': function () {
      return '<svg class="drink-svg" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">' +
        straw('#e11d48') + lid('#1a1a1a') +
        cupBody('#c4a35a') + face() + logo() +
        '</svg>';
    },
    'matcha-latte': function () {
      return '<svg class="drink-svg" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">' +
        straw('#e11d48') + lid('#1a1a1a') +
        cupBody('#7d9b5e') + face() + logo() +
        '</svg>';
    },
    cocoa: function () {
      return '<svg class="drink-svg" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">' +
        cupBodyHot('#5c3a21') + face() +
        '<circle cx="40" cy="70" r="9" fill="#e11d48"/><text x="40" y="73.5" text-anchor="middle" font-size="8" font-weight="900" fill="#fff" font-family="system-ui">7B</text>' +
        '</svg>';
    },
    'cold-brew': function () {
      return '<svg class="drink-svg" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">' +
        straw('#e11d48') + lid('#1a1a1a') +
        cupBody('#2a1a10') + face() + logo() +
        '</svg>';
    },
    'lemon-freeze': function () {
      return '<svg class="drink-svg" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">' +
        straw('#e11d48') + lid('#1a1a1a') +
        cupBody('#f5e06b') + face() + logo() +
        '</svg>';
    },
    '7-fizz': function () {
      return '<svg class="drink-svg" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">' +
        straw('#e11d48') + lid('#1a1a1a') +
        cupBody('#f43f5e') + face() + logo() +
        '</svg>';
    },
    '7-fizz-chiller': function () {
      return '<svg class="drink-svg" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">' +
        straw('#e11d48') + lid('#1a1a1a') +
        cupBody('#f9a8d4') + face() + logo() +
        '</svg>';
    },
    'coffee-chiller': function () {
      return '<svg class="drink-svg" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">' +
        straw('#e11d48') + lid('#1a1a1a') +
        cupBody('#8b6914') + face() + logo() +
        '</svg>';
    },
    'iced-7-energy': function () {
      return '<svg class="drink-svg" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">' +
        straw('#e11d48') + lid('#1a1a1a') +
        cupBody('#3b82f6') + face() + logo() +
        '</svg>';
    },
    'iced-lemonade': function () {
      return '<svg class="drink-svg" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">' +
        straw('#e11d48') + lid('#1a1a1a') +
        cupBody('#f4d35e') + face() + logo() +
        '</svg>';
    }
  };

  return {
    get: function (id) {
      if (MAP[id]) return MAP[id]();
      return '<svg class="drink-svg" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">' +
        straw('#e11d48') + lid('#1a1a1a') + cupBody('#c9a27a') + face() + logo() + '</svg>';
    }
  };
})();
