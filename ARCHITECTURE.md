# Architecture Documentation - AI Virtual Lab

## System Overview

The AI Virtual Lab is a modern web application built with Next.js 14, designed to provide interactive educational experiences for learning CNNs and SVMs. The architecture emphasizes performance, maintainability, and educational effectiveness.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Home Page   │  │   CNN Lab    │  │   SVM Lab    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                        │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐  │
│  │              React Components Layer                   │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │  │
│  │  │ CNN Modules│  │ SVM Modules│  │ UI Library │    │  │
│  │  └────────────┘  └────────────┘  └────────────┘    │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Visualization Libraries                  │  │
│  │  • Recharts  • KaTeX  • Framer Motion               │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Vercel Edge Network                       │
│  • CDN Caching  • Edge Functions  • Auto-scaling           │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend Framework
- **Next.js 14**: React framework with App Router
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - Automatic code splitting
  - Built-in optimization

### UI & Styling
- **React 18**: Component-based UI library
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **CSS Variables**: Theme customization

### Visualization
- **Recharts**: Chart library for data visualization
- **KaTeX**: Mathematical equation rendering
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## Component Architecture

### Component Hierarchy

```
App
├── Layout (Global)
│   ├── Header
│   └── Main Content
│
├── Home Page
│   └── Lab Selection Cards
│
├── CNN Lab
│   ├── CNNTaskSelector (Sidebar)
│   └── Module Container
│       ├── ConvolutionModule
│       ├── PoolingModule
│       ├── ActivationModule
│       └── FullyConnectedModule
│
└── SVM Lab
    ├── SVMTaskSelector (Sidebar)
    └── Module Container
        ├── DatasetPlayground
        ├── KernelLab
        ├── TrainingVisualization
        └── EvaluationDashboard
```

### Component Design Patterns

#### 1. Container/Presenter Pattern
```typescript
// Container (Smart Component)
export default function CNNLab() {
  const [selectedTask, setSelectedTask] = useState('convolution')
  
  return (
    <div>
      <CNNTaskSelector 
        selectedTask={selectedTask}
        onSelectTask={setSelectedTask}
      />
      {selectedTask === 'convolution' && <ConvolutionModule />}
    </div>
  )
}

// Presenter (Dumb Component)
export function CNNTaskSelector({ selectedTask, onSelectTask }) {
  return (
    <div>
      {tasks.map(task => (
        <button onClick={() => onSelectTask(task.id)}>
          {task.name}
        </button>
      ))}
    </div>
  )
}
```

#### 2. Composition Pattern
```typescript
// Reusable Card component
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

#### 3. Controlled Components
```typescript
// Parent controls state
const [value, setValue] = useState(1.0)

<Slider
  value={value}
  onChange={setValue}
  min={0}
  max={10}
/>
```

## Data Flow

### State Management

```
User Interaction
      ↓
Event Handler
      ↓
State Update (useState)
      ↓
Component Re-render
      ↓
UI Update
```

### Example: Convolution Module

```typescript
// 1. User changes stride
<Slider onChange={setStride} />

// 2. useEffect triggers computation
useEffect(() => {
  computeConvolution()
}, [stride, image, kernel])

// 3. Output state updates
setOutput(result)

// 4. UI re-renders with new output
<OutputGrid data={output} />
```

## Module Specifications

### CNN Modules

#### 1. Convolution Module
**Purpose**: Teach convolution operation

**Features**:
- 5×5 input image visualization
- 3×3 kernel display
- Animated convolution process
- Real-time output computation
- Adjustable stride and padding
- Mathematical formula display
- Python code example

**State**:
```typescript
{
  image: number[][]
  kernel: number[][]
  output: number[][]
  stride: number
  padding: number
  currentStep: number
  isAnimating: boolean
}
```

#### 2. Pooling Module
**Purpose**: Demonstrate pooling operations

**Features**:
- Max vs Average pooling comparison
- 4×4 input feature map
- 2×2 output visualization
- Animated pooling process
- Dimension reduction explanation

**State**:
```typescript
{
  input: number[][]
  poolType: 'max' | 'avg'
  poolSize: number
  output: number[][]
  currentStep: number
}
```

#### 3. Activation Module
**Purpose**: Explain activation functions

**Features**:
- ReLU, Sigmoid, Tanh functions
- Interactive function graphs
- Input-output transformation table
- Mathematical formulas
- Use case explanations

**State**:
```typescript
{
  activationType: 'relu' | 'sigmoid' | 'tanh'
  inputValues: number[]
}
```

#### 4. Fully Connected Module
**Purpose**: Show classification layer

**Features**:
- Input feature visualization
- Weight matrix representation
- Output score computation
- Softmax probability display
- Step-by-step calculation

**State**:
```typescript
{
  input: number[]
  weights: number[][]
  bias: number[]
  output: number[]
  probabilities: number[]
}
```

### SVM Modules

#### 1. Dataset Playground
**Purpose**: Generate and visualize datasets

**Features**:
- Linear, Moon, Circular patterns
- Noise adjustment
- Sample size control
- 2D scatter plot
- Class distribution display

**State**:
```typescript
{
  datasetType: 'linear' | 'moon' | 'circular'
  noise: number
  numSamples: number
  data: DataPoint[]
}
```

#### 2. Kernel Lab
**Purpose**: Explore kernel functions

**Features**:
- Linear, Polynomial, RBF kernels
- Hyperparameter sliders (C, gamma, degree)
- Mathematical formulas
- Kernel comparison
- Python code examples

**State**:
```typescript
{
  kernelType: 'linear' | 'polynomial' | 'rbf'
  C: number
  gamma: number
  degree: number
}
```

#### 3. Training Visualization
**Purpose**: Animate training process

**Features**:
- 5-step training animation
- Visual representations
- Progress indicators
- Key concept explanations

**State**:
```typescript
{
  step: number
  isAnimating: boolean
}
```

#### 4. Evaluation Dashboard
**Purpose**: Display performance metrics

**Features**:
- Accuracy, Precision, Recall, F1-Score
- Confusion matrix visualization
- Metric formulas
- Bar chart comparison
- Interpretation guide

**State**:
```typescript
{
  metrics: {
    accuracy: number
    precision: number
    recall: number
    f1Score: number
  }
  confusionMatrix: number[][]
}
```

## Styling Architecture

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
      },
      borderRadius: {
        '2xl': '1rem',
      }
    }
  }
}
```

### CSS Variables

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  --border: 214.3 31.8% 91.4%;
}
```

### Component Styling Pattern

```typescript
// Consistent styling approach
<div className="rounded-2xl border bg-white shadow-sm p-6">
  <h3 className="text-2xl font-semibold mb-4">Title</h3>
  <p className="text-gray-600">Description</p>
</div>
```

## Performance Optimizations

### 1. Code Splitting
```typescript
// Automatic with Next.js App Router
// Each page is a separate bundle
app/cnn/page.tsx → cnn.js
app/svm/page.tsx → svm.js
```

### 2. Lazy Loading
```typescript
// Dynamic imports for heavy components
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <Spinner />
})
```

### 3. Memoization
```typescript
// Prevent unnecessary re-renders
const MemoizedComponent = React.memo(ExpensiveComponent)

// Memoize expensive calculations
const result = useMemo(() => {
  return expensiveCalculation(data)
}, [data])
```

### 4. Image Optimization
```typescript
// Next.js Image component
import Image from 'next/image'

<Image
  src="/diagram.png"
  width={800}
  height={600}
  alt="Architecture"
/>
```

## Accessibility Features

### 1. Semantic HTML
```typescript
<main>
  <section>
    <h1>Title</h1>
    <article>Content</article>
  </section>
</main>
```

### 2. ARIA Labels
```typescript
<button aria-label="Play animation">
  <Play />
</button>
```

### 3. Keyboard Navigation
```typescript
<button
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Action
</button>
```

### 4. Color Contrast
- All text meets WCAG AA standards
- Minimum contrast ratio: 4.5:1

## Security Considerations

### 1. Input Validation
```typescript
// Validate slider inputs
const handleChange = (value: number) => {
  if (value >= min && value <= max) {
    setValue(value)
  }
}
```

### 2. XSS Prevention
- React automatically escapes content
- No dangerouslySetInnerHTML usage
- Sanitized user inputs

### 3. Content Security Policy
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
]
```

## Testing Strategy

### Unit Tests
```typescript
// Component testing
describe('ConvolutionModule', () => {
  it('computes convolution correctly', () => {
    const result = computeConvolution(image, kernel)
    expect(result).toEqual(expectedOutput)
  })
})
```

### Integration Tests
```typescript
// User flow testing
test('user can animate convolution', async () => {
  render(<ConvolutionModule />)
  const button = screen.getByText('Animate')
  fireEvent.click(button)
  await waitFor(() => {
    expect(screen.getByText('Step 1')).toBeInTheDocument()
  })
})
```

### E2E Tests
```typescript
// Playwright/Cypress
test('complete CNN workflow', async ({ page }) => {
  await page.goto('/cnn')
  await page.click('text=Convolution Operation')
  await page.click('text=Animate')
  await expect(page.locator('.output-grid')).toBeVisible()
})
```

## Deployment Architecture

### Vercel Platform

```
GitHub Repository
      ↓
Vercel Build System
      ↓
Next.js Build
      ↓
Static Assets → CDN
Server Functions → Edge Network
      ↓
Global Distribution
```

### Build Process

1. **Install Dependencies**: `npm install`
2. **Type Check**: TypeScript compilation
3. **Build**: `next build`
4. **Optimize**: Image optimization, minification
5. **Deploy**: Upload to Vercel edge network

### Caching Strategy

- **Static Assets**: Cached indefinitely
- **HTML Pages**: Cached with revalidation
- **API Routes**: No caching (if added)

## Monitoring & Analytics

### Performance Metrics
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Time to Interactive (TTI)

### User Analytics
- Page views
- User sessions
- Navigation patterns
- Feature usage

### Error Tracking
- Runtime errors
- Build errors
- User-reported issues

## Scalability Considerations

### Horizontal Scaling
- Vercel automatically scales
- Edge network distribution
- No server management needed

### Vertical Scaling
- Optimize bundle size
- Reduce dependencies
- Implement code splitting

### Database (Future)
- If user data needed:
  - Vercel Postgres
  - Supabase
  - MongoDB Atlas

## Future Architecture Enhancements

### 1. Backend API
```
Next.js API Routes
      ↓
Python ML Models (FastAPI)
      ↓
Model Inference
      ↓
Return Results
```

### 2. User Authentication
```
NextAuth.js
      ↓
OAuth Providers
      ↓
Session Management
      ↓
Protected Routes
```

### 3. Database Integration
```
User Progress
      ↓
Vercel Postgres
      ↓
Track Completion
      ↓
Generate Reports
```

### 4. Real-time Collaboration
```
WebSocket Connection
      ↓
Shared State
      ↓
Multi-user Experiments
```

## Conclusion

This architecture provides a solid foundation for an educational platform that is:
- **Performant**: Fast load times, smooth animations
- **Scalable**: Handles growing user base
- **Maintainable**: Clean code, clear structure
- **Accessible**: Works for all users
- **Educational**: Effective learning experience

The modular design allows for easy extension and modification as requirements evolve.
