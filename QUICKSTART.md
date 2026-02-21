# Quick Start Guide - AI Virtual Lab

Get up and running in 5 minutes!

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- Git ([Download](https://git-scm.com/))
- Code editor (VS Code recommended)

## Installation

### 1. Clone or Download

```bash
# If you have the code
cd ai-virtual-lab

# Or clone from GitHub
git clone <your-repo-url>
cd ai-virtual-lab
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- Next.js
- React
- Tailwind CSS
- Recharts
- KaTeX
- And all other dependencies

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
ai-virtual-lab/
├── app/                    # Pages
│   ├── page.tsx           # Home
│   ├── cnn/page.tsx       # CNN Lab
│   └── svm/page.tsx       # SVM Lab
├── components/            # React components
│   ├── ui/               # Reusable UI
│   ├── cnn/              # CNN modules
│   └── svm/              # SVM modules
└── lib/                  # Utilities
```

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Making Changes

### 1. Edit a Component

```bash
# Open in VS Code
code components/cnn/ConvolutionModule.tsx

# Make changes
# Save file
# Browser auto-refreshes
```

### 2. Add New Module

```typescript
// components/cnn/NewModule.tsx
export function NewModule() {
  return (
    <div>
      <h2>New Module</h2>
    </div>
  )
}

// app/cnn/page.tsx
import { NewModule } from '@/components/cnn/NewModule'

// Add to render
{selectedTask === 'new' && <NewModule />}
```

### 3. Modify Styles

```typescript
// Use Tailwind classes
<div className="bg-blue-50 rounded-2xl p-4">
  Content
</div>
```

## Common Tasks

### Change Colors

Edit `app/globals.css`:
```css
:root {
  --primary: 221.2 83.2% 53.3%;  /* Blue */
}
```

### Add New Page

```bash
# Create file
mkdir app/newpage
touch app/newpage/page.tsx

# Add content
export default function NewPage() {
  return <div>New Page</div>
}

# Access at /newpage
```

### Add Icons

```typescript
import { Icon } from 'lucide-react'

<Icon className="w-4 h-4" />
```

Browse icons: [lucide.dev](https://lucide.dev)

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### TypeScript Errors

```bash
# Check types
npx tsc --noEmit

# Update TypeScript
npm install typescript@latest
```

## Deploy to Vercel

### Quick Deploy

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Via GitHub

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Click Deploy

## Learning Resources

### Next.js
- [Documentation](https://nextjs.org/docs)
- [Learn Tutorial](https://nextjs.org/learn)

### React
- [Documentation](https://react.dev)
- [Tutorial](https://react.dev/learn)

### Tailwind CSS
- [Documentation](https://tailwindcss.com/docs)
- [Playground](https://play.tailwindcss.com)

## Getting Help

### Documentation
- README.md - Overview
- ARCHITECTURE.md - Technical details
- DEPLOYMENT.md - Deployment guide

### Community
- GitHub Issues
- Stack Overflow
- Next.js Discord

## Next Steps

1. ✅ Run the app locally
2. ✅ Explore CNN and SVM labs
3. ✅ Make a small change
4. ✅ Deploy to Vercel
5. ✅ Share with students!

## Tips

### Hot Reload
- Save file → Browser auto-refreshes
- No need to restart server

### Component Inspector
- Install React DevTools
- Inspect component tree
- View props and state

### Performance
- Use Chrome DevTools
- Check Lighthouse scores
- Monitor bundle size

### Debugging
```typescript
// Add console logs
console.log('Value:', value)

// Use debugger
debugger

// React DevTools
// Inspect component state
```

## Common Patterns

### State Management
```typescript
const [value, setValue] = useState(0)

// Update
setValue(newValue)

// Use in effect
useEffect(() => {
  // Runs when value changes
}, [value])
```

### Event Handling
```typescript
<button onClick={() => handleClick()}>
  Click Me
</button>

const handleClick = () => {
  console.log('Clicked!')
}
```

### Conditional Rendering
```typescript
{isVisible && <Component />}

{type === 'a' ? <ComponentA /> : <ComponentB />}
```

## Keyboard Shortcuts (VS Code)

- `Ctrl/Cmd + P` - Quick file open
- `Ctrl/Cmd + Shift + F` - Search in files
- `Ctrl/Cmd + D` - Select next occurrence
- `Alt + Up/Down` - Move line
- `Ctrl/Cmd + /` - Toggle comment

## Useful Extensions (VS Code)

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint
- Auto Rename Tag

## Development Workflow

```
1. Create feature branch
   git checkout -b feature/new-feature

2. Make changes
   Edit files

3. Test locally
   npm run dev

4. Commit changes
   git add .
   git commit -m "Add new feature"

5. Push to GitHub
   git push origin feature/new-feature

6. Create Pull Request
   Review and merge

7. Deploy
   Automatic via Vercel
```

## Performance Tips

### Optimize Images
```typescript
import Image from 'next/image'

<Image
  src="/image.png"
  width={500}
  height={300}
  alt="Description"
/>
```

### Lazy Load Components
```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./Heavy'), {
  loading: () => <p>Loading...</p>
})
```

### Memoize Expensive Calculations
```typescript
const result = useMemo(() => {
  return expensiveFunction(data)
}, [data])
```

## Security Checklist

- [ ] No API keys in code
- [ ] Use environment variables
- [ ] Validate user inputs
- [ ] Keep dependencies updated
- [ ] Run `npm audit` regularly

## Ready to Build!

You now have everything you need to:
- Run the application
- Make modifications
- Deploy to production
- Share with students

Happy coding! 🚀
