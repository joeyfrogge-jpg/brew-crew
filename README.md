# Brew Crew — Barista Training Game

Practice drink builds, learn recipes & scoop counts, quiz yourself, and train behind the bar.

**No Replit. No build step.** Pure static HTML/CSS/JS — works on GitHub Pages, Netlify, or any static host.

## Live on GitHub Pages

After enabling Pages (Settings → Pages → Deploy from branch `main` / root):

`https://joeyfrogge-jpg.github.io/brew-crew/`

## Local

Open `index.html` in a browser, or:

```bash
npx serve .
```

## Features

| Station | What it does |
|--------|----------------|
| **Home** | XP ranks (New Bean → Legend), stats, station picker |
| **Counter** | Multi-step practice orders: cup → drink → scoops + hints |
| **Recipe book** | Flashcards for signature drinks, scoops, fill lines, temps |
| **Cheat sheet** | Full reference tables |
| **Free play** | No-pressure drills |
| **Quiz** | 10 randomized questions |

Progress is saved in `localStorage` on this device.

## Files

- `index.html` — shell + router mount  
- `styles.css` — Brew Crew UI  
- `data.js` — recipes, scoops, fills, temperatures  
- `app.js` — SPA logic (home, counter, study, quiz, free play)

## License

MIT
