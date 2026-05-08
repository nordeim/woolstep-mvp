Based on your `package.json`, this is a **Vite-powered React 19 + TypeScript Single Page Application (SPA)** using TanStack Router for client-side routing and Tailwind CSS v4 for styling.

Here’s a meticulous breakdown of how to serve it, depending on your goal:

---
### 🔹 1. Local Development (For You & Your Team)
```bash
npm run dev   # or yarn dev / pnpm dev / bun dev
```
- **What it does:** Starts Vite's development server with Hot Module Replacement (HMR).
- **Default URL:** `http://localhost:5173`
- **Use case:** Active coding, debugging, and testing. Not optimized for performance or security.
- **Note:** Do not expose this to end users. It includes dev tools, unminified code, and source maps.

---
### 🔹 2. Local Production Preview (Testing the Final Build)
```bash
npm run build    # Compiles TS + bundles assets → outputs to /dist
npm run preview  # Serves the /dist folder locally
```
- **Default URL:** `http://localhost:4173`
- **Use case:** Verify that the production build works correctly (routing, assets, minification, env vars).
- ⚠️ **Vite explicitly warns:** `vite preview` is **not** designed for production. It lacks security headers, compression, and proper caching.

---
### 🔹 3. Production Serving (For End Users)
Since this is a **static SPA**, you do **not** need a Node.js server in production. You only need to:
1. Run `npm run build`
2. Deploy the contents of the `dist/` directory to any static web host or CDN.

#### ✅ Step-by-Step Production Deployment
```bash
# 1. Install dependencies (if fresh clone)
npm ci

# 2. Type-check & build
npm run build

# 3. Deploy the `dist/` folder
```

#### 🌐 Recommended Hosting Platforms
| Platform | Deployment Method | Auto SPA Routing? |
|----------|-------------------|-------------------|
| **Vercel** | `vercel deploy` or Git integration | ✅ Yes (zero config) |
| **Netlify** | Drag & drop `dist/` or Git integration | ✅ Yes (zero config) |
| **Cloudflare Pages** | Git integration or `wrangler pages deploy dist` | ✅ Yes |
| **GitHub Pages** | GitHub Actions or `gh-pages` package | ⚠️ Requires base path config |
| **AWS S3 + CloudFront** | Upload `dist/` to S3, set CloudFront origin | ⚠️ Requires custom error response → `index.html` |
| **Nginx / Apache** | Copy `dist/` to web root | ⚠️ Requires rewrite rules (see below) |

---
### 🚨 Critical: SPA Routing Fallback Configuration
TanStack Router handles routing **client-side**. If a user navigates directly to `/dashboard` or refreshes that page, the server will look for a `/dashboard.html` file and return `404` unless configured otherwise.

**You must tell your server to fallback to `index.html` for all non-asset routes.**

#### Platform-Specific Fallback Rules
**Netlify** (`public/_redirects` or `netlify.toml`):
```
/*  /index.html  200
```

**Vercel** (`vercel.json`):
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Nginx** (`nginx.conf`):
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Apache** (`.htaccess` in `dist/`):
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Cloudflare Pages / Vercel / Netlify** handle this automatically. No extra config needed.

---
### 🔍 Important Production Gotchas
1. **Environment Variables:** Vite only injects variables prefixed with `VITE_` at **build time**. Set them before running `npm run build`. They are baked into the static JS files and cannot be changed at runtime without rebuilding.
2. **Base Path:** If deploying to a subdirectory (e.g., `https://example.com/app/`), set `base: '/app/'` in `vite.config.ts` before building.
3. **Node.js Version:** Vite 8 + React 19 + TypeScript 5.8 require **Node.js 18+** (20+ recommended). Ensure your CI/CD or build environment matches.
4. **Caching Strategy:** 
   - `index.html`: `Cache-Control: no-cache`
   - `assets/` (JS/CSS/images): `Cache-Control: public, max-age=31536000, immutable`
   (Most modern platforms handle this automatically.)

---
### ✅ Quick Recommendation
For fastest, zero-config production deployment:
1. Push your repo to GitHub
2. Connect it to **Vercel** or **Netlify**
3. Set build command to `npm run build`
4. Set output directory to `dist`
5. Add any `VITE_*` environment variables in the platform dashboard
6. Deploy. Routing, compression, and CDN caching will work out of the box.

