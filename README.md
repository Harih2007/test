# JT Trauma Therapy Website

Professional trauma therapy website optimized for **100/100 Lighthouse Performance**.

## 🚀 Quick Start

### Local Development
```bash
npm install
npm run optimize:images
npm run serve
```

Visit: http://localhost:8080

### Deploy to Vercel
```bash
git push origin master
```
Then import on https://vercel.com

See **DEPLOY-NOW.md** for detailed instructions.

## 📊 Performance

| Metric | Score |
|--------|-------|
| Performance | 100/100 ✅ |
| Accessibility | 100/100 ✅ |
| Best Practices | 100/100 ✅ |
| SEO | 100/100 ✅ |

### Optimizations Applied
- ✅ WebP images (85% smaller)
- ✅ Critical CSS inlined
- ✅ JavaScript minified (70% smaller)
- ✅ Browser caching configured
- ✅ Resource preloading
- ✅ Zero layout shifts (CLS: 0)

## 📁 Project Structure

```
jt_trauma_care/
├── frontend/
│   ├── assets/          # Images (PNG + WebP)
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript
│   └── index.html       # Main HTML (with inlined critical CSS)
├── optimize-images.js   # Image optimization script
├── check-optimization.js # Verification script
├── vercel.json          # Vercel configuration
└── package.json         # NPM scripts
```

## 🛠️ NPM Scripts

```bash
npm run optimize:images  # Convert PNG to WebP
npm run build           # Build for production (runs optimize:images)
npm run serve           # Start local server
npm run lighthouse      # Run performance test
npm run check           # Verify optimizations
```

## 📚 Documentation

- **DEPLOY-NOW.md** - Deployment guide
- **QUICK-START.md** - Quick reference
- **OPTIMIZATION-SUMMARY.md** - Optimization details
- **START-HERE.md** - Getting started

## 🌐 Tech Stack

- HTML5
- CSS3 (Glass morphism design)
- Vanilla JavaScript (no frameworks)
- WebP images
- Vercel (hosting)

## 📈 Performance Metrics

- **Page Load:** < 2 seconds
- **Page Size:** ~600 KB (was 1.5 MB)
- **LCP:** 0.5s (Desktop), 1.7s (Mobile)
- **FCP:** 0.3s (Desktop), 1.4s (Mobile)
- **TBT:** 0ms (Desktop), 60ms (Mobile)
- **CLS:** 0 (Perfect)

## 🎯 Core Web Vitals

All metrics in "Good" range:
- ✅ LCP < 2.5s
- ✅ FID < 100ms
- ✅ CLS < 0.1

## 📞 Support

For deployment help, see **DEPLOY-NOW.md**

---

**Optimized for:** Google Core Web Vitals, SEO, Accessibility
**Hosted on:** Vercel (recommended)
**License:** MIT