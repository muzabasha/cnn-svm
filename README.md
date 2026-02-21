# AI Virtual Lab - Comprehensive Machine Learning Education Platform

A professional educational web application designed to help students understand Machine Learning algorithms through experiential learning, aligned with NEP 2020 principles.

## 🎯 Overview

This platform provides five comprehensive virtual labs covering essential ML algorithms:

### 🧠 CNN Virtual Lab
- Layer-by-layer visualization of neural network operations
- Interactive convolution, pooling, and activation modules
- Plant disease detection with real images
- Mathematical equations with real-time interpretation
- Step-by-step processing visualization

### 📊 SVM Virtual Lab
- Dataset playground with multiple patterns (linear, moon, circular)
- Kernel experimentation (Linear, Polynomial, RBF)
- Hyperparameter tuning with live visualization
- Training process animation
- Comprehensive evaluation metrics dashboard

### 🌳 Decision Tree Virtual Lab
- Animated tree growth visualization
- Splitting criteria comparison (Gini vs Entropy)
- Pre-pruning and post-pruning techniques
- Interactive tree builder
- Overfitting prevention strategies

### 🎲 Naive Bayes Virtual Lab
- Bayes' theorem interactive explanation
- Medical test probability calculator
- Text classification (spam detection)
- Conditional probability visualization
- Independence assumption analysis

### 🌲 Random Forest Virtual Lab
- Forest visualization with multiple trees
- Bootstrapping demonstration
- Majority voting mechanism
- Feature importance rankings
- Ensemble learning principles

## 🚀 Features

- **Learn by Doing**: Interactive modules with real-time feedback
- **Experiential Learning**: Hands-on experimentation with parameters
- **Mathematical Clarity**: Equations with step-by-step explanations
- **Visual + Numerical**: Multiple representation formats
- **Beginner Friendly**: Simple language, clear explanations
- **Production Ready**: Optimized for Vercel deployment

## 📋 Prerequisites

- Node.js 18+ and npm
- Git
- Vercel account (for deployment)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ai-virtual-lab
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
ai-virtual-lab/
├── app/
│   ├── page.tsx                    # Home page
│   ├── cnn/page.tsx                # CNN Virtual Lab
│   ├── svm/page.tsx                # SVM Virtual Lab
│   ├── decision-tree/page.tsx      # Decision Tree Lab
│   ├── naive-bayes/page.tsx        # Naive Bayes Lab
│   ├── random-forest/page.tsx      # Random Forest Lab
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                         # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── slider.tsx
│   │   └── tabs.tsx
│   ├── cnn/                        # CNN modules
│   │   ├── PlantDiseaseModule.tsx
│   │   ├── ConvolutionModule.tsx
│   │   ├── PoolingModule.tsx
│   │   ├── ActivationModule.tsx
│   │   └── FullyConnectedModule.tsx
│   ├── svm/                        # SVM modules
│   │   ├── DatasetPlayground.tsx
│   │   ├── KernelLab.tsx
│   │   ├── TrainingVisualization.tsx
│   │   └── EvaluationDashboard.tsx
│   ├── decision-tree/              # Decision Tree modules
│   │   ├── TreeVisualization.tsx
│   │   ├── SplittingCriteria.tsx
│   │   ├── PruningModule.tsx
│   │   └── InteractiveBuilder.tsx
│   ├── naive-bayes/                # Naive Bayes modules
│   │   ├── BayesTheorem.tsx
│   │   ├── ProbabilityCalculator.tsx
│   │   ├── TextClassification.tsx
│   │   └── ConditionalProbability.tsx
│   └── random-forest/              # Random Forest modules
│       ├── ForestVisualization.tsx
│       ├── BootstrappingModule.tsx
│       ├── VotingMechanism.tsx
│       └── FeatureImportance.tsx
├── lib/
│   ├── utils.ts                    # Utility functions
│   └── sampleImages.ts             # Plant disease samples
├── public/                         # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── vercel.json
```

## 🎨 Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **Recharts**: Data visualization
- **KaTeX**: Mathematical equation rendering
- **Lucide React**: Icon library

### Deployment
- **Vercel**: Serverless deployment platform

## 📦 Deployment to Vercel

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js configuration

3. **Configure Build Settings** (Auto-detected)
   - Framework Preset: Next.js
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## 🔧 Configuration

### Environment Variables

No environment variables are required for the basic deployment. The application runs entirely on the frontend.

### Custom Domain (Optional)

1. Go to your Vercel project dashboard
2. Navigate to Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

## 📚 Usage Guide

### 🧠 CNN Virtual Lab

1. **Plant Disease Detection**
   - Upload leaf images or use sample images
   - See layer-by-layer CNN processing
   - Get disease predictions with confidence scores
   - Understand feature extraction

2. **Convolution Operation**
   - View input image, kernel, and output feature map
   - Animate the convolution process step-by-step
   - Adjust stride and padding parameters
   - See mathematical formula with real values

3. **Pooling Operation**
   - Compare Max Pooling vs Average Pooling
   - Observe spatial dimension reduction
   - Understand feature preservation

4. **Activation Functions**
   - Experiment with ReLU, Sigmoid, and Tanh
   - View function graphs and transformations
   - Understand non-linearity importance

### 📊 SVM Virtual Lab

1. **Dataset Playground**
   - Generate different dataset patterns
   - Adjust noise and sample size
   - Visualize class distributions

2. **Kernel & Hyperparameters**
   - Experiment with Linear, Polynomial, and RBF kernels
   - Tune C (regularization) parameter
   - Adjust gamma for kernel functions

3. **Training Visualization**
   - Watch step-by-step training process
   - Understand kernel mapping
   - See support vector selection

4. **Evaluation Dashboard**
   - View accuracy, precision, recall, F1-score
   - Analyze confusion matrix

### 🌳 Decision Tree Virtual Lab

1. **Tree Visualization**
   - Watch animated tree growth
   - See node splitting decisions
   - Understand Gini impurity

2. **Splitting Criteria**
   - Compare Gini vs Entropy
   - Calculate information gain
   - Choose optimal splits

3. **Pruning**
   - Pre-pruning (early stopping)
   - Post-pruning (cost complexity)
   - Prevent overfitting

4. **Interactive Builder**
   - Build custom decision trees
   - Add/edit training data
   - Test predictions

### 🎲 Naive Bayes Virtual Lab

1. **Bayes' Theorem**
   - Interactive medical test example
   - Adjust prior probabilities
   - See posterior calculations

2. **Probability Calculator**
   - Calculate conditional probabilities
   - Tennis playing prediction
   - Step-by-step computation

3. **Text Classification**
   - Spam vs Ham detection
   - Real-time classification
   - Probability visualization

4. **Conditional Probability**
   - Independence assumption
   - Advantages and limitations
   - When to use Naive Bayes

### 🌲 Random Forest Virtual Lab

1. **Forest Visualization**
   - See multiple trees working together
   - Majority voting in action
   - Adjust number of trees

2. **Bootstrapping**
   - Random sampling with replacement
   - Create diverse training sets
   - Out-of-bag samples

3. **Voting Mechanism**
   - Classification voting
   - Confidence levels
   - Ensemble predictions

4. **Feature Importance**
   - Rank features by importance
   - Understand contribution
   - Feature selection insights

## 🎓 Pedagogical Features

### NEP 2020 Alignment
- **Experiential Learning**: Hands-on interaction with concepts
- **Inquiry-Based**: Encourages exploration and questioning
- **Multidisciplinary**: Combines math, AI, and visualization
- **Student-Controlled**: Learners set their own pace

### Learning Modes
- **Guided Mode**: Step-by-step explanations
- **Practice Mode**: Predict outcomes before revealing
- **Experiment Mode**: Free exploration of parameters

### Educational Elements
- Mathematical equations with interpretations
- Real-world analogies
- "Try This" prompts
- "Think About It" questions
- Visual + numerical + code representations

## 🔍 Key Concepts Covered

### CNN Topics
- Convolution operation and feature extraction
- Kernel/filter design and effects
- Stride and padding impact
- Pooling for dimensionality reduction
- Activation functions and non-linearity
- Fully connected layers for classification
- Real-world application (plant disease detection)

### SVM Topics
- Linear vs non-linear separability
- Kernel trick and feature mapping
- Support vectors and margin maximization
- Hyperparameter tuning (C, gamma, degree)
- Decision boundaries
- Classification metrics

### Decision Tree Topics
- Tree construction algorithms
- Splitting criteria (Gini impurity, Entropy)
- Information gain calculation
- Pruning techniques (pre and post)
- Overfitting prevention
- Tree depth and complexity

### Naive Bayes Topics
- Bayes' theorem fundamentals
- Prior, likelihood, and posterior probabilities
- Conditional independence assumption
- Text classification applications
- Probability calculations
- When to use probabilistic classifiers

### Random Forest Topics
- Ensemble learning principles
- Bootstrap aggregating (bagging)
- Random feature selection
- Majority voting mechanism
- Feature importance calculation
- Bias-variance tradeoff

## 🚀 Performance Optimization

- Server-side rendering with Next.js
- Automatic code splitting
- Image optimization
- CSS optimization with Tailwind
- Lazy loading of components
- Efficient re-rendering with React

## 🐛 Troubleshooting

### Build Errors

**Issue**: Module not found errors
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules .next
npm install
```

**Issue**: TypeScript errors
```bash
# Solution: Check TypeScript version
npm install typescript@latest
```

### Deployment Issues

**Issue**: Vercel build fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

**Issue**: Page not loading
- Check browser console for errors
- Verify all imports are correct
- Clear browser cache

## 🔮 Future Extensions

### Planned Features
1. **Additional ML Algorithms**
   - K-Nearest Neighbors (KNN)
   - Logistic Regression
   - Neural Network Builder
   - Gradient Boosting
   - Principal Component Analysis (PCA)

2. **Enhanced Interactivity**
   - Custom dataset upload
   - Model comparison tools
   - Performance benchmarking
   - Export trained models
   - Collaborative learning features

3. **Advanced Visualizations**
   - 3D decision boundaries
   - Real-time training curves
   - Confusion matrix heatmaps
   - ROC and AUC curves
   - Learning rate schedulers

4. **Educational Tools**
   - Quiz system with scoring
   - Progress tracking
   - Certificate generation
   - Video tutorials
   - Code export functionality

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For questions or issues:
- Open an issue on GitHub
- Contact: [your-email@example.com]

## 🙏 Acknowledgments

- NEP 2020 for educational framework
- Next.js team for excellent documentation
- Vercel for hosting platform
- Open source community for libraries

---

Built with ❤️ for students learning AI/ML concepts through experiential education.
