# Profile Update Guide

## 📋 How to Keep Your Profile Current

This guide explains how to update Dr. Syed Muzamil Basha's profile page with the latest statistics and publications from Google Scholar.

---

## 🔄 Regular Updates Needed

### 1. Citation Statistics (Update Monthly/Quarterly)
### 2. Recent Publications (Update When New Papers Published)
### 3. Profile Photo (One-time setup)

---

## 📊 Step 1: Update Citation Statistics

### Where to Find Data
Visit Google Scholar Profile: https://scholar.google.com/citations?user=YOUR_ID

### What to Update
File: `app/profile/page.tsx`

Look for the `stats` array (around line 8-15):

```typescript
const stats = [
    { label: 'Publications', value: '85+', icon: FileText, color: 'bg-blue-500' },
    { label: 'Citations', value: '2,187', icon: TrendingUp, color: 'bg-green-500' },
    { label: 'H-Index', value: '27', icon: Award, color: 'bg-purple-500' },
    { label: 'i10-Index', value: '50', icon: Award, color: 'bg-indigo-500' },
    { label: 'Patents', value: '10+', icon: BookOpen, color: 'bg-orange-500' },
    { label: 'Books & Chapters', value: '20+', icon: BookOpen, color: 'bg-teal-500' }
]
```

### Update These Values:
1. **Publications**: Count from Google Scholar
2. **Citations**: "Cited by" total from Google Scholar
3. **H-Index**: From Google Scholar metrics
4. **i10-Index**: From Google Scholar metrics

### Also Update Research Impact Section
Look for the "Research Impact" section (around line 250-280):

```typescript
<div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
    <span className="text-gray-700">Total Citations</span>
    <span className="text-2xl font-bold text-green-600">2,187</span>
</div>
<div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
    <span className="text-gray-700">Citations (Since 2021)</span>
    <span className="text-2xl font-bold text-blue-600">1,854</span>
</div>
// ... update all metrics
```

---

## 📚 Step 2: Update Recent Publications

### Where to Find Data
1. Go to your Google Scholar profile
2. Sort by "Recent" or "Cited by"
3. Select 5-10 most impactful recent papers

### What to Update
File: `app/profile/page.tsx`

Look for the `recentPublications` array (around line 50-90):

```typescript
const recentPublications = [
    {
        title: 'Your Paper Title Here',
        authors: 'S.M. Basha, Co-Author Names',
        venue: 'Conference or Journal Name',
        year: 2024,
        citations: 45,
        type: 'Journal' // or 'Conference'
    },
    // Add more publications...
]
```

### How to Add a New Publication:

```typescript
{
    title: 'Deep Learning for Medical Image Analysis',
    authors: 'S.M. Basha, R. Kumar, A. Singh',
    venue: 'IEEE Transactions on Medical Imaging',
    year: 2024,
    citations: 67,
    type: 'Journal'
},
```

### Tips:
- Keep 5-10 most recent/cited papers
- Update citation counts every few months
- Include mix of journals and conferences
- Prioritize high-impact publications

---

## 🖼️ Step 3: Update Profile Photo

### Current Setup
The profile photo is currently set to load from:
```
https://raw.githubusercontent.com/muzabasha/cnn-svm/main/public/profile-photo.jpg
```

### To Update Photo:

#### Option A: Upload to GitHub Repository
1. Save your professional photo as `profile-photo.jpg`
2. Place it in the `public` folder of your repository
3. Commit and push:
   ```bash
   git add public/profile-photo.jpg
   git commit -m "Update profile photo"
   git push origin main
   ```

#### Option B: Use External URL
Edit `app/profile/page.tsx` (around line 58):

```typescript
<img
    src="YOUR_PHOTO_URL_HERE"
    alt="Dr. Syed Muzamil Basha"
    className="w-full h-full object-cover"
/>
```

### Photo Requirements:
- **Format**: JPG or PNG
- **Size**: 400x400 pixels minimum
- **Quality**: Professional headshot
- **Background**: Clean, professional
- **File Size**: Under 500KB

---

## 🚀 Deployment Process

### After Making Updates:

1. **Save Changes**
   ```bash
   # Edit app/profile/page.tsx with your updates
   ```

2. **Test Locally** (Optional)
   ```bash
   npm run dev
   # Visit http://localhost:3000/profile
   ```

3. **Commit Changes**
   ```bash
   git add app/profile/page.tsx
   git commit -m "Update profile: citations 2,187→2,250, add new publications"
   ```

4. **Push to GitHub**
   ```bash
   git push origin main
   ```

5. **Automatic Deployment**
   - Vercel automatically detects the push
   - Builds and deploys in 2-3 minutes
   - Your updates are live!

---

## 📅 Update Schedule Recommendation

### Monthly Updates
- ✅ Citation count
- ✅ H-index
- ✅ i10-index

### Quarterly Updates
- ✅ Recent publications list
- ✅ Publication count
- ✅ Citation counts for individual papers

### Annual Updates
- ✅ Research areas (if changed)
- ✅ Achievements section
- ✅ Bio description
- ✅ Books & chapters count

### As Needed
- ✅ Profile photo
- ✅ Contact information
- ✅ Social media links

---

## 🔍 Quick Reference: File Locations

### Main Profile File
```
app/profile/page.tsx
```

### Sections to Update:

1. **Line 8-15**: Statistics array
   ```typescript
   const stats = [...]
   ```

2. **Line 50-90**: Recent publications
   ```typescript
   const recentPublications = [...]
   ```

3. **Line 58**: Profile photo URL
   ```typescript
   <img src="..." />
   ```

4. **Line 250-280**: Research impact metrics
   ```typescript
   <div>Total Citations: 2,187</div>
   ```

---

## 📝 Example Update Workflow

### Scenario: New Paper Published + Citation Increase

1. **Check Google Scholar**
   - New citations: 2,187 → 2,245 (+58)
   - New paper: "AI in Healthcare" (2024)
   - H-index: 27 → 28

2. **Update Statistics**
   ```typescript
   { label: 'Citations', value: '2,245', ... },
   { label: 'H-Index', value: '28', ... },
   ```

3. **Add New Publication**
   ```typescript
   {
       title: 'AI in Healthcare: A Comprehensive Review',
       authors: 'S.M. Basha, et al.',
       venue: 'Nature Medicine',
       year: 2024,
       citations: 12,
       type: 'Journal'
   },
   ```

4. **Update Research Impact Section**
   ```typescript
   <span>2,245</span> // Update total citations
   ```

5. **Commit and Push**
   ```bash
   git add app/profile/page.tsx
   git commit -m "Update: Citations 2,187→2,245, H-index 27→28, add Nature Medicine paper"
   git push origin main
   ```

6. **Verify Deployment**
   - Wait 2-3 minutes
   - Visit your profile page
   - Confirm updates are live

---

## 🎯 Best Practices

### Data Accuracy
✅ Always verify numbers from Google Scholar  
✅ Double-check citation counts  
✅ Ensure publication details are correct  
✅ Update "Last updated" date in publications section

### Commit Messages
✅ Be specific: "Update citations 2,187→2,245"  
✅ Mention what changed: "Add 2 new publications"  
✅ Include date: "Monthly update - Feb 2026"

### Testing
✅ Test locally before pushing (optional)  
✅ Check mobile responsiveness  
✅ Verify all links work  
✅ Ensure photo loads correctly

### Maintenance
✅ Set calendar reminders for updates  
✅ Keep a log of update dates  
✅ Archive old publication lists  
✅ Monitor Google Scholar for changes

---

## 🛠️ Troubleshooting

### Photo Not Loading
- Check file path is correct
- Verify file exists in `public` folder
- Try clearing browser cache
- Check file permissions on GitHub

### Statistics Not Updating
- Verify you edited correct file
- Check commit was successful
- Wait for Vercel deployment (2-3 min)
- Clear browser cache

### Build Errors
- Run `npm run type-check` locally
- Fix any TypeScript errors
- Ensure all quotes/brackets match
- Check for typos in code

---

## 📞 Support

### Need Help?
1. Check this guide first
2. Review error messages in Vercel dashboard
3. Test changes locally with `npm run dev`
4. Verify syntax in code editor

### Common Issues
- **Syntax Error**: Missing comma or bracket
- **Type Error**: Wrong data type in array
- **Build Failed**: Check Vercel logs
- **Photo 404**: Wrong file path

---

## 🎓 Summary

### Regular Maintenance Checklist

**Monthly** (5 minutes):
- [ ] Update citation count from Google Scholar
- [ ] Update H-index and i10-index
- [ ] Commit and push changes

**Quarterly** (15 minutes):
- [ ] Add new publications
- [ ] Update citation counts for papers
- [ ] Review and update publication count
- [ ] Commit and push changes

**Annual** (30 minutes):
- [ ] Review all statistics
- [ ] Update bio if needed
- [ ] Refresh research areas
- [ ] Update achievements
- [ ] Commit and push changes

---

## 🚀 Quick Update Commands

```bash
# 1. Edit the file
code app/profile/page.tsx

# 2. Save and commit
git add app/profile/page.tsx
git commit -m "Update profile statistics - [DATE]"

# 3. Push to deploy
git push origin main

# 4. Verify (wait 2-3 minutes)
# Visit: https://your-site.vercel.app/profile
```

---

*Keep this guide handy for easy profile updates!*  
*Last Updated: February 21, 2026*
