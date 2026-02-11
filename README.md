# AI Study ∞ Website Deployment Guide

This folder contains the complete source code for the "AI Study ∞" static website.

## 📁 File Structure

```
/
├── index.html      # Main Landing Page
├── style.css       # Styles (Colors, Layout, Responsive)
├── script.js       # Interactivity (Menu, Scroll)
├── privacy.html    # Privacy Policy
├── law.html        # Specified Commercial Transactions Law
├── thanks.html     # Thank You Page
├── robots.txt      # SEO bots instruction
└── sitemap.xml     # SEO sitemap
```

## 🚀 How to Run Locally

You can simply open `index.html` in your browser to view the site, but for the best experience (and to test forms/links properly), use a local server.

If you have VS Code:
1. Install the "Live Server" extension.
2. Right-click `index.html` and select "Open with Live Server".

## 📝 Required Edits Before Publishing

Search for `PLACEHOLDER` in the files and replace them with your real info:

1. **LINE Link**:
   - In `index.html`, find `https://line.me/R/ti/p/PLACEHOLDER` and replace with your actual LINE Add Friend URL.

2. **Form Destination**:
   - In `index.html`, find `https://formspree.io/f/PLACEHOLDER` and replace with your Formspree endpoint (or Google Form URL).

3. **Legal Info**:
   - In `law.html`, replace `[代表者名]`, `[所在地]`, `[電話番号]` with your business details.
   - In `privacy.html`, replace the email address.

4. **SEO & Tracking**:
   - In `index.html`, uncomment the Google Analytics tag and add your ID (`G-XXXXXXXXXX`).
   - Update `meta property="og:image"` with a real image URL after hosting.

## 🌍 How to Deploy

### Option A: Vercel (Recommended)
1. Push this folder to GitHub.
2. Go to Vercel.com -> "Add New Project".
3. Select your repository.
4. Click "Deploy". It works automatically.

### Option B: Netlify
1. Drag and drop this folder into the Netlify dashboard "Sites" area.

### Option C: GitHub Pages
1. Push to GitHub.
2. Go to Repo Settings -> Pages -> Select "main" branch.
