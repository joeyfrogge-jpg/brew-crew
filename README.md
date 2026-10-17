# Brew Crew — Barista Training Counter

Fully playable training game for 7 Brew baristas. Built from the **Scoops Test Key** and **Brewista 101 Key** (Dec 2025).

**No build step.** Pure HTML/CSS/JS. Works on GitHub Pages.

## Play live

**https://joeyfrogge-jpg.github.io/brew-crew/**

## What’s inside

| Station | What you get |
|--------|----------------|
| **Home** | XP ranks (New Bean → Bar Legend), stats, badges, Rush Mode |
| **Counter** | Random customer + **completely random drink** every ticket. 4-step build: Cup → Drink → Scoops → Serve |
| **Study** | Flashcards: signatures, scoops, fill lines, temps |
| **Drills** | Practice, Rush Mode (45s), flash decks, quiz |
| **Quiz** | 10 questions from the real keys |

### Fun extras
- Customer personalities + speech bubbles  
- Streak flames & combo XP bonuses  
- Confetti on perfect serves  
- Sound effects (Web Audio)  
- Rush Mode timer  
- Achievements (First Pour, On Fire, Key Master, Rush Survivor…)  

### Training accuracy
Every scoop count, fill line, temperature range, and signature flavor/milk mix comes from the confidential keys.  
**Every customer always gets a fully random drink** (size + hot/iced + ice/temp prefs + drink type).

## Local

```bash
npx serve .
# or open index.html
```

## Files

- `index.html` — UI shell  
- `styles.css` — Brew Crew UI  
- `data.js` — recipes, scoops, fills, customers, random order generator  
- `app.js` — game logic  

Progress saves in `localStorage` on this device.

## License

MIT
