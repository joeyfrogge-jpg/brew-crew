/* Brew Crew recipe data */
window.BREW = {
  SCOOP_CATEGORIES: [
    { id: 'classics', name: 'Classics', includes: 'Lattes, Mochas, Breves, Macchiatos, House Blends, Chai, Matcha, Cocoas, Cold Brew', scoops: { small: 1, medium: 1, large: 1 } },
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
    iced: { name: 'Iced Drinks', oz: { kids: 5, small: 8, medium: 12, large: 16 } },
    hotEspresso: { name: 'Hot Espresso Drinks', oz: { kids: 6, small: 8, medium: 10, large: 12 } },
    hotNonEspresso: { name: 'Hot Non-Espresso', includes: 'Cocoas, Matchas, Chais, Steamers', oz: { kids: 8, small: 10, medium: 14, large: 18 } }
  },
  TEMPERATURES: {
    kids: { name: 'Kids', min: 110, max: 120 },
    drinkable: { name: 'Drinkable', min: 140, max: 150 },
    regular: { name: 'Regular', min: 160, max: 170 },
    extraHot: { name: 'Extra Hot', min: 175, max: 180 },
    burnt: { name: 'Burnt', min: 181, max: null }
  },
  DRINKS: [
    { id: 'blondie', name: 'Blondie', group: 'signature', scoopCategory: 'original-breves', liquid: '#d9a86c', recipe: { flavors: ['Caramel', 'Vanilla'], milk: 'Smooth Mix' }, fillCategory: 'hotEspresso' },
    { id: 'sweet-salty', name: 'Sweet & Salty', group: 'signature', scoopCategory: 'original-breves', liquid: '#c98c55', recipe: { flavors: ['Salted Caramel', 'White Chocolate'], milk: 'Smooth Mix' }, fillCategory: 'hotEspresso' },
    { id: 'cinnamon-roll', name: 'Cinnamon Roll', group: 'signature', scoopCategory: 'original-breves', liquid: '#b97a4a', recipe: { flavors: ['Brown Sugar Cinnamon', 'White Chocolate'], milk: 'Smooth Mix' }, fillCategory: 'hotEspresso' },
    { id: 'brunette', name: 'Brunette', group: 'signature', scoopCategory: 'original-mochas', liquid: '#6e4428', recipe: { flavors: ['Caramel', 'Hazelnut'], milk: 'Mocha Mix' }, fillCategory: 'hotEspresso' },
    { id: 'banana-bread', name: 'Banana Bread', group: 'signature', scoopCategory: 'original-mochas', liquid: '#8a5a35', recipe: { flavors: ['Banana', 'Hazelnut'], milk: 'Mocha Mix' }, fillCategory: 'hotEspresso' },
    { id: 'smooth-7', name: 'Smooth 7', group: 'signature', scoopCategory: 'original-breves', liquid: '#d6b98a', recipe: { flavors: ['Irish Cream', 'White Chocolate'], milk: 'Smooth Mix' }, fillCategory: 'hotEspresso' },
    { id: 'cookie-butter', name: 'Cookie Butter', group: 'signature', scoopCategory: 'original-breves', liquid: '#c69563', recipe: { flavors: ['White Chocolate', 'Toasted Marshmallow', 'Hazelnut'], milk: 'Smooth Mix' }, fillCategory: 'hotEspresso' },
    { id: 'latte', name: 'Latte', group: 'classics', scoopCategory: 'classics', liquid: '#c9a27a', fillCategory: 'hotEspresso' },
    { id: 'mocha', name: 'Mocha', group: 'classics', scoopCategory: 'classics', liquid: '#7b4d30', fillCategory: 'hotEspresso' },
    { id: 'breve', name: 'Breve', group: 'classics', scoopCategory: 'classics', liquid: '#e8d5b5', fillCategory: 'hotEspresso' },
    { id: 'macchiato', name: 'Macchiato', group: 'classics', scoopCategory: 'classics', liquid: '#a67c52', fillCategory: 'hotEspresso' },
    { id: 'house-blend', name: 'House Blend', group: 'classics', scoopCategory: 'classics', liquid: '#6b4423', fillCategory: 'hotEspresso' },
    { id: 'chai-latte', name: 'Chai Latte', group: 'classics', scoopCategory: 'classics', liquid: '#c4a35a', fillCategory: 'hotNonEspresso' },
    { id: 'matcha-latte', name: 'Matcha Latte', group: 'classics', scoopCategory: 'classics', liquid: '#7d9b5e', fillCategory: 'hotNonEspresso' },
    { id: 'cocoa', name: 'Cocoa', group: 'classics', scoopCategory: 'classics', liquid: '#5c3a21', fillCategory: 'hotNonEspresso' },
    { id: 'cold-brew', name: 'Cold Brew', group: 'classics', scoopCategory: 'classics', liquid: '#3d2b1f', fillCategory: 'iced' },
    { id: 'lemon-freeze', name: 'Lemon Freeze', group: 'chillers', scoopCategory: 'lemon-freeze', liquid: '#f5e06b', fillCategory: 'iced' },
    { id: '7-fizz', name: '7 Fizz', group: 'chillers', scoopCategory: '7-fizz', liquid: '#7ec8e3', fillCategory: 'iced' },
    { id: '7-fizz-chiller', name: '7 Fizz Chiller', group: 'chillers', scoopCategory: '7-fizz-chiller', liquid: '#5eb0d0', fillCategory: 'iced' },
    { id: 'coffee-chiller', name: 'Coffee Chiller', group: 'chillers', scoopCategory: 'coffee-chiller', liquid: '#8b6914', fillCategory: 'iced' },
    { id: 'iced-7-energy', name: 'Iced 7 Energy', group: 'chillers', scoopCategory: 'iced-7-energy', liquid: '#e85d04', fillCategory: 'iced' },
    { id: 'iced-lemonade', name: 'Iced Lemonade', group: 'chillers', scoopCategory: 'iced-lemonade', liquid: '#f4d35e', fillCategory: 'iced' }
  ],
  SIZES: ['kids', 'small', 'medium', 'large'],
  SIZE_LABELS: { kids: 'Kids', small: 'Small', medium: 'Medium', large: 'Large' }
};
window.BREW.getScoop = function (catId, size) {
  if (size === 'kids') return 1;
  var c = this.SCOOP_CATEGORIES.find(function (x) { return x.id === catId; });
  return c ? c.scoops[size] : 1;
};
window.BREW.formatTemp = function (key) {
  var t = this.TEMPERATURES[key];
  return t.max == null ? t.min + '°F+' : t.min + '–' + t.max + '°F';
};
