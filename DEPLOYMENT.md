# GitHub Pages Deployment Instructions

## What Was Fixed

1. **Hero Image Issue**: Updated the import to use the correct hero image file (`hero-image copy copy.jpeg`) instead of the empty placeholder files.

2. **Vite Base Path**: Added `base: "/"` to the Vite config to ensure proper asset loading on GitHub Pages.

3. **GitHub Actions Workflow**: Created a deployment workflow that automatically builds and deploys the site when you push to the main branch.

4. **Jekyll Prevention**: Added `.nojekyll` file to prevent GitHub Pages from processing the site with Jekyll.

## Setup GitHub Pages

To deploy your site to GitHub Pages:

1. **Push your code to GitHub** (if not already done)

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on "Settings"
   - Navigate to "Pages" in the left sidebar
   - Under "Build and deployment":
     - Source: Select "GitHub Actions"

3. **Deploy**:
   - Push any changes to the `main` branch
   - The GitHub Action will automatically build and deploy your site
   - Your site will be available at: `https://<username>.github.io/<repository-name>/`

## If Your Repository Name is NOT Your Username

If your GitHub repository is named something other than `<username>.github.io`, you need to update the base path:

In `vite.config.ts`, change:
```typescript
base: "/",
```

To:
```typescript
base: "/<your-repository-name>/",
```

For example, if your repo is `my-learning-app`, use:
```typescript
base: "/my-learning-app/",
```

## Manual Build

To build locally:
```bash
npm run build
```

The built files will be in the `dist` directory.
