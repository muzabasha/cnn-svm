# Deployment Guide - AI Virtual Lab

Complete step-by-step guide to deploy the AI Virtual Lab to Vercel.

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] GitHub account
- [ ] Vercel account (free tier works)
- [ ] Code editor (VS Code recommended)

## Step 1: Prepare Your Project

### 1.1 Verify Project Structure

Ensure your project has these files:
```
✓ package.json
✓ next.config.js
✓ vercel.json
✓ tsconfig.json
✓ tailwind.config.js
✓ app/ directory
✓ components/ directory
```

### 1.2 Test Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
# Verify both CNN and SVM labs work
```

### 1.3 Build Test

```bash
# Test production build
npm run build

# If successful, you'll see:
# ✓ Compiled successfully
# ✓ Collecting page data
# ✓ Generating static pages
```

## Step 2: Push to GitHub

### 2.1 Initialize Git Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: AI Virtual Lab"
```

### 2.2 Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Name it: `ai-virtual-lab`
4. Don't initialize with README (we already have one)
5. Click "Create repository"

### 2.3 Push to GitHub

```bash
# Add remote origin (replace with your URL)
git remote add origin https://github.com/YOUR_USERNAME/ai-virtual-lab.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy to Vercel

### Method A: Vercel Dashboard (Recommended for Beginners)

#### 3.1 Sign Up / Login

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Login"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your repositories

#### 3.2 Import Project

1. Click "Add New..." → "Project"
2. Find your `ai-virtual-lab` repository
3. Click "Import"

#### 3.3 Configure Project

Vercel will auto-detect Next.js. Verify these settings:

```
Framework Preset: Next.js
Root Directory: ./
Build Command: next build
Output Directory: .next
Install Command: npm install
Development Command: next dev
```

#### 3.4 Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build
3. You'll see: "🎉 Congratulations!"
4. Click "Visit" to see your live site

Your app is now live at: `https://ai-virtual-lab-xxx.vercel.app`

### Method B: Vercel CLI (For Advanced Users)

#### 3.1 Install Vercel CLI

```bash
npm install -g vercel
```

#### 3.2 Login

```bash
vercel login
```

Follow the prompts to authenticate.

#### 3.3 Deploy

```bash
# First deployment (preview)
vercel

# Answer the prompts:
# Set up and deploy? Yes
# Which scope? Your account
# Link to existing project? No
# Project name? ai-virtual-lab
# Directory? ./
# Override settings? No
```

#### 3.4 Deploy to Production

```bash
vercel --prod
```

## Step 4: Verify Deployment

### 4.1 Check All Pages

Visit these URLs on your deployed site:

- [ ] Home page: `/`
- [ ] CNN Lab: `/cnn`
- [ ] SVM Lab: `/svm`

### 4.2 Test Functionality

CNN Lab:
- [ ] Convolution animation works
- [ ] Pooling visualization displays
- [ ] Activation function graphs render
- [ ] Fully connected layer shows

SVM Lab:
- [ ] Dataset generation works
- [ ] Kernel selection changes display
- [ ] Training animation plays
- [ ] Evaluation metrics show

### 4.3 Check Performance

1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit
4. Target scores:
   - Performance: 90+
   - Accessibility: 95+
   - Best Practices: 95+
   - SEO: 90+

## Step 5: Custom Domain (Optional)

### 5.1 Add Domain in Vercel

1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Enter your domain: `ailab.yourdomain.com`
4. Click "Add"

### 5.2 Configure DNS

Add these records to your DNS provider:

**For subdomain (ailab.yourdomain.com):**
```
Type: CNAME
Name: ailab
Value: cname.vercel-dns.com
```

**For root domain (yourdomain.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

### 5.3 Verify

Wait 5-10 minutes for DNS propagation, then visit your custom domain.

## Step 6: Continuous Deployment

### 6.1 Automatic Deployments

Every push to `main` branch triggers automatic deployment:

```bash
# Make changes
git add .
git commit -m "Update CNN module"
git push origin main

# Vercel automatically deploys
```

### 6.2 Preview Deployments

Create a branch for testing:

```bash
# Create feature branch
git checkout -b feature/new-module

# Make changes and push
git push origin feature/new-module

# Vercel creates preview URL
# Test at: https://ai-virtual-lab-xxx-git-feature-new-module.vercel.app
```

### 6.3 Production Deployment

Merge to main when ready:

```bash
git checkout main
git merge feature/new-module
git push origin main

# Production site updates automatically
```

## Step 7: Monitoring & Analytics

### 7.1 Enable Vercel Analytics

1. Go to project dashboard
2. Click "Analytics" tab
3. Click "Enable Analytics"
4. Free tier includes:
   - Page views
   - Unique visitors
   - Top pages
   - Referrers

### 7.2 Check Deployment Logs

1. Go to "Deployments" tab
2. Click on any deployment
3. View build logs
4. Check function logs (if using API routes)

### 7.3 Monitor Performance

1. Go to "Speed Insights" tab
2. View real user metrics:
   - First Contentful Paint (FCP)
   - Largest Contentful Paint (LCP)
   - Cumulative Layout Shift (CLS)
   - First Input Delay (FID)

## Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Solution: Ensure all imports use correct paths
# Check case sensitivity (Linux is case-sensitive)
```

**Error: Out of memory**
```bash
# Solution: Add to package.json scripts:
"build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
```

### Runtime Errors

**Error: Hydration mismatch**
```bash
# Solution: Ensure server and client render same content
# Check for browser-only APIs in components
# Use 'use client' directive when needed
```

**Error: 404 on page refresh**
```bash
# Solution: Vercel handles this automatically for Next.js
# If issue persists, check vercel.json configuration
```

### Performance Issues

**Slow page load**
```bash
# Solutions:
# 1. Enable Next.js Image optimization
# 2. Use dynamic imports for heavy components
# 3. Implement code splitting
# 4. Add loading states
```

**Large bundle size**
```bash
# Check bundle size:
npm run build

# Analyze:
npm install @next/bundle-analyzer
# Add to next.config.js
```

## Environment Variables (If Needed)

### Add in Vercel Dashboard

1. Go to Settings → Environment Variables
2. Add variables:
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: https://api.example.com
   Environment: Production, Preview, Development
   ```

### Add Locally

Create `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Add to `.gitignore`:
```
.env*.local
```

## Security Best Practices

### 1. Environment Variables
- Never commit `.env` files
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Keep sensitive keys server-side only

### 2. Dependencies
```bash
# Regular security audits
npm audit

# Fix vulnerabilities
npm audit fix
```

### 3. Headers
Already configured in `next.config.js`:
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

## Rollback Deployment

### Via Dashboard

1. Go to "Deployments" tab
2. Find previous working deployment
3. Click "..." menu
4. Click "Promote to Production"

### Via CLI

```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

## Scaling Considerations

### Free Tier Limits
- 100 GB bandwidth/month
- Unlimited deployments
- Unlimited preview deployments
- 100 GB-hours serverless function execution

### Upgrade When Needed
- Pro: $20/month - More bandwidth, faster builds
- Enterprise: Custom - Dedicated support, SLA

## Maintenance Checklist

### Weekly
- [ ] Check deployment status
- [ ] Review analytics
- [ ] Monitor error logs

### Monthly
- [ ] Update dependencies: `npm update`
- [ ] Run security audit: `npm audit`
- [ ] Check performance metrics
- [ ] Review user feedback

### Quarterly
- [ ] Major dependency updates
- [ ] Performance optimization
- [ ] Feature additions
- [ ] Content updates

## Support Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Vercel Community**: https://github.com/vercel/vercel/discussions
- **Status Page**: https://vercel-status.com

## Success Checklist

- [ ] Project builds locally without errors
- [ ] All pages accessible and functional
- [ ] Pushed to GitHub successfully
- [ ] Deployed to Vercel
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled
- [ ] Performance metrics acceptable
- [ ] Mobile responsive verified
- [ ] Cross-browser tested
- [ ] Documentation updated

---

🎉 Congratulations! Your AI Virtual Lab is now live and accessible to students worldwide!
