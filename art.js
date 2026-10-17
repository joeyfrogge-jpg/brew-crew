/* SVG art: detailed drink cups + customer avatars matching wireframe lineup */
window.BREW_ART = {
  drinkSVG: function (drink, size) {
    size = size || 80;
    var L = drink.liquid || '#d4b896';
    var isHot = drink.cupStyle === 'hot';
    var w = size, h = size * 1.35;
    var lid = isHot
      ? '<ellipse cx="40" cy="22" rx="28" ry="8" fill="#1a1a1a"/><rect x="12" y="18" width="56" height="10" rx="3" fill="#e10600"/><circle cx="40" cy="18" r="4" fill="#1a1a1a"/>'
      : '<ellipse cx="40" cy="20" rx="26" ry="6" fill="#e8e8e8" opacity=".5"/>';
    var straw = '';
    if (!isHot && drink.top !== 'hot-lid') {
      var sc = drink.top === 'straw-lemon' ? '#facc15' : (drink.group === 'signature' ? '#ef4444' : '#dc2626');
      straw = '<rect x="48" y="4" width="5" height="36" rx="2" fill="' + sc + '" transform="rotate(12 50 20)"/>';
    }
    var whip = '';
    if (drink.top && drink.top.indexOf('whip') === 0) {
      whip = '<ellipse cx="40" cy="24" rx="22" ry="10" fill="#fff"/><ellipse cx="32" cy="20" rx="10" ry="7" fill="#fff"/><ellipse cx="48" cy="20" rx="10" ry="7" fill="#fff"/><ellipse cx="40" cy="16" rx="8" ry="6" fill="#fff"/>';
      if (drink.top === 'whip-clover') whip += '<path d="M38 12c0-4 4-6 4-6s4 2 4 6c-2 0-4 1-4 1s-2-1-4-1z" fill="#22c55e"/>';
      if (drink.top === 'whip-cookie') whip += '<circle cx="50" cy="14" r="6" fill="#c4956a"/><circle cx="50" cy="14" r="3" fill="#8b6914"/>';
      if (drink.top === 'whip-drizzle') whip += '<path d="M28 22 Q40 30 52 22" stroke="#5c3a28" stroke-width="2" fill="none"/>';
    }
    if (drink.top === 'caramel-layer') {
      whip = '<rect x="18" y="28" width="44" height="8" fill="#c47a2c" opacity=".7"/><rect x="18" y="36" width="44" height="6" fill="#f5efe0" opacity=".5"/>';
    }
    var face = drink.face !== false
      ? '<circle cx="32" cy="58" r="3" fill="#1a1a1a"/><circle cx="48" cy="58" r="3" fill="#1a1a1a"/><path d="M34 66 Q40 72 46 66" stroke="#1a1a1a" stroke-width="2" fill="none" stroke-linecap="round"/>'
      : '';
    var badge = '<circle cx="40" cy="48" r="10" fill="#e10600"/><text x="40" y="53" text-anchor="middle" fill="#fff" font-size="10" font-weight="800" font-family="system-ui">7B</text>';
    return '<svg viewBox="0 0 80 108" width="' + w + '" height="' + h + '" xmlns="http://www.w3.org/2000/svg">' +
      straw + lid + whip +
      '<path d="M16 28 L20 95 Q40 102 60 95 L64 28 Z" fill="' + L + '" stroke="#1a1a1a" stroke-width="2"/>' +
      '<path d="M18 28 L22 90 Q40 96 58 90 L62 28" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="3"/>' +
      badge + face +
      '</svg>';
  },

  cupSizeSVG: function (sizeKey, selected) {
    var heights = { kids: 36, small: 44, medium: 54, large: 64 };
    var widths = { kids: 24, small: 28, medium: 32, large: 36 };
    var h = heights[sizeKey] || 50, w = widths[sizeKey] || 30;
    var stroke = selected ? '#e10600' : '#94a3b8';
    var fill = selected ? '#fef2f2' : '#f1f5f9';
    return '<svg width="' + (w + 8) + '" height="' + (h + 8) + '" viewBox="0 0 ' + (w + 8) + ' ' + (h + 8) + '">' +
      '<path d="M4 4 L6 ' + (h + 2) + ' Q' + ((w + 8) / 2) + ' ' + (h + 6) + ' ' + (w + 2) + ' ' + (h + 2) + ' L' + (w + 4) + ' 4 Z" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"/>' +
      '</svg>';
  },

  customerSVG: function (c, size) {
    size = size || 72;
    var skin = c.skin || '#f5d0a9';
    var hair = c.hair || '#1a1a1a';
    var top = c.top || '#64748b';
    var extras = '';
    if (c.style === 'beard') extras += '<path d="M28 48 Q40 58 52 48" fill="' + hair + '"/>';
    if (c.style === 'glasses' || c.style === 'hoodie-glasses' || c.style === 'short-glasses' || c.style === 'curly-glasses')
      extras += '<circle cx="32" cy="36" r="8" fill="none" stroke="#1a1a1a" stroke-width="2"/><circle cx="48" cy="36" r="8" fill="none" stroke="#1a1a1a" stroke-width="2"/><line x1="40" y1="36" x2="40" y2="36" stroke="#1a1a1a" stroke-width="2"/>';
    if (c.style === 'headphones') extras += '<rect x="14" y="28" width="8" height="16" rx="3" fill="#ef4444"/><rect x="58" y="28" width="8" height="16" rx="3" fill="#ef4444"/><path d="M22 30 Q40 18 58 30" stroke="#ef4444" stroke-width="3" fill="none"/>';
    if (c.style === 'hijab') extras += '<path d="M18 30 Q40 8 62 30 L62 55 Q40 65 18 55 Z" fill="' + hair + '" opacity=".9"/>';
    if (c.style === 'hardhat') extras += '<ellipse cx="40" cy="18" rx="26" ry="10" fill="#eab308"/><rect x="16" y="16" width="48" height="8" fill="#ca8a04"/>';
    if (c.style === 'bandana') extras += '<path d="M18 22 L62 22 L58 32 L22 32 Z" fill="#ef4444"/>';
    if (c.style === 'pigtails') extras += '<circle cx="18" cy="28" r="8" fill="' + hair + '"/><circle cx="62" cy="28" r="8" fill="' + hair + '"/>';
    if (c.style === 'buns') extras += '<circle cx="22" cy="18" r="9" fill="' + hair + '"/><circle cx="58" cy="18" r="9" fill="' + hair + '"/>';
    if (c.style === 'afro' || c.style === 'afro-shades') extras += '<circle cx="40" cy="22" r="28" fill="' + hair + '"/>';
    if (c.style === 'afro-shades') extras += '<rect x="24" y="32" width="32" height="10" rx="3" fill="#1a1a1a"/>';
    if (c.style === 'bald-mustache') extras += '<path d="M32 48 Q40 52 48 48" stroke="' + hair + '" stroke-width="3" fill="none"/>';
    if (c.style === 'bald-beard') extras += '<path d="M28 46 Q40 60 52 46" fill="#d4d4d4"/>';

    var hairShape = '';
    if (c.style === 'bun') hairShape = '<ellipse cx="40" cy="16" rx="20" ry="14" fill="' + hair + '"/><circle cx="52" cy="10" r="10" fill="' + hair + '"/>';
    else if (c.style === 'long' || c.style === 'ponytail') hairShape = '<ellipse cx="40" cy="20" rx="24" ry="16" fill="' + hair + '"/><path d="M16 28 L14 60 L22 55 L20 28" fill="' + hair + '"/><path d="M64 28 L66 60 L58 55 L60 28" fill="' + hair + '"/>';
    else if (c.style === 'bob') hairShape = '<ellipse cx="40" cy="22" rx="24" ry="14" fill="' + hair + '"/>';
    else if (c.style === 'short' || c.style === 'stripe' || c.style === 'hoodie-glasses') hairShape = '<ellipse cx="40" cy="18" rx="22" ry="12" fill="' + hair + '"/>';
    else if (c.style !== 'hijab' && c.style !== 'afro' && c.style !== 'afro-shades' && c.style !== 'bald-mustache' && c.style !== 'bald-beard' && c.style !== 'hardhat')
      hairShape = '<ellipse cx="40" cy="18" rx="22" ry="14" fill="' + hair + '"/>';

    return '<svg viewBox="0 0 80 90" width="' + size + '" height="' + (size * 1.12) + '" xmlns="http://www.w3.org/2000/svg">' +
      hairShape +
      '<ellipse cx="40" cy="40" rx="22" ry="24" fill="' + skin + '"/>' +
      '<circle cx="32" cy="38" r="2.5" fill="#1a1a1a"/><circle cx="48" cy="38" r="2.5" fill="#1a1a1a"/>' +
      '<path d="M34 48 Q40 54 46 48" stroke="#1a1a1a" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      extras +
      '<path d="M18 62 Q40 58 62 62 L66 90 L14 90 Z" fill="' + top + '"/>' +
      '</svg>';
  }
};
