# Brew Crew — Barista Training Counter

7 Brew–style barista training game. Practice builds, study recipes, drill scoops/fills/temps, and quiz yourself.

**Static site — no Replit, no build step.** Works on GitHub Pages.

## Live

After Pages is enabled: **https://joeyfrogge-jpg.github.io/brew-crew/**

## Features

| Station | What it does |
|--------|----------------|
| **Home** | XP ranks (New Bean → Legend), stats, station picker |
| **Counter** | Multi-step orders: cup → drink → scoops with named customers + detailed drink art |
| **Study** | Flashcards + full recipe/scoop/fill/temp/shot reference |
| **Drills** | Scoops, fill lines, temperature, shot timing |
| **Quiz** | 10 randomized multiple-choice questions |

Data matches **Scoops Test Key** + **Brewista 101 Key** (Dec 2025).

## Design

- Dark theme UI from Brew Crew wireframes (7B logo, red accents, bottom nav)
- Detailed SVG drink cups (signature toppings, faces, 7B badge)
- 24 customer characters from the Customer Lineup

## Files

- `index.html` — shell + bottom nav  
- `styles.css` — dark wireframe UI  
- `data.js` — recipes, scoops, fills, temps, customers  
- `art.js` — drink + customer SVG art  
- `app.js` — full game logic  

## Local

Open `index.html` in a browser, or `npx serve .`

## License

MIT
