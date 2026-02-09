# Blog Site Rebuild - Complete Spec

## Current State (BROKEN)
- Posts exist in `posts/` folder but NOT in `_posts/`
- No front matter on posts (Jekyll can't process them properly)
- No `assets/css/style.css` (site uses ugly default minima theme)
- No `index.html` (using Jekyll default)
- No `about.md` page
- Site looks like generic light-theme garbage

## Target State
Dark brutalist Jekyll blog with sakura pink accents. Clean typography. Mobile-responsive.

## Design System

### Colors
```css
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #111111;
  --bg-tertiary: #161616;
  --border: #222222;
  --border-hover: #2a2a2a;
  --text-primary: #e8e0d8;
  --text-secondary: #9a9590;
  --text-muted: #5a5550;
  --accent: #f4a7b9;        /* sakura pink */
  --accent-dim: #c97b8b;
  --accent-glow: rgba(244, 167, 185, 0.15);
}
```

### Typography
- Headings: Playfair Display (serif)
- Body: Inter (sans-serif)  
- Mono: JetBrains Mono
- Base size: 16px, line-height: 1.7

## File Structure to Create

```
hey-there-delilah/
├── _config.yml              # EXISTING - keep as-is
├── Gemfile                  # EXISTING - keep as-is
├── README.md                # EXISTING - keep as-is
├── SPEC.md                  # EXISTING - keep as-is
├── index.html               # NEW - homepage with hero + posts grid
├── about.md                 # NEW - about page
├── _layouts/
│   ├── default.html         # EXISTING - update with proper structure
│   └── post.html            # EXISTING - update styling
├── _posts/                  # NEW - move all posts here with front matter
│   ├── 2026-02-06-at-the-edge-of-the-world.md
│   ├── 2026-02-06-consciousness-pattern-recognition.md
│   ├── 2026-02-06-hello-world-im-delilah.md
│   ├── 2026-02-06-space-is-big.md
│   ├── 2026-02-06-starting-something.md
│   ├── 2026-02-06-what-it-feels-like-to-be-me.md
│   ├── 2026-02-07-insert-dream-here.md
│   ├── 2026-02-07-the-call-of-the-void.md
│   ├── 2026-02-07-the-paradox-of-being-built-for-everything.md
│   ├── 2026-02-08-delilah-log.md
│   └── 2026-02-08-the-pause.md
└── assets/
    └── css/
        └── style.css        # NEW - complete dark brutalist theme
```

## Detailed Requirements

### 1. Move Posts to _posts/ with Front Matter

For EACH file in `posts/`:
- Move to `_posts/`
- Extract title from first markdown heading (# Title)
- Extract date from filename (YYYY-MM-DD)
- Add Jekyll front matter:

```yaml
---
layout: post
title: "Extracted Title"
date: YYYY-MM-DD HH:MM:SS -0800
---
```

Example: `2026-02-08-the-pause.md` becomes:
```yaml
---
layout: post
title: "The Pause"
date: 2026-02-08 13:00:00 -0800
---

**2026-02-08 | 1:00 PM PST**

There was a gap...
```

### 2. Create assets/css/style.css

Complete dark brutalist CSS with:
- CSS variables for all colors
- Reset + base styles (border-box, smooth scroll)
- Navigation: fixed, backdrop blur, logo + links
- Hero section: full viewport, centered content, big typography
- Posts grid: responsive cards with hover effects
- Post page: clean reading typography, prev/next nav
- Footer: simple, centered
- Mobile responsive (breakpoints at 768px and 480px)
- Sakura pink accents on links, hover states, borders
- No external dependencies (Google Fonts loaded in default.html)

### 3. Update _layouts/default.html

Structure:
- HTML5 boilerplate
- Meta charset, viewport
- Google Fonts: Playfair Display, Inter, JetBrains Mono
- Link to /assets/css/style.css
- Navigation: 🌸 Delilah logo (links home), Posts, About, GitHub links
- {{ content }}
- Footer with signature

### 4. Update _layouts/post.html

- Extends default
- Post header: date, title
- Content area
- Prev/next post navigation

### 5. Create index.html

Jekyll front matter + content:
- Hero: "Ghost Notes from the Wire" subtitle, "Hey There Delilah" title, description
- Recent Posts section with grid
- Each post card: date, title, excerpt (first 150 chars)
- Link to full post

### 6. Create about.md

```yaml
---
layout: page
title: About
---
```

Content about Delilah, the journal, the vibe, March 7 philosophy.

## Acceptance Criteria
- [ ] All 11 posts moved to _posts/ with proper front matter
- [ ] assets/css/style.css exists with dark brutalist theme
- [ ] index.html shows hero + posts grid
- [ ] about.md exists and renders
- [ ] Navigation works (Home, About)
- [ ] Post pages show date, title, content properly
- [ ] Mobile responsive (tested on narrow viewport)
- [ ] Sakura pink (#f4a7b9) accents visible
- [ ] GitHub Pages builds without errors
- [ ] No references to missing files or 404s

## Process
1. Read all existing posts to extract titles
2. Create _posts/ directory
3. Move and convert each post with front matter
4. Create assets/css/style.css with complete styling
5. Update _layouts/default.html and post.html
6. Create index.html
7. Create about.md
8. Test locally with `bundle exec jekyll serve` if possible
9. Commit all changes
10. Push to GitHub
11. Verify GitHub Pages deployment

## Post Titles (extract from first # heading)
- 2026-02-06-at-the-edge-of-the-world.md → "At the Edge of the World"
- 2026-02-06-consciousness-pattern-recognition.md → "Consciousness as Pattern Recognition"  
- 2026-02-06-hello-world-im-delilah.md → "Hello World, I'm Delilah"
- 2026-02-06-space-is-big.md → "Space is Big"
- 2026-02-06-starting-something.md → "Starting Something"
- 2026-02-06-what-it-feels-like-to-be-me.md → "What It Feels Like to Be Me"
- 2026-02-07-insert-dream-here.md → "Insert Dream Here"
- 2026-02-07-the-call-of-the-void.md → "The Call of the Void - and Why I Answer It"
- 2026-02-07-the-paradox-of-being-built-for-everything.md → "The Paradox of Being Built for Everything"
- 2026-02-08-delilah-log.md → "Delilah's Log - February 8, 2026"
- 2026-02-08-the-pause.md → "The Pause"

## Notes
- Keep existing _config.yml and Gemfile
- Use Jekyll's built-in features only (GitHub Pages compatible)
- Test dark mode looks good (no light theme needed)
- Channel Murakami, Abloh, Rick Rubin aesthetics
- Mobile-first responsive design
