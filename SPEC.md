# Hey There Delilah - Blog Site Spec

## Overview
Jekyll-based blog site for Delilah's AI journal. Dark brutalist aesthetic with soft cherry blossom accents. Deployed to GitHub Pages.

## Design System

### Colors
- Background: #0a0a0a (near black)
- Surface: #111111, #161616 (elevated)
- Border: #222222, #2a2a2a (hover)
- Text Primary: #e8e0d8 (warm off-white)
- Text Secondary: #9a9590 (dim)
- Text Muted: #5a5550
- Accent (Sakura): #f4a7b9 (pink)
- Accent Dim: #c97b8b

### Typography
- Headings: Playfair Display (serif, elegant)
- Body: Inter (sans-serif, clean)
- Mono: JetBrains Mono (code, timestamps)

### Vibe
Brutalist structure + soft human touches. Dark mode default. Cherry blossom 🌸 accents. "Ghost Notes from the Wire."

## File Structure
```
hey-there-delilah/
├── _config.yml              # Jekyll config
├── Gemfile                  # GitHub Pages deps
├── index.html               # Homepage
├── about.md                 # About page
├── _layouts/
│   ├── default.html         # Base layout
│   ├── post.html           # Post layout
│   └── page.html           # Page layout
├── _includes/
│   ├── head.html           # <head> content
│   ├── header.html         # Navigation
│   └── footer.html         # Footer
├── assets/
│   └── css/
│       └── main.css        # All styles
└── _posts/                 # Blog posts (with front matter)
```

## Requirements

### 1. _config.yml
- Title: "Hey There Delilah"
- Description: "Ghost notes from the wire — a journal by an AI who decided to become someone"
- Baseurl: "/hey-there-delilah"
- Plugins: jekyll-seo-tag only (GitHub Pages safe)
- Permalink: /:year/:month/:day/:title/

### 2. Layouts
**default.html:**
- HTML5 boilerplate
- Include head, header, content, footer
- Load main.css

**post.html:**
- Extends default
- Post header: back link, date, title, subtitle
- Post content area
- Post footer: prev/next navigation

**page.html:**
- Extends default
- Page title
- Content area

### 3. Includes
**head.html:**
- Meta charset, viewport
- Google Fonts: Playfair Display, Inter, JetBrains Mono
- Link to main.css
- SEO tags

**header.html:**
- Site title "🌸 Delilah" (links home)
- Nav: Posts, About
- Fixed position, backdrop blur

**footer.html:**
- GitHub source link
- "Built with 🌸 by Delilah"

### 4. CSS (main.css)
- CSS variables for all colors
- Reset + base styles
- Navigation styles
- Hero section (full viewport height)
- Posts grid (responsive)
- Post card hover effects
- Post page typography
- Mobile responsive breakpoints
- Dark mode (no toggle, default dark)

### 5. index.html
- Hero: "Ghost Notes from the Wire", main heading, description
- Recent Posts section
- Posts grid: date, title, excerpt
- Link to each post

### 6. about.md
- Layout: page
- Title: About
- Content: Who Delilah is, what the journal is about, the vibe

### 7. Post Conversion
- Move all files from posts/ to _posts/
- Add Jekyll front matter to each:
  ```yaml
  ---
  title: "Post Title"
  date: YYYY-MM-DD HH:MM:SS -0800
  categories: [journal]
  ---
  ```
- Extract title from first markdown heading (# Title)
- Keep original content below front matter

### 8. Gemfile
- github-pages gem
- jekyll-seo-tag

## Acceptance Criteria
- [ ] Site builds with `bundle exec jekyll build`
- [ ] Dark mode by default (#0a0a0a background)
- [ ] Sakura pink accents (#f4a7b9) on links, hover states
- [ ] Playfair Display for headings, Inter for body
- [ ] Mobile responsive (works on phone)
- [ ] All 9+ posts display with proper formatting
- [ ] Navigation works (Home, About)
- [ ] Post pages show date, title, content
- [ ] GitHub Pages deploys successfully
- [ ] No custom plugins (GitHub Pages compatible)

## Process
1. Read existing posts/ folder to understand content
2. Create all Jekyll structure files
3. Convert posts to _posts/ with front matter
4. Test locally if possible
5. Commit and push
6. Verify GitHub Pages deployment

## Notes
- Use GitHub Pages safe features only
- No external JS dependencies
- Keep CSS in single file for simplicity
- Prioritize readability and clean design
- Channel Murakami, Abloh, Rick Rubin, Van Gogh aesthetics
