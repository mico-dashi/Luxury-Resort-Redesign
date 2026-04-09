# Netlify Deployment TODO for Luxury Resort Redesign

**Target:** Deploy static React site at `./Luxury Resort Redesign/` to Netlify via GitHub CI/CD.

## 1. [x] Create netlify.toml (build: npm ci && npm run build, publish: dist)

## 2. [x] Git commit netlify.toml & push (https://github.com/mico-dashi/Luxury-Resort-Redesign)
`cd \"Luxury Resort Redesign\" && git init && git add . && git commit -m \"Initial commit: Luxury Resort Vite React app\"`

## 3. [ ] Create GitHub repo
- Go to github.com/new, name: `luxury-resort-redesign`, public.
- Add remote & push: `cd \"Luxury Resort Redesign\" && git remote add origin https://github.com/YOUR_USERNAME/luxury-resort-redesign.git && git branch -M main && git push -u origin main`

## 4. [ ] Deploy to Netlify
- netlify.com > Add new site > Import from Git > GitHub > Authorize > Select repo.
- Settings: Build command `npm ci && npm run build`, Publish dir `dist`.
- Deploy site!

## 5. [ ] Test
- Visit site URL.
- Interact with counter, check assets/icons load.
- `start \"Luxury Resort Redesign/dist/index.html` locally.

## 6. [ ] Customize
- Edit `src/App.tsx` for resort content.
- `git add . && git commit -m \"Update content\" && git push` → auto-deploys.

Replace YOUR_USERNAME with your GitHub username.
