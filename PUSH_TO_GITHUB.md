# Push to GitHub - Step by Step

Follow these exact commands to push your code to GitHub.

## Step 1: Initialize Git

```bash
# Initialize git repository
git init

# Check status
git status
```

## Step 2: Add All Files

```bash
# Add all files to staging
git add .

# Verify files are staged
git status
```

## Step 3: Create Initial Commit

```bash
# Commit with message
git commit -m "Initial commit: AI Virtual Lab - CNN & SVM Interactive Learning Platform"
```

## Step 4: Create GitHub Repository

1. Go to https://github.com/muzabasha
2. Click "New repository" (green button)
3. Repository name: `cnn-svm`
4. Description: `AI Virtual Lab - Interactive CNN & SVM Learning Platform`
5. Keep it Public (or Private if preferred)
6. **DO NOT** initialize with README (we already have one)
7. Click "Create repository"

## Step 5: Connect to GitHub

```bash
# Add remote origin (replace with your actual URL)
git remote add origin https://github.com/muzabasha/cnn-svm.git

# Verify remote
git remote -v
```

## Step 6: Push to GitHub

```bash
# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 7: Verify on GitHub

1. Go to https://github.com/muzabasha/cnn-svm
2. Verify all files are there
3. Check README displays correctly

## Step 8: Deploy to Vercel

### Option A: Via Vercel Dashboard

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import `muzabasha/cnn-svm`
4. Click "Deploy"
5. Wait 2-3 minutes
6. Click "Visit" to see live site

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Step 9: Verify Deployment

Visit your Vercel URL and check:
- [ ] Home page loads
- [ ] CNN Lab works
- [ ] SVM Lab works
- [ ] All animations function
- [ ] Math equations render
- [ ] Charts display correctly

## Step 10: Update README (Optional)

Add your live URL to README.md:

```bash
# Edit README.md and add:
# Live Demo: https://your-project.vercel.app

git add README.md
git commit -m "Add live demo URL"
git push origin main
```

## Troubleshooting

### Authentication Issues

If you get authentication errors:

```bash
# Use GitHub CLI
gh auth login

# Or use SSH instead of HTTPS
git remote set-url origin git@github.com:muzabasha/cnn-svm.git
```

### Push Rejected

If push is rejected:

```bash
# Pull first (if repository has content)
git pull origin main --allow-unrelated-histories

# Then push
git push origin main
```

### Vercel Build Fails

Check build logs in Vercel dashboard:
1. Go to Deployments tab
2. Click on failed deployment
3. View build logs
4. Fix errors and push again

## Success!

Once deployed, your AI Virtual Lab will be live at:
- GitHub: https://github.com/muzabasha/cnn-svm
- Vercel: https://cnn-svm.vercel.app (or your custom URL)

Share the link with students and start teaching! 🎉
