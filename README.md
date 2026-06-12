# Testimony with Domonique — Fresh Static Vercel Build

This is a no-build Vercel-ready version of the Testimony with Domonique app.

## Why this version deploys easier

- No Node.js build step
- No npm install required
- No Next.js compiler
- No database required
- No environment variables required
- No Prisma, bcrypt, or dependency conflicts

## Vercel settings

Use these settings when importing the GitHub repo into Vercel:

- Framework Preset: Other
- Build Command: leave empty
- Output Directory: .
- Install Command: leave empty
- Environment Variables: none required

## Files

- index.html: app page
- styles.css: design system
- app.js: local testimony/prayer vault behavior
- manifest.webmanifest: PWA metadata
- assets/icon.svg: app icon
- vercel.json: clean URL and security headers

## Next upgrades

After this deploys cleanly, add:

1. Real user accounts
2. Database storage
3. Moderated public testimony wall
4. Domonique AI testimony assistant
5. Admin dashboard
6. Church/community groups
