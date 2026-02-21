# AI Virtual Lab - CNN & SVM Interactive Learning Platform

A professional educational web application designed to help students understand Convolutional Neural Networks (CNNs) and Support Vector Machines (SVMs) through experiential learning, aligned with NEP 2020 principles.

## 🎯 Overview

This platform provides two comprehensive virtual labs:

### CNN Virtual Lab
- Layer-by-layer visualization of neural network operations
- Interactive convolution, pooling, and activation modules
- Mathematical equations with real-time interpretation
- Synthetic image generation and manipulation
- Step-by-step Python code demonstrations

### SVM Virtual Lab
- Dataset playground with multiple patterns (linear, moon, circular)
- Kernel experimentation (Linear, Polynomial, RBF)
- Hyperparameter tuning with live visualization
- Training process animation
- Comprehensive evaluation metrics dashboard

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
│   ├── page.tsx              # Home page
│   ├── cnn/
│   │   └── page.tsx          # CNN Virtual Lab
│   ├── svm/
│   │   └── page.tsx          # SVM Virtual Lab
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                   # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── slider.tsx
│   │   └── tabs.tsx
│   ├── cnn/                  # CNN modules
│   │   ├── CNNTaskSelector.tsx
│   │   ├── ConvolutionModule.tsx
│   │   ├── PoolingModule.tsx
│   │   ├── ActivationModule.tsx
│   │   └── FullyConnectedModule.tsx
│   └── svm/                  # SVM modules
│       ├── SVMTaskSelector.tsx
│       ├── DatasetPlayground.tsx
│       ├── KernelLab.tsx
│       ├── TrainingVisualization.tsx
│       └── EvaluationDashboard.tsx
├── lib/
│   └── utils.ts              # Utility functions
├── public/                   # Static assets
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

### CNN Virtual Lab

1. **Convolution Operation**
   - View input image, kernel, and output feature map
   - Animate the convolution process step-by-step
   - Adjust stride and padding parameters
   - See mathematical formula with real values

2. **Pooling Operation**
   - Compare Max Pooling vs Average Pooling
   - Observe spatial dimension reduction
   - Understand feature preservation

3. **Activation Functions**
   - Experiment with ReLU, Sigmoid, and Tanh
   - View function graphs and transformations
   - Understand non-linearity importance

4. **Fully Connected Layer**
   - See how features combine for classification
   - View weight matrix operations
   - Understand softmax probability output

### SVM Virtual Lab

1. **Dataset Playground**
   - Generate different dataset patterns
   - Adjust noise and sample size
   - Visualize class distributions

2. **Kernel & Hyperparameters**
   - Experiment with Linear, Polynomial, and RBF kernels
   - Tune C (regularization) parameter
   - Adjust gamma for kernel functions
   - See mathematical formulas

3. **Training Visualization**
   - Watch step-by-step training process
   - Understand kernel mapping
   - See support vector selection
   - View final hyperplane formation

4. **Evaluation Dashboard**
   - View accuracy, precision, recall, F1-score
   - Analyze confusion matrix
   - Understand metric interpretations
   - See formula breakdowns

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
- Softmax for probability distribution

### SVM Topics
- Linear vs non-linear separability
- Kernel trick and feature mapping
- Support vectors and margin maximization
- Hyperparameter tuning (C, gamma, degree)
- Decision boundaries
- Classification metrics
- Confusion matrix analysis

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
1. **CNN Enhancements**
   - Custom image upload
   - More layer types (Batch Norm, Dropout)
   - Full network builder
   - Transfer learning demo
   - Real dataset integration

2. **SVM Enhancements**
   - Multi-class classification
   - SVM regression (SVR)
   - Cross-validation visualization
   - ROC curve analysis
   - Feature importance

3. **General Improvements**
   - User progress tracking
   - Quiz system with scoring
   - Export experiment reports
   - Collaborative learning features
   - Mobile app version

### Additional ML Topics
- Decision Trees
- Random Forests
- Neural Network Architectures
- Gradient Descent Visualization
- Backpropagation Animation

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
