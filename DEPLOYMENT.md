# Deploy to GitHub Pages

To fix the 404 error and deploy your application successfully, follow these steps.

## Status: Configuration Updated

I have already updated your project configuration:
1.  **`vite.config.ts`**: Added `base: "/wealth-compass/"` so assets load correctly.
2.  **`src/App.tsx`**: Added `basename="/wealth-compass"` to the Router so navigation works.
3.  **`package.json`**: Added `homepage` and `deploy` scripts.

## Next Steps: How to Deploy

You need to install the deployment tool and run the deploy command.

### 1. Install `gh-pages`
Open your terminal and run:

```bash
npm install gh-pages --save-dev
```

### 2. Deploy the App
Run the deploy script. This will build your app and push it to a `gh-pages` branch on GitHub.

```bash
npm run deploy
```

### 3. Verify on GitHub
1.  Go to your GitHub repository > **Settings** > **Pages**.
2.  Ensure **Source** is set to `Deploy from a branch`.
3.  Ensure **Branch** is set to `gh-pages` / `(root)`.
4.  Visit your site at: `https://libriperilcambiamento.github.io/wealth-compass/`

> **Note**: It may take a few minutes for GitHub to update the site after deployment.
