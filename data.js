/* Brew Crew — recipe data from Scoops Test Key + Brewista 101 Key (Dec 2025) */
window.BREW = {
  SIZES: ['kids', 'small', 'medium', 'large'],
  SIZE_LABELS: { kids: 'Kids', small: 'Small', medium: 'Medium', large: 'Large' },

  SCOOP_CATEGORIES: [
    { id: 'classics', name: 'Classics', includes: 'Lattes, Mochas, Breves, Macchiatos, House Blends, Chai Lattes, Matcha Lattes, Cocoas, Cold Brew', scoops: { small: 1, medium: 1, large: 1 } },
    { id: 'original-breves', name: 'Original Breves', includes: 'Blondie, Smooth 7, Cinnamon Roll, Sweet & Salty, Cookie Butter', scoops: { small: 1, medium: 2, large: 2 } },
    { id: 'original-mochas', name: 'Original Mochas', includes: 'Banana Bread, Brunette', scoops: { small: 1, medium: 1, large: 2 } },
    { id: '7-fizz-chiller', name: '7 Fizz Chiller', scoops: { small: 2, medium: 3, large: 4 } },
    { id: 'tea-chiller', name: 'Tea Chiller', scoops: { small: 2, medium: 3, large: 4 } },
    { id: '7-energy-chiller', name: '7 Energy Chiller', scoops: { small: 1, medium: 1, large: 2 } },
    { id: 'special-7s', name: "Special 7's", note: 'Hand blended coffee chiller', scoops: { small: 2, medium: 3, large: 4 } },
    { id: '7-fizz', name: '7 Fizz', scoops: { small: 2, medium: 3, large: 4 } },
    { id: 'lemon-freeze', name: 'Lemon Freeze', scoops: { small: 1, medium: 1, large: 2 } },
    { id: 'iced-7-energy', name: 'Iced 7 Energy', scoops: { small: 1, medium: 1, large: 2 } },
    { id: 'iced-lemonade', name: 'Iced Lemonade', scoops: { small: 1, medium: 1, large: 2 } },
    { id: 'coffee-chiller', name: 'Coffee Chiller', scoops: { small: 1, medium: 1, large: 2 } },
    { id: 'smoothies', name: 'Smoothies', scoops: { small: 1, medium: 1, large: 2 } },
    { id: 'chai-chiller', name: 'Chai Chiller', scoops: { small: 1, medium: 1, large: 2 } },
    { id: 'matcha-chiller', name: 'Matcha Chiller', scoops: { small: 1, medium: 1, large: 2 } },
    { id: 'lemonade-chiller', name: 'Lemonade Chiller', scoops: { small: 1, medium: 1, large: 2 } },
    { id: 'hot-tea', name: 'Hot Tea', scoops: { small: 1, medium: 1, large: 1 } },
    { id: 'iced-tea', name: 'Iced Tea', scoops: { small: 1, medium: 2, large: 3 } },
    { id: 'sf-milk-alt-mochas', name: 'S.F. &/or Milk Alt. Mochas', scoops: { small: 1, medium: 2, large: 2 } },
    { id: 'sf-7-energy-chiller', name: 'S.F. 7 Energy Chiller', scoops: { small: 2, medium: 3, large: 4 } },
    { id: 'shakes', name: 'Shakes', scoops: { small: 2, medium: 3, large: 4 } },
    { id: 'flavored-water', name: 'Flavored Water', scoops: { small: 1, medium: 2, large: 3 } },
    { id: 'cream-scoops', name: 'Cream Scoops', scoops: { small: 1, medium: 2, large: 2 } }
  ],

  FILL_LINES: {
    iced: { kids: 5, small: 8, medium: 12, large: 16 },
    hotEspresso: { kids: 6, small: 8, medium: 10, large: 12 },
    hotNonEspresso: { kids: 8, small: 10, medium: 14, large: 18 }
  },

  TEMPS: {
    kids: '110-120°F',
    drinkable: '140-150°F',
    regular: '160-170°F',
    extraHot: '175-180°F',
    burnt: '181°F+'
  },

  SHOT: { window: '17-27 seconds', perfect: 22 },

  NOTES: {
    kidsScoop: 'All Kids = 1 scoop · 1 scoop = 1 oz',
    lightIce: 'Light Ice = +4 oz · No Ice = Fill to the top'
  },

  DRINKS: [
    { id: 'blondie', name: 'Blondie', cat: 'signature', mix: 'Smooth Mix', flavors: 'Caramel, Vanilla', scoopCat: 'original-breves', fill: 'hotEspresso', top: 'whip', color: '#f5e6c8' },
    { id: 'sweet-salty', name: 'Sweet & Salty', cat: 'signature', mix: 'Smooth Mix', flavors: 'Salted Caramel, White Chocolate', scoopCat: 'original-breves', fill: 'hotEspresso', top: 'whip', color: '#e8d5b7' },
    { id: 'cinnamon-roll', name: 'Cinnamon Roll', cat: 'signature', mix: 'Smooth Mix', flavors: 'Brown Sugar Cinnamon, White Chocolate', scoopCat: 'original-breves', fill: 'hotEspresso', top: 'whip', color: '#d4a574' },
    { id: 'brunette', name: 'Brunette', cat: 'signature', mix: 'Mocha Mix', flavors: 'Caramel, Hazelnut', scoopCat: 'original-mochas', fill: 'hotEspresso', top: 'whip', color: '#5c3a28' },
    { id: 'banana-bread', name: 'Banana Bread', cat: 'signature', mix: 'Mocha Mix', flavors: 'Banana, Hazelnut', scoopCat: 'original-mochas', fill: 'hotEspresso', top: 'whip', color: '#8b6914' },
    { id: 'smooth-7', name: 'Smooth 7', cat: 'signature', mix: 'Smooth Mix', flavors: 'Irish Cream, White Chocolate', scoopCat: 'original-breves', fill: 'hotEspresso', top: 'whip-clover', color: '#f0e6d8' },
    { id: 'cookie-butter', name: 'Cookie Butter', cat: 'signature', mix: 'Smooth Mix', flavors: 'White Chocolate, Toasted Marshmallow, Hazelnut', scoopCat: 'original-breves', fill: 'hotEspresso', top: 'whip-cookie', color: '#c4956a' },
    { id: 'latte', name: 'Latte', cat: 'classic', mix: '', flavors: 'Hot or iced', scoopCat: 'classics', fill: 'hotEspresso', top: 'straw', color: '#e8d5b7' },
    { id: 'mocha', name: 'Mocha', cat: 'classic', mix: '', flavors: 'Whip + chocolate drizzle', scoopCat: 'classics', fill: 'hotEspresso', top: 'whip-drizzle', color: '#5c3a28' },
    { id: 'macchiato', name: 'Macchiato', cat: 'classic', mix: '', flavors: 'Caramel layered', scoopCat: 'classics', fill: 'hotEspresso', top: 'caramel-layer', color: '#f5efe0' },
    { id: 'house-blend', name: 'House Blend', cat: 'classic', mix: '', flavors: 'Hot', scoopCat: 'classics', fill: 'hotEspresso', top: 'hot', color: '#e10600', face: false },
    { id: 'chai-latte', name: 'Chai Latte', cat: 'classic', mix: '', flavors: 'Spiced', scoopCat: 'classics', fill: 'hotEspresso', top: 'straw', color: '#d4a574' },
    { id: 'matcha-latte', name: 'Matcha Latte', cat: 'classic', mix: '', flavors: 'Green tea', scoopCat: 'classics', fill: 'hotEspresso', top: 'straw', color: '#7cb342' },
    { id: 'cocoa', name: 'Cocoa', cat: 'classic', mix: '', flavors: 'Hot', scoopCat: 'classics', fill: 'hotNonEspresso', top: 'hot', color: '#5c3a28', face: false },
    { id: 'cold-brew', name: 'Cold Brew', cat: 'classic', mix: '', flavors: 'Black, over ice', scoopCat: 'classics', fill: 'iced', top: 'straw', color: '#2c1810' },
    { id: '7-fizz-chiller', name: '7 Fizz Chiller', cat: 'chiller', mix: '', flavors: 'Blended', scoopCat: '7-fizz-chiller', fill: 'iced', top: 'straw', color: '#f48fb1' },
    { id: 'tea-chiller', name: 'Tea Chiller', cat: 'chiller', mix: '', flavors: 'Blended', scoopCat: 'tea-chiller', fill: 'iced', top: 'straw', color: '#ffb74d' },
    { id: '7-energy-chiller', name: '7 Energy Chiller', cat: 'chiller', mix: '', flavors: 'Blended', scoopCat: '7-energy-chiller', fill: 'iced', top: 'straw', color: '#42a5f5' },
    { id: 'special-7s', name: "Special 7's", cat: 'chiller', mix: '', flavors: 'Hand blended coffee chiller', scoopCat: 'special-7s', fill: 'iced', top: 'whip', color: '#a1887f' },
    { id: '7-fizz', name: '7 Fizz', cat: 'chiller', mix: '', flavors: 'Soda', scoopCat: '7-fizz', fill: 'iced', top: 'straw', color: '#ef5350' },
    { id: 'lemon-freeze', name: 'Lemon Freeze', cat: 'chiller', mix: '', flavors: 'Blended', scoopCat: 'lemon-freeze', fill: 'iced', top: 'straw', color: '#fff59d' },
    { id: 'iced-7-energy', name: 'Iced 7 Energy', cat: 'chiller', mix: '', flavors: 'Over ice', scoopCat: 'iced-7-energy', fill: 'iced', top: 'straw', color: '#81d4fa' },
    { id: 'iced-lemonade', name: 'Iced Lemonade', cat: 'chiller', mix: '', flavors: 'Over ice', scoopCat: 'iced-lemonade', fill: 'iced', top: 'straw', color: '#fff176' },
    { id: 'coffee-chiller', name: 'Coffee Chiller', cat: 'chiller', mix: '', flavors: 'Blended', scoopCat: 'coffee-chiller', fill: 'iced', top: 'straw', color: '#8d6e63' },
    { id: 'smoothies', name: 'Smoothies', cat: 'chiller', mix: '', flavors: 'Blended fruit', scoopCat: 'smoothies', fill: 'iced', top: 'straw', color: '#f48fb1' },
    { id: 'chai-chiller', name: 'Chai Chiller', cat: 'chiller', mix: '', flavors: 'Blended', scoopCat: 'chai-chiller', fill: 'iced', top: 'straw', color: '#bcaaa4' },
    { id: 'matcha-chiller', name: 'Matcha Chiller', cat: 'chiller', mix: '', flavors: 'Blended', scoopCat: 'matcha-chiller', fill: 'iced', top: 'straw', color: '#aed581' },
    { id: 'lemonade-chiller', name: 'Lemonade Chiller', cat: 'chiller', mix: '', flavors: 'Blended', scoopCat: 'lemonade-chiller', fill: 'iced', top: 'straw', color: '#ffee58' },
    { id: 'hot-tea', name: 'Hot Tea', cat: 'chiller', mix: '', flavors: 'Hot', scoopCat: 'hot-tea', fill: 'hotNonEspresso', top: 'hot', color: '#e10600', face: false },
    { id: 'iced-tea', name: 'Iced Tea', cat: 'chiller', mix: '', flavors: 'Over ice', scoopCat: 'iced-tea', fill: 'iced', top: 'straw', color: '#d7ccc8' },
    { id: 'sf-mocha', name: 'S.F. Mocha', cat: 'chiller', mix: '', flavors: 'Sugar free', scoopCat: 'sf-milk-alt-mochas', fill: 'hotEspresso', top: 'straw', color: '#5c3a28' },
    { id: 'shakes', name: 'Shakes', cat: 'chiller', mix: '', flavors: 'Blended', scoopCat: 'shakes', fill: 'iced', top: 'whip', color: '#f8bbd0' },
    { id: 'flavored-water', name: 'Flavored Water', cat: 'chiller', mix: '', flavors: '', scoopCat: 'flavored-water', fill: 'iced', top: 'straw', color: '#b3e5fc' },
    { id: 'cream', name: 'Cream', cat: 'chiller', mix: '', flavors: '', scoopCat: 'cream-scoops', fill: 'iced', top: 'whip', color: '#fffde7' }
  ],

  CUSTOMERS: [
    { id: 'avery', name: 'Avery', hair: '#c4956a', skin: '#f5d0b0', shirt: '#9e9e9e' },
    { id: 'marcus', name: 'Marcus', hair: '#1a1a1a', skin: '#5c4033', shirt: '#1565c0', beard: true },
    { id: 'priya', name: 'Priya', hair: '#1a1a1a', skin: '#c68642', shirt: '#f9a825' },
    { id: 'tomas', name: 'Tomás', hair: '#3e2723', skin: '#d4a574', shirt: '#e53935' },
    { id: 'hana', name: 'Hana', hair: '#26a69a', skin: '#f5d0b0', shirt: '#26a69a', hijab: true },
    { id: 'gus', name: 'Gus', hair: '#f5f5f5', skin: '#f5d0b0', shirt: '#43a047', mustache: true },
    { id: 'jordan', name: 'Jordan', hair: '#1a1a1a', skin: '#5c4033', shirt: '#7b1fa2', headphones: true },
    { id: 'mei', name: 'Mei', hair: '#1a1a1a', skin: '#f5d0b0', shirt: '#1a237e' },
    { id: 'dre', name: 'Dre', hair: '#3e2723', skin: '#5c4033', shirt: '#ef6c00', shades: true },
    { id: 'cole', name: 'Cole', hair: '#fbc02d', skin: '#d4a574', shirt: '#ff6f00', hardhat: true },
    { id: 'rosa', name: 'Rosa', hair: '#9e9e9e', skin: '#f5d0b0', shirt: '#1565c0', glasses: true },
    { id: 'sam', name: 'Sam', hair: '#26c6da', skin: '#f5d0b0', shirt: '#212121' },
    { id: 'elena', name: 'Elena', hair: '#5d4037', skin: '#d4a574', shirt: '#0288d1' },
    { id: 'kwame', name: 'Kwame', hair: '#1a1a1a', skin: '#3e2723', shirt: '#fbc02d', glasses: true },
    { id: 'lily', name: 'Lily', hair: '#fbc02d', skin: '#f5d0b0', shirt: '#f48fb1', pigtails: true },
    { id: 'hiro', name: 'Hiro', hair: '#1a1a1a', skin: '#f5d0b0', shirt: '#1a237e', glasses: true },
    { id: 'nora', name: 'Nora', hair: '#bdbdbd', skin: '#f5d0b0', shirt: '#7b1fa2', glasses: true },
    { id: 'mateo', name: 'Mateo', hair: '#e53935', skin: '#5c4033', shirt: '#212121' },
    { id: 'zoe', name: 'Zoe', hair: '#1a1a1a', skin: '#5c4033', shirt: '#7b1fa2', buns: true },
    { id: 'walt', name: 'Walt', hair: '#9e9e9e', skin: '#f5d0b0', shirt: '#5d4037', glasses: true, bald: true },
    { id: 'imani', name: 'Imani', hair: '#3e2723', skin: '#5c4033', shirt: '#1565c0' },
    { id: 'finn', name: 'Finn', hair: '#ef6c00', skin: '#f5d0b0', shirt: '#43a047', glasses: true },
    { id: 'luz', name: 'Luz', hair: '#1a1a1a', skin: '#d4a574', shirt: '#2e7d32' },
    { id: 'ravi', name: 'Ravi', hair: '#1a1a1a', skin: '#5c4033', shirt: '#ef6c00' }
  ],

  ORDER_LINES: [
    'Can I get a {size} {drink}?',
    'One {size} {drink}, please.',
    'I\'ll take a {size} {drink}.',
    '{size} {drink} — thanks!',
    'Just a {size} {drink} for me.'
  ],

  RANKS: [
    { id: 'new-bean', name: 'New Bean', minXp: 0 },
    { id: 'cup-rookie', name: 'Cup Rookie', minXp: 50 },
    { id: 'scoop-scout', name: 'Scoop Scout', minXp: 150 },
    { id: 'steam-pro', name: 'Steam Pro', minXp: 300 },
    { id: 'shot-master', name: 'Shot Master', minXp: 500 },
    { id: 'legend', name: 'Legend', minXp: 800 }
  ]
};
