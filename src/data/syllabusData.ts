import { SubjectSyllabus } from '@/types';

export const SYLLABUS_DATA: SubjectSyllabus[] = [
  // =========================================================================
  // 1. MACHINE LEARNING (ML - Course Code: 417521)
  // =========================================================================
  {
    code: 'ML',
    name: 'Machine Learning',
    courseCode: '417521',
    credits: 3,
    description: 'Advanced supervised learning, unsupervised clustering, ensemble architectures, and deep neural network optimization tailored for SPPU 2019 Pattern BE AI&DS.',
    units: [
      {
        unitNumber: 3,
        title: 'Supervised Learning II: Classification & Evaluation',
        weightageMarks: 18,
        overview: 'In-depth analysis of Support Vector Machines (SVM), K-Nearest Neighbors (KNN), Naive Bayes, Decision Trees, evaluation metrics, confusion matrix derivations, and multi-class classification strategies.',
        keyTopics: [
          'Support Vector Machines (SVM): Hard vs Soft Margin, Slack Variables, Dual Formulation',
          'Kernel Trick: Linear, Polynomial, Radial Basis Function (RBF), Sigmoid, Mercer Theorem',
          'K-Nearest Neighbors (KNN): Distance Metrics (Euclidean, Manhattan, Minkowski), Choice of K',
          'Decision Trees: ID3, C4.5, CART, Entropy, Information Gain, Gini Impurity, Pruning',
          'Performance Metrics: Precision, Recall, Specificity, Accuracy, F1-Score, ROC-AUC, PR Curves',
          'Multi-class Classification: One-vs-Rest (OvR), One-vs-One (OvO), Cost-Sensitive Learning'
        ],
        coreDerivations: [
          {
            title: 'Soft-Margin SVM Optimization with Slack Variables',
            description: 'Formulation of primal optimization problem minimizing weight vector norm and penalty on margin violations.',
            latexEquation: '\\min_{\\mathbf{w}, b, \\xi} \\frac{1}{2} \\|\\mathbf{w}\\|^2 + C \\sum_{i=1}^{N} \\xi_i \\quad \\text{s.t.} \\quad y_i(\\mathbf{w}^T \\mathbf{x}_i + b) \\ge 1 - \\xi_i, \\quad \\xi_i \\ge 0'
          },
          {
            title: 'Information Gain & Gini Impurity Equations',
            description: 'Splitting criteria used in Decision Tree construction (ID3 vs CART).',
            latexEquation: 'H(S) = -\\sum_{c=1}^{C} p_c \\log_2(p_c), \\quad IG(S, A) = H(S) - \\sum_{v \\in \\text{Values}(A)} \\frac{|S_v|}{|S|} H(S_v), \\quad Gini(S) = 1 - \\sum_{c=1}^{C} p_c^2'
          },
          {
            title: 'Multi-Class Macro vs Micro F1-Score Formulation',
            description: 'Derivations for evaluating imbalanced multi-class classifiers across C classes.',
            latexEquation: 'F1_{\\text{micro}} = \\frac{2 \\sum TP_i}{2 \\sum TP_i + \\sum FP_i + \\sum FN_i}, \\quad F1_{\\text{macro}} = \\frac{1}{C} \\sum_{i=1}^{C} \\frac{2 \\cdot P_i \\cdot R_i}{P_i + R_i}'
          }
        ],
        modelQuestions: [
          {
            id: 'ml-u3-q1',
            year: 'SPPU Dec 2023 / May 2024',
            marks: 10,
            bloomsLevel: 'Analyze',
            questionText: 'Explain Support Vector Machine (SVM) for linearly non-separable data. Formulate the soft margin optimization problem with slack variables and explain the role of hyperparameter C. Also define RBF and Polynomial kernels.',
            keyPoints: [
              'Slack variables (xi_i) permit controlled misclassification or margin violation',
              'Objective function balances margin maximization (1/2 ||w||^2) and penalty sum (C * sum xi_i)',
              'Hyperparameter C trades off margin width vs training error (high C = low bias, high variance)',
              'RBF Kernel: K(x, z) = exp(-gamma * ||x - z||^2)',
              'Polynomial Kernel: K(x, z) = (x^T z + c)^d'
            ],
            modelAnswerMarkdown: `### 1. Linearly Non-Separable SVM
When data cannot be cleanly separated by a hyperplane without error, we introduce non-negative **slack variables** $\\xi_i \\ge 0$ for each training instance $\\mathbf{x}_i$. 
- If $\\xi_i = 0$: The point is correctly classified on or outside the correct margin.
- If $0 < \\xi_i \\le 1$: The point is within the margin boundary but correctly classified.
- If $\\xi_i > 1$: The point is misclassified across the decision boundary.

### 2. Primal Optimization Problem
$$\\min_{\\mathbf{w}, b, \\boldsymbol{\\xi}} \\frac{1}{2} \\|\\mathbf{w}\\|^2 + C \\sum_{i=1}^{N} \\xi_i$$
$$\\text{subject to } y_i (\\mathbf{w}^T \\mathbf{x}_i + b) \\ge 1 - \\xi_i, \\quad \\xi_i \\ge 0 \\quad \\forall i=1,\\dots,N$$

### 3. Role of Regularization Parameter $C$
- **Large $C$ (Harder margin):** Heavy penalty on violations $\\sum \\xi_i$. Leads to narrow margin, strictly fitting training points $\\rightarrow$ low bias, risk of overfitting.
- **Small $C$ (Softer margin):** Tolerates more margin violations in exchange for a wider margin $\\rightarrow$ higher bias, better generalization on noisy datasets.

### 4. Kernel Functions
When input data in $\\mathbb{R}^d$ is not linearly separable, the **Kernel Trick** maps points to a higher-dimensional feature space $\\Phi(\\mathbf{x})$ without explicit coordinate computation:
1. **Radial Basis Function (RBF / Gaussian) Kernel:**
   $$K(\\mathbf{x}, \\mathbf{z}) = \\exp\\left( -\\gamma \\|\\mathbf{x} - \\mathbf{z}\\|^2 \\right), \\quad \\gamma = \\frac{1}{2\\sigma^2} > 0$$
2. **Polynomial Kernel:**
   $$K(\\mathbf{x}, \\mathbf{z}) = (\\mathbf{x}^T \\mathbf{z} + c)^d, \\quad c \\ge 0, \\; d \\in \\mathbb{N}$$`
          },
          {
            id: 'ml-u3-q2',
            year: 'SPPU May 2023',
            marks: 8,
            bloomsLevel: 'Apply',
            questionText: 'Given a 3-class confusion matrix with classes A, B, and C: [[40, 5, 5], [3, 45, 2], [2, 8, 40]]. Compute Class-wise Precision, Recall, Overall Accuracy, and Macro F1-Score.',
            keyPoints: [
              'Diagonal elements: TP_A = 40, TP_B = 45, TP_C = 40. Total samples = 150.',
              'Precision_A = 40/(40+3+2) = 40/45 = 0.8889',
              'Recall_A = 40/(40+5+5) = 40/50 = 0.8000',
              'Overall Accuracy = (40 + 45 + 40) / 150 = 125 / 150 = 83.33%',
              'Macro F1 is the unweighted arithmetic mean of individual class F1 scores.'
            ],
            modelAnswerMarkdown: `### Given Confusion Matrix:
| Predicted \\ Actual | Actual Class A | Actual Class B | Actual Class C | Column Sum (Predicted) |
|---|---|---|---|---|
| **Pred A** | **40** (TP_A) | 3 | 2 | 45 |
| **Pred B** | 5 | **45** (TP_B) | 8 | 58 |
| **Pred C** | 5 | 2 | **40** (TP_C) | 47 |
| **Row Sum (Actual)**| **50** | **50** | **50** | **Total = 150** |

### Step 1: Compute Class-wise Precision & Recall
1. **Class A:**
   $$P_A = \\frac{TP_A}{\\text{Total Pred A}} = \\frac{40}{45} \\approx 0.8889$$
   $$R_A = \\frac{TP_A}{\\text{Total Actual A}} = \\frac{40}{50} = 0.8000$$
   $$F1_A = \\frac{2 \\cdot P_A \\cdot R_A}{P_A + R_A} = \\frac{2 \\cdot 0.8889 \\cdot 0.8000}{0.8889 + 0.8000} = \\frac{1.4222}{1.6889} \\approx 0.8421$$

2. **Class B:**
   $$P_B = \\frac{TP_B}{\\text{Total Pred B}} = \\frac{45}{58} \\approx 0.7759$$
   $$R_B = \\frac{TP_B}{\\text{Total Actual B}} = \\frac{45}{50} = 0.9000$$
   $$F1_B = \\frac{2 \\cdot 0.7759 \\cdot 0.9000}{0.7759 + 0.9000} = \\frac{1.3966}{1.6759} \\approx 0.8333$$

3. **Class C:**
   $$P_C = \\frac{TP_C}{\\text{Total Pred C}} = \\frac{40}{47} \\approx 0.8511$$
   $$R_C = \\frac{TP_C}{\\text{Total Actual C}} = \\frac{40}{50} = 0.8000$$
   $$F1_C = \\frac{2 \\cdot 0.8511 \\cdot 0.8000}{0.8511 + 0.8000} = \\frac{1.3618}{1.6511} \\approx 0.8248$$

### Step 2: Compute Macro-Averages & Accuracy
- **Overall Accuracy:**
  $$\\text{Accuracy} = \\frac{\\sum TP_i}{\\text{Total}} = \\frac{40 + 45 + 40}{150} = \\frac{125}{150} \\approx 83.33\\%$$
- **Macro F1-Score:**
  $$F1_{\\text{macro}} = \\frac{F1_A + F1_B + F1_C}{3} = \\frac{0.8421 + 0.8333 + 0.8248}{3} = \\frac{2.5002}{3} \\approx 0.8334 \\; (83.34\\%)$$`
          }
        ]
      },
      {
        unitNumber: 4,
        title: 'Unsupervised Learning: Clustering & Density Estimation',
        weightageMarks: 18,
        overview: 'Partitioning methods (K-Means, K-Medoids), Hierarchical Clustering, Density-Based Spatial Clustering of Applications with Noise (DBSCAN), Gaussian Mixture Models (GMM) with Expectation-Maximization (EM), and Dimensionality Reduction (PCA, MDS).',
        keyTopics: [
          'K-Means: Centroid Update Algorithm, Convergence, WCSS, Elbow Method, Silhouette Score',
          'Hierarchical Clustering: Agglomerative vs Divisive, Linkage Criteria (Single, Complete, Average)',
          'DBSCAN: Core Points, Border Points, Noise Points, Epsilon (eps) and MinPts Parameters',
          'Gaussian Mixture Models (GMM): Latent Variables, Expectation-Maximization (EM) Algorithm',
          'Dimensionality Reduction: Principal Component Analysis (PCA) Eigen-decomposition, MDS'
        ],
        coreDerivations: [
          {
            title: 'K-Means Objective Function (WCSS)',
            description: 'Within-Cluster Sum of Squares minimization and mean centroid update step.',
            latexEquation: 'J = \\sum_{k=1}^{K} \\sum_{i \\in C_k} \\|\\mathbf{x}_i - \\boldsymbol{\\mu}_k\\|^2, \\quad \\boldsymbol{\\mu}_k = \\frac{1}{|C_k|} \\sum_{i \\in C_k} \\mathbf{x}_i'
          },
          {
            title: 'GMM Expectation-Maximization Step Equations',
            description: 'E-step posterior responsibility calculation and M-step parameter updates (means, covariance, mixture weights).',
            latexEquation: '\\gamma_{ik} = \\frac{\\pi_k \\mathcal{N}(\\mathbf{x}_i | \\boldsymbol{\\mu}_k, \\boldsymbol{\\Sigma}_k)}{\\sum_{j=1}^{K} \\pi_j \\mathcal{N}(\\mathbf{x}_i | \\boldsymbol{\\mu}_j, \\boldsymbol{\\Sigma}_j)}, \\quad \\boldsymbol{\\mu}_k^{\\text{new}} = \\frac{\\sum_{i=1}^N \\gamma_{ik} \\mathbf{x}_i}{\\sum_{i=1}^N \\gamma_{ik}}'
          }
        ],
        modelQuestions: [
          {
            id: 'ml-u4-q1',
            year: 'SPPU Dec 2022 / Dec 2023',
            marks: 10,
            bloomsLevel: 'Understand',
            questionText: 'Explain the DBSCAN clustering algorithm in detail. Define core points, border points, and noise points with diagrams. What are the advantages of DBSCAN over K-Means?',
            keyPoints: [
              'Parameters: Epsilon (eps) - neighborhood radius; MinPts - minimum points required in eps-neighborhood',
              'Core Point: Has >= MinPts within its eps-neighborhood',
              'Border Point: Has < MinPts within eps, but is reachable from a Core Point',
              'Noise Point: Neither Core nor Border point',
              'Advantages: Discovers arbitrary shaped clusters, no pre-defined K, robust to outliers'
            ],
            modelAnswerMarkdown: `### 1. DBSCAN Overview
**DBSCAN** (Density-Based Spatial Clustering of Applications with Noise) groups points that are closely packed together (points with many nearby neighbors) and marks points in low-density regions as outliers.

### 2. Core Definitions (Given $\\varepsilon$ and $MinPts$)
1. **$\\varepsilon$-Neighborhood ($N_\\varepsilon(p)$):** 
   $$N_\\varepsilon(p) = \\{ q \\in D \\mid \\text{dist}(p, q) \\le \\varepsilon \\}$$
2. **Core Point ($p$):** 
   A point where $|N_\\varepsilon(p)| \\ge MinPts$.
3. **Border Point ($q$):** 
   A point where $|N_\\varepsilon(q)| < MinPts$, but $q \\in N_\\varepsilon(p)$ for some core point $p$.
4. **Noise Point ($r$):** 
   A point that is neither a core point nor a border point.
5. **Directly Density-Reachable:** Point $q$ is directly reachable from core point $p$ if $q \\in N_\\varepsilon(p)$.
6. **Density-Connected:** Points $p$ and $q$ are density-connected if there exists a point $o$ such that both $p$ and $q$ are density-reachable from $o$.

### 3. Comparison: DBSCAN vs. K-Means
| Feature | K-Means | DBSCAN |
|---|---|---|
| **Cluster Shape** | Spherical / convex only | Arbitrary shapes (crescents, rings, spirals) |
| **Number of Clusters $K$**| Must specify $K$ upfront | Automatically discovered from density |
| **Noise Handling** | Forces all outliers into clusters | Explicitly labels noise as $-1$ |
| **Sensitivity** | Sensitive to initial centroid seeds | Sensitive to choice of $\\varepsilon$ and $MinPts$ |
| **Time Complexity** | $\\mathcal{O}(I \\cdot K \\cdot N \\cdot d)$ | $\\mathcal{O}(N \\log N)$ with spatial indexing (R-Tree/KD-Tree) |`
          }
        ]
      },
      {
        unitNumber: 5,
        title: 'Ensemble Learning & Meta-Classifiers',
        weightageMarks: 18,
        overview: 'Bootstrap Aggregation (Bagging), Random Forests, Boosting (AdaBoost, Gradient Boosting, XGBoost), Voting Ensembles (Hard vs Soft), Stacking, and Out-of-Bag (OOB) error estimation.',
        keyTopics: [
          'Bagging: Bootstrap sampling, Variance reduction, Out-of-Bag (OOB) error estimation',
          'Random Forests: Random subspace method, Feature sub-sampling (sqrt(d)), Tree correlation reduction',
          'AdaBoost: Weak classifiers (Decision Stumps), Exponential loss minimization, Sample weight updates',
          'Gradient Boosting & XGBoost: Residual fitting, Gradient descent in function space, Shrinkage',
          'Voting & Stacking: Hard vs Soft voting, Meta-classifier blending, Multi-stage stacked generalization'
        ],
        coreDerivations: [
          {
            title: 'AdaBoost Classifier Weight & Sample Weight Update',
            description: 'Derivation of weak classifier weight alpha_t and exponential sample weight update formula.',
            latexEquation: '\\epsilon_t = \\sum_{i: h_t(x_i) \\ne y_i} w_i^{(t)}, \\quad \\alpha_t = \\frac{1}{2} \\ln\\left(\\frac{1 - \\epsilon_t}{\\epsilon_t}\\right), \\quad w_i^{(t+1)} = \\frac{w_i^{(t)} \\exp(-\\alpha_t y_i h_t(x_i))}{Z_t}'
          },
          {
            title: 'Out-of-Bag (OOB) Probability in Bootstrap Sampling',
            description: 'Proof that approximately 36.8% of samples are unselected in a bootstrap sample of size N as N approaches infinity.',
            latexEquation: 'P(\\text{Not Selected}) = \\lim_{N \\to \\infty} \\left(1 - \\frac{1}{N}\\right)^N = \\frac{1}{e} \\approx 0.367879 \\; (36.8\\%)'
          }
        ],
        modelQuestions: [
          {
            id: 'ml-u5-q1',
            year: 'SPPU May 2024',
            marks: 10,
            bloomsLevel: 'Analyze',
            questionText: 'Explain the AdaBoost algorithm step-by-step. Show how sample weights and classifier weights are updated across iterations. Why does AdaBoost focus on hard-to-classify samples?',
            keyPoints: [
              'Initial sample weights: w_i = 1/N for all i = 1 to N',
              'Compute weighted error rate epsilon_t = sum of weights of misclassified instances',
              'Compute classifier weight alpha_t = 0.5 * ln((1 - epsilon_t) / epsilon_t)',
              'Update weights: multiply by exp(-alpha_t) for correct, exp(+alpha_t) for incorrect',
              'Normalize weights by Z_t so that sum(w_i^(t+1)) = 1'
            ],
            modelAnswerMarkdown: `### 1. AdaBoost (Adaptive Boosting) Concept
AdaBoost converts a set of **weak learners** (e.g., single-split decision stumps) into a single strong classifier by sequentially training models, where each subsequent model pays more attention to the instances misclassified by earlier models.

### 2. Step-by-Step Algorithm
1. **Initialize Sample Weights:**
   For a dataset of $N$ samples with labels $y_i \\in \\{-1, +1\\}$:
   $$w_i^{(1)} = \\frac{1}{N}, \\quad i = 1, 2, \\dots, N$$

2. **For iteration $t = 1, 2, \\dots, T$:**
   - **Fit Weak Classifier:** Train weak learner $h_t(\\mathbf{x}) \\in \\{-1, +1\\}$ using distribution $\\mathbf{w}^{(t)}$.
   - **Compute Weighted Error Rate $\\epsilon_t$:**
     $$\\epsilon_t = \\sum_{i=1}^{N} w_i^{(t)} \\cdot \\mathbb{I}(y_i \\ne h_t(\\mathbf{x}_i))$$
   - **Compute Classifier Importance $\\alpha_t$:**
     $$\\alpha_t = \\frac{1}{2} \\ln\\left( \\frac{1 - \\epsilon_t}{\\epsilon_t} \\right)$$
     *(If $\\epsilon_t < 0.5$, $\\alpha_t > 0$; as error approaches $0$, $\\alpha_t \\to +\\infty$)*
   - **Update Instance Weights:**
     $$w_i^{(t+1)} = \\frac{w_i^{(t)} \\exp\\left( -\\alpha_t y_i h_t(\\mathbf{x}_i) \\right)}{Z_t}$$
     where $Z_t$ is the normalization factor:
     $$Z_t = \\sum_{i=1}^{N} w_i^{(t)} \\exp\\left( -\\alpha_t y_i h_t(\\mathbf{x}_i) \\right)$$

3. **Final Strong Classifier Output:**
   $$H(\\mathbf{x}) = \\text{sign}\\left( \\sum_{t=1}^{T} \\alpha_t h_t(\\mathbf{x}) \\right)$$`
          }
        ]
      },
      {
        unitNumber: 6,
        title: 'Deep Learning & Neural Network Optimization',
        weightageMarks: 18,
        overview: 'Multilayer Perceptron (MLP), Backpropagation gradient derivation, Activation functions, Convolutional Neural Networks (CNN), Recurrent Neural Networks (RNN/LSTM), and modern optimizers (SGD, RMSProp, Adam).',
        keyTopics: [
          'Feedforward Neural Networks: Perceptron, Multi-Layer Perceptron (MLP), Universal Approximation',
          'Backpropagation: Chain rule, Gradient computation for weights and biases, Vanishing/Exploding gradients',
          'Activation Functions: Sigmoid, Tanh, ReLU, Leaky ReLU, Parametric ReLU, Softmax',
          'Convolutional Neural Networks (CNN): Convolution layer, Stride, Padding, Pooling, Receptive field',
          'Recurrent Neural Networks (RNN & LSTM): BPTT, Memory cell, Forget gate, Input gate, Output gate',
          'Optimization: Stochastic Gradient Descent (SGD), Momentum, RMSprop, Adam optimizer'
        ],
        coreDerivations: [
          {
            title: 'Backpropagation Weight Gradient with Chain Rule',
            description: 'Derivation of error gradient with respect to hidden-to-output and input-to-hidden weights.',
            latexEquation: '\\frac{\\partial E}{\\partial w_{jk}} = \\frac{\\partial E}{\\partial \\hat{y}_k} \\frac{\\partial \\hat{y}_k}{\\partial z_k} \\frac{\\partial z_k}{\\partial w_{jk}} = - (y_k - \\hat{y}_k) \\cdot \\sigma\'(z_k) \\cdot a_j'
          },
          {
            title: 'CNN Output Feature Map Dimensions Formula',
            description: 'Spatial dimension calculation of output feature map given input size W, kernel size K, padding P, and stride S.',
            latexEquation: 'W_{\\text{out}} = \\left\\lfloor \\frac{W_{\\text{in}} - K + 2P}{S} \\right\\rfloor + 1'
          }
        ],
        modelQuestions: [
          {
            id: 'ml-u6-q1',
            year: 'SPPU Dec 2023 / May 2024',
            marks: 10,
            bloomsLevel: 'Evaluate',
            questionText: 'Explain the architecture and working of a Convolutional Neural Network (CNN). Calculate the output size and total number of trainable parameters for a convolutional layer having an input volume of 32x32x3, 16 filters of size 5x5, stride 1, and padding 2.',
            keyPoints: [
              'CNN key components: Convolution layer, ReLU activation, Pooling (Max/Avg), Fully Connected (FC)',
              'Spatial formula: W_out = floor((W_in - K + 2P)/S) + 1',
              'Output width = floor((32 - 5 + 2*2)/1) + 1 = floor(31/1) + 1 = 32',
              'Output volume dimensions: 32 x 32 x 16',
              'Trainable parameters per filter = (5 * 5 * 3) + 1 (bias) = 76 parameters',
              'Total parameters = 16 * 76 = 1,216 parameters'
            ],
            modelAnswerMarkdown: `### 1. CNN Architecture & Working
A **Convolutional Neural Network** processes grid-structured inputs (e.g., images) through three core mechanisms:
1. **Local Receptive Fields:** Neurons connect only to a local spatial patch of the previous layer.
2. **Weight Sharing:** The same kernel weights are convolved across the entire input, drastically reducing parameter count.
3. **Spatial Subsampling (Pooling):** Reduces spatial resolution while preserving translational invariance.

### 2. Numerical Parameter & Output Calculation
**Given:**
- Input Volume: $W_{\\text{in}} \\times H_{\\text{in}} \\times C_{\\text{in}} = 32 \\times 32 \\times 3$
- Filter Dimensions: $K \\times K = 5 \\times 5$
- Number of Filters: $N = 16$
- Stride: $S = 1$
- Padding: $P = 2$

#### A. Output Spatial Dimensions
$$W_{\\text{out}} = \\left\\lfloor \\frac{W_{\\text{in}} - K + 2P}{S} \\right\\rfloor + 1 = \\left\\lfloor \\frac{32 - 5 + 2(2)}{1} \\right\\rfloor + 1 = \\left\\lfloor \\frac{31}{1} \\right\\rfloor + 1 = 32$$
$$H_{\\text{out}} = \\left\\lfloor \\frac{H_{\\text{in}} - K + 2P}{S} \\right\\rfloor + 1 = 32$$
$$\\mathbf{\\text{Output Feature Map Volume}} = 32 \\times 32 \\times 16$$

#### B. Total Trainable Parameters
- Parameters per filter = $(\\text{Kernel Width} \\times \\text{Kernel Height} \\times \\text{Input Channels}) + 1 \\text{ (bias)}$
  $$\\text{Params per filter} = (5 \\times 5 \\times 3) + 1 = 75 + 1 = 76$$
- For all 16 filters:
  $$\\mathbf{\\text{Total Trainable Parameters}} = 16 \\times 76 = \\mathbf{1,216 \\text{ parameters}}$$`
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 2. DATA MINING & VISUALIZATION (DMV - Course Code: 417522)
  // =========================================================================
  {
    code: 'DMV',
    name: 'Data Mining & Visualization',
    courseCode: '417522',
    credits: 3,
    description: 'Data wrangling, visual encoding theory, graph drawing algorithms, exploratory data analysis with Pandas/Seaborn, and production analytical dashboards.',
    units: [
      {
        unitNumber: 3,
        title: 'Data Visualization Foundations & Visual Encodings',
        weightageMarks: 18,
        overview: 'Historical development of graphics, statistical historiography, visual variables and marks, 2D vs 3D visualization shortcomings, human visual perception, and Mackinlays ranking of visual encodings.',
        keyTopics: [
          'History of Data Visualization: Playfair, Minard, Nightingale, Tukey exploratory graphics',
          'Visual Variables: Position, Length, Angle, Direction, Area, Volume, Color Hue, Color Saturation',
          'Mackinlays Expressiveness & Effectiveness Criteria for Quantitative, Ordinal, and Nominal data',
          '3D Visualization Shortcomings: Occlusion, Perspective Distortion, Lie Factor, Data-Ink Ratio',
          'Visual Analytics Process: Sensemaking loop, visual exploratory cycle, analytical interaction'
        ],
        coreDerivations: [
          {
            title: 'Tufte Lie Factor Formulation',
            description: 'Mathematical quantification of graphical distortion in published charts.',
            latexEquation: '\\text{Lie Factor} = \\frac{\\text{Size of effect shown in graphic}}{\\text{Size of effect in data}} = \\frac{\\frac{|\\text{Graphic Value}_2 - \\text{Graphic Value}_1|}{\\text{Graphic Value}_1}}{\\frac{|\\text{Data Value}_2 - \\text{Data Value}_1|}{\\text{Data Value}_1}}'
          },
          {
            title: 'Data-Ink Ratio Formula',
            description: 'Tufte efficiency metric for analytical charts.',
            latexEquation: '\\text{Data-Ink Ratio} = \\frac{\\text{Data-Ink}}{\\text{Total Ink used to print graphic}} = 1.0 - \\text{Proportion of chartjunk}'
          }
        ],
        modelQuestions: [
          {
            id: 'dmv-u3-q1',
            year: 'SPPU Dec 2023',
            marks: 8,
            bloomsLevel: 'Understand',
            questionText: 'Explain Mackinlay ranking of visual encodings for quantitative, ordinal, and nominal data types. Why is position the most effective visual channel across all data types?',
            keyPoints: [
              'Quantitative ranking: Position > Length > Angle > Slope > Area > Volume > Color Saturation > Color Hue',
              'Ordinal ranking: Position > Density > Color Saturation > Color Hue > Texture > Connection > Length',
              'Nominal ranking: Position > Color Hue > Texture > Connection > Containment > Density > Shape',
              'Position on a common aligned scale minimizes cognitive decoding errors and leverages human stereoscopic precision.'
            ],
            modelAnswerMarkdown: `### 1. Mackinlay Ranking of Visual Channels
Jock Mackinlay extended Jacques Bertin semiology of graphics by ranking visual variables by human perceptual decoding accuracy:

| Rank | Quantitative Data | Ordinal Data | Nominal Data |
|---|---|---|---|
| **1 (Best)** | **Position (Common Scale)** | **Position (Common Scale)** | **Position (Common Scale)** |
| **2** | Position (Non-aligned Scale) | Position (Non-aligned) | **Color Hue** |
| **3** | Length | Density / Shading | Texture |
| **4** | Angle / Slope | Color Saturation | Connection / Links |
| **5** | Area | Color Hue | Containment / Enclosure |
| **6** | Volume | Texture | Density / Shading |
| **7** | Color Saturation | Connection | Color Saturation |
| **8** | Color Hue | Containment | Shape |

### 2. Why Position Dominates Across All Types
Human psychophysical perception (Stevens Power Law) processes **spatial position** pre-attentively with the lowest error rate. Unlike area or color saturation which suffers from non-linear perception ($S = I^n$ where $n \\ne 1$), aligned 1D/2D positions provide an exact $1:1$ linear mapping to human cognitive estimation.`
          }
        ]
      },
      {
        unitNumber: 4,
        title: 'Data Handling, Wrangling & Graph Drawing',
        weightageMarks: 18,
        overview: 'Data cleaning, missing value imputation (MCAR, MAR, MNAR), data transformation, Multi-Dimensional Scaling (MDS), and Graph Drawing Layouts (Spring Embedders, Force-Directed Models, Hookes & Coulombs Law).',
        keyTopics: [
          'Data Wrangling: Reshaping, Melting, Pivoting, Imputation (Mean, KNN, MICE), Scaling',
          'Multidimensional Scaling (MDS): Classical MDS, Stress function minimization, Proximity matrices',
          'Graph Drawing Principles: Readability criteria (crossings minimization, symmetry, uniform edge length)',
          'Force-Directed Graph Layouts: Spring Embedder (Eades), Fruchterman-Reingold, Hookes Law & Coulombs Law',
          'Bipartite Graph Layouts: Layered drawing, Sugiyama framework for directed graphs'
        ],
        coreDerivations: [
          {
            title: 'Force-Directed Graph Physics Forces',
            description: 'Equations for attractive spring forces between connected nodes and repulsive electrostatic forces between all node pairs.',
            latexEquation: 'F_{\\text{attr}}(d) = \\frac{d^2}{k}, \\quad F_{\\text{rep}}(d) = -\\frac{k^2}{d}, \\quad k = C \\sqrt{\\frac{\\text{Area}}{|V|}}'
          },
          {
            title: 'MDS Stress Minimization Function',
            description: 'Kruskal Stress-1 objective function measuring distortion of low-dimensional distances.',
            latexEquation: '\\sigma_D(\\mathbf{X}) = \\sqrt{\\frac{\\sum_{i < j} (d_{ij}(\\mathbf{X}) - \\delta_{ij})^2}{\\sum_{i < j} \\delta_{ij}^2}}'
          }
        ],
        modelQuestions: [
          {
            id: 'dmv-u4-q1',
            year: 'SPPU May 2024',
            marks: 10,
            bloomsLevel: 'Analyze',
            questionText: 'Explain the Fruchterman-Reingold Force-Directed Graph drawing algorithm. State the formulas for attractive and repulsive forces, and explain how the temperature parameter cools over iterations.',
            keyPoints: [
              'Nodes behave like charged particles repelling each other; edges behave like springs attracting connected nodes.',
              'Optimal distance k = sqrt(Area / |V|)',
              'Repulsive force between any two vertices u, v: f_r(d) = k^2 / d',
              'Attractive force between adjacent vertices u, v: f_a(d) = d^2 / k',
              'Temperature T controls maximum displacement per iteration and decreases geometrically: T_{new} = T_{old} * cooling_factor'
            ],
            modelAnswerMarkdown: `### 1. Fruchterman-Reingold Algorithm Overview
The **Fruchterman-Reingold** layout simulates a physical system to produce aesthetically pleasing graph layouts with uniform edge lengths, minimal edge crossings, and symmetric node distributions.

### 2. Mathematical Equations
Let $k$ be the optimal distance between vertices:
$$k = C \\cdot \\sqrt{\\frac{\\text{Width} \\times \\text{Height}}{|V|}}$$

1. **Repulsive Force (Applied between ALL node pairs $u, v \\in V$):**
   $$f_r(d) = \\frac{k^2}{d}$$
   $$\\mathbf{F}_r(u, v) = \\frac{\\mathbf{p}_u - \\mathbf{p}_v}{\\|\\mathbf{p}_u - \\mathbf{p}_v\\|} \\cdot \\frac{k^2}{\\|\\mathbf{p}_u - \\mathbf{p}_v\\|}$$

2. **Attractive Force (Applied ONLY between connected edges $(u, v) \\in E$):**
   $$f_a(d) = \\frac{d^2}{k}$$
   $$\\mathbf{F}_a(u, v) = \\frac{\\mathbf{p}_v - \\mathbf{p}_u}{\\|\\mathbf{p}_v - \\mathbf{p}_u\\|} \\cdot \\frac{\\|\\mathbf{p}_v - \\mathbf{p}_u\\|^2}{k}$$

### 3. Cooling Schedule & Displacement
At each iteration $t$:
$$\\mathbf{d}_v = \\sum_{u \\ne v} \\mathbf{F}_r(u, v) + \\sum_{(u, v) \\in E} \\mathbf{F}_a(u, v)$$
$$\\mathbf{p}_v^{\\text{new}} = \\mathbf{p}_v + \\frac{\\mathbf{d}_v}{\\|\\mathbf{d}_v\\|} \\cdot \\min(\\|\\mathbf{d}_v\\|, T(t))$$
$$\\text{Cooling:} \\quad T(t+1) = T(t) \\cdot \\gamma \\quad (\\text{where } 0.90 \\le \\gamma < 1.0)$$`
          }
        ]
      },
      {
        unitNumber: 5,
        title: 'Exploratory Data Analysis & Split-Apply-Combine',
        weightageMarks: 18,
        overview: 'Pandas Split-Apply-Combine paradigm, multi-dimensional groupby aggregations, window operations, exploratory visualization with Seaborn/Matplotlib, and statistical storytelling.',
        keyTopics: [
          'Split-Apply-Combine Strategy: Hadley Wickham data manipulation framework in Pandas',
          'GroupBy Operations: Aggregation, Transformation, Filtration, and MultiIndex unstacking',
          'Statistical Charts: Boxplots (IQR, whiskers), Violin plots, Kernel Density Estimation (KDE)',
          'Multi-Panel Encodings: FacetGrid, PairGrid, JointPlot, Heatmaps with Hierarchical Dendrograms',
          'Time Series Visualization: Lag plots, Autocorrelation, Seasonal decomposition (STL)'
        ],
        coreDerivations: [
          {
            title: 'Tukey Boxplot Whisker Bounds',
            description: 'Formulas for detecting lower and upper outliers in statistical exploratory charts.',
            latexEquation: 'IQR = Q_3 - Q_1, \\quad \\text{Lower Bound} = Q_1 - 1.5 \\cdot IQR, \\quad \\text{Upper Bound} = Q_3 + 1.5 \\cdot IQR'
          }
        ],
        modelQuestions: [
          {
            id: 'dmv-u5-q1',
            year: 'SPPU Dec 2023',
            marks: 8,
            bloomsLevel: 'Apply',
            questionText: 'Explain the Split-Apply-Combine strategy with diagrams. Write Python Pandas code to compute the median salary and count of employees per department, filtering out departments with fewer than 5 employees.',
            keyPoints: [
              'Split: Partition DataFrame into subsets based on key',
              'Apply: Execute statistical function independently on each subset',
              'Combine: Merge resulting summary vectors into a unified DataFrame',
              'Pandas functions: groupby(), agg(), filter(), transform()'
            ],
            modelAnswerMarkdown: `### 1. Split-Apply-Combine Paradigm
1. **Split:** Breaks a dataset into distinct groups based on one or more categorical keys.
2. **Apply:** Operates on each group independently via:
   - *Aggregation:* Computes summary statistics (mean, median, sum).
   - *Transformation:* Returns group-aligned array of identical size (z-score normalization).
   - *Filtration:* Discards entire groups based on boolean criteria.
3. **Combine:** Assembles the computed individual group results into a single cohesive data structure.

### 2. Executable Pandas Implementation
\`\`\`python
import pandas as pd

# Sample DataFrame
data = {
    'Department': ['AI', 'AI', 'AI', 'AI', 'AI', 'HR', 'HR', 'IT', 'IT', 'IT'],
    'Salary': [95000, 105000, 110000, 92000, 120000, 60000, 65000, 85000, 90000, 88000]
}
df = pd.DataFrame(data)

# Step 1: Filter groups with >= 5 employees
filtered_df = df.groupby('Department').filter(lambda g: len(g) >= 5)

# Step 2: Apply median and count aggregations
result = filtered_df.groupby('Department')['Salary'].agg(
    median_salary='median',
    employee_count='count'
).reset_index()

print(result)
\`\`\``
          }
        ]
      },
      {
        unitNumber: 6,
        title: 'Advanced Visualization & Analytical Dashboards',
        weightageMarks: 18,
        overview: 'Interactive web dashboards (Dash, Streamlit), Geospatial data mapping (Choropleths, GeoJSON), Gestalt principles in analytical UI, and visualization ethics.',
        keyTopics: [
          'Dashboard Architecture: Layout grids, reactive state, callback graphs, caching in Streamlit/Dash',
          'Geospatial Visualization: Latitude/Longitude projections, Choropleth maps, Bubble maps, Isochrones',
          'Gestalt Principles in UI: Proximity, Similarity, Enclosure, Continuity, Closure, Connection',
          'Interactive Techniques: Brushing and Linking, Dynamic Queries, Semantic Zooming, Overview+Detail',
          'Visualization Auditing: Cognitive load reduction, accessibility (colorblind-safe palettes: Viridis, ColorBrewer)'
        ],
        coreDerivations: [
          {
            title: 'Choropleth Color Scale Quantization',
            description: 'Classification equations for binning geographic continuous data (Jenks Natural Breaks vs Equal Interval).',
            latexEquation: '\\text{Interval Width} = \\frac{\\text{Max} - \\text{Min}}{k}, \\quad \\text{Jenks: } \\min \\sum_{j=1}^k \\sum_{i \\in C_j} (x_i - \\bar{x}_j)^2'
          }
        ],
        modelQuestions: [
          {
            id: 'dmv-u6-q1',
            year: 'SPPU May 2023',
            marks: 8,
            bloomsLevel: 'Understand',
            questionText: 'Explain the Gestalt Principles of Visual Perception and how they guide the design of production analytical dashboards.',
            keyPoints: [
              'Proximity: Elements placed close together are perceived as a related logical card or metric group.',
              'Similarity: Elements sharing color, shape, or typography are perceived as having similar semantic meaning.',
              'Enclosure / Common Region: Grouping widgets inside a bordered card creates an explicit cognitive boundary.',
              'Continuity: Aligned grid elements guide visual scan paths across KPI rows.',
              'Connection: Lines connecting nodes or chart elements explicitly signal causal relationships.'
            ],
            modelAnswerMarkdown: `### 1. Gestalt Principles in Dashboard Architecture
1. **Law of Proximity:** Visual elements close to each other are grouped mentally. *Dashboard Application:* KPI value and its corresponding percentage change are placed immediately adjacent.
2. **Law of Common Region (Enclosure):** Elements enclosed within a clear boundary (cards with subtle border \`#27272a\`) are perceived as an atomic module.
3. **Law of Similarity:** Consistent visual encodings signal identical roles. *Dashboard Application:* All positive Delta metrics use identical emerald badges (\`#34d399\`), and all warnings use rose badges (\`#fb7185\`).
4. **Law of Continuity:** Eyes naturally follow smooth continuous paths. *Dashboard Application:* Aligning filter panels along the top or left vertical axis establishes a natural top-to-bottom visual hierarchy.`
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 3. BIOINFORMATICS (BIF - Course Code: 417523)
  // =========================================================================
  {
    code: 'BIF',
    name: 'Bioinformatics',
    courseCode: '417523',
    credits: 3,
    description: 'Structural bioinformatics, Homology modeling, CADD molecular docking, Systems biology networks, Genomic data mining, and Phylogenetic sequence alignments.',
    units: [
      {
        unitNumber: 3,
        title: 'Structural Bioinformatics & Computer-Aided Drug Design',
        weightageMarks: 18,
        overview: 'Protein primary to quaternary structures, Ramachandran plot steric analysis, Homology modeling 4-step pipeline, Computer-Aided Drug Design (CADD), and molecular docking simulation.',
        keyTopics: [
          'Protein Hierarchy: Peptide bonds, dihedral angles (Phi phi, Psi psi, Omega omega)',
          'Ramachandran Plot: Steric clashes, allowed regions for alpha-helices and beta-sheets, Glycine/Proline exceptions',
          'Homology Modeling: Template selection (BLAST), Target-Template alignment, Model building, Validation (ProCheck)',
          'CADD: Structure-Based Drug Design (SBDD) vs Ligand-Based Drug Design (LBDD), Pharmacophore modeling',
          'Molecular Docking: Rigid vs Flexible docking, Scoring functions (electrostatic, van der Waals, desolvation)'
        ],
        coreDerivations: [
          {
            title: 'Peptide Dihedral Angles Definition',
            description: 'Torsion angles defining protein backbone conformation.',
            latexEquation: '\\phi \\; (\\text{C}_{\\alpha}-\\text{N}), \\quad \\psi \\; (\\text{C}_{\\alpha}-\\text{C}\'), \\quad \\omega \\; (\\text{C}\'-\\text{N} \\approx 180^\\circ \\text{ trans planar})'
          }
        ],
        modelQuestions: [
          {
            id: 'bif-u3-q1',
            year: 'SPPU Dec 2023',
            marks: 10,
            bloomsLevel: 'Analyze',
            questionText: 'Explain the Ramachandran plot in detail. What are the allowed and disallowed regions for secondary structures? Why is Glycine found in disallowed regions and Proline severely restricted?',
            keyPoints: [
              'Plots Phi (C_alpha - N) on X-axis (-180 to +180) vs Psi (C_alpha - C) on Y-axis (-180 to +180)',
              'Top-Left quadrant: Beta-pleated sheets (parallel and anti-parallel) and collagen triple helix',
              'Bottom-Left quadrant: Right-handed alpha-helices (Phi approx -57, Psi approx -47)',
              'Top-Right quadrant: Left-handed alpha-helices',
              'Glycine has only Hydrogen atom as side-chain, zero steric hindrance -> appears in disallowed zones',
              'Proline has cyclic pyrrolidine ring locking Phi angle at approx -65 degrees -> highly restricted'
            ],
            modelAnswerMarkdown: `### 1. Ramachandran Plot Fundamentals
Developed by G.N. Ramachandran in 1963, the **Ramachandran Plot** visualizes energetically allowed regions for backbone dihedral angles $\\phi$ (phi) and $\\psi$ (psi) of amino acid residues in a protein.

### 2. Secondary Structure Angle Regions
| Region | $\\phi$ (Phi) Range | $\\psi$ (Psi) Range | Structure Conformation |
|---|---|---|---|
| **Top-Left (Quadrant II)** | $-180^\\circ$ to $-45^\\circ$ | $+45^\\circ$ to $+180^\\circ$ | **$\\beta$-Sheets** (Anti-parallel: $-139, +135$; Parallel: $-119, +113$), Collagen |
| **Bottom-Left (Quadrant III)**| $-180^\\circ$ to $-45^\\circ$ | $-70^\\circ$ to $-30^\\circ$ | **Right-handed $\\alpha$-Helix** (Ideal: $\\phi \\approx -57^\\circ, \\psi \\approx -47^\\circ$) |
| **Top-Right (Quadrant I)** | $+30^\\circ$ to $+90^\\circ$ | $+30^\\circ$ to $+90^\\circ$ | **Left-handed $\\alpha$-Helix** |
| **Bottom-Right (Quadrant IV)**| $+30^\\circ$ to $+180^\\circ$| $-180^\\circ$ to $0^\\circ$ | **Disallowed** (Severe steric clash between carbonyl oxygen and side chains) |

### 3. Special Amino Acids
1. **Glycine (Gly):** Has only a single hydrogen atom ($-H$) as its side chain ($R$-group). Due to minimal steric hindrance, Glycine can adopt conformations across virtually all quadrants, including normally disallowed regions.
2. **Proline (Pro):** The cyclic 5-membered pyrrolidine ring connects the side chain back to the backbone nitrogen, locking $\\phi$ rigid at approximately $-65^\\circ \\pm 15^\\circ$.`
          }
        ]
      },
      {
        unitNumber: 4,
        title: 'Systems Biology & Biological Networks',
        weightageMarks: 18,
        overview: 'Gene Regulatory Networks (GRN), Metabolic networks, Protein-Protein Interaction (PPI) networks, Cytoscape network topological metrics, and differential equation modeling in biological pathways.',
        keyTopics: [
          'Biological Networks: Scale-free properties, Power-law degree distribution P(k) ~ k^(-gamma), Hub nodes',
          'Topological Metrics: Node degree, Clustering coefficient, Betweenness centrality, Closeness centrality',
          'Network Motifs: Feed-Forward Loops (Coherent vs Incoherent), Single-Input Modules, Dense Overlapping Regulons',
          'Cytoscape: Biological network visualization, clustering plugins (MCODE, ClusterMaker), GO enrichment',
          'Mathematical Modeling: Ordinary Differential Equations (ODEs) for enzyme kinetics (Michaelis-Menten)'
        ],
        coreDerivations: [
          {
            title: 'Clustering Coefficient & Betweenness Centrality',
            description: 'Network metrics quantifying local interconnectivity and information flow bottlenecks in PPI networks.',
            latexEquation: 'C_i = \\frac{2 e_i}{k_i(k_i - 1)}, \\quad B(v) = \\sum_{s \\ne v \\ne t} \\frac{\\sigma_{st}(v)}{\\sigma_{st}}'
          }
        ],
        modelQuestions: [
          {
            id: 'bif-u4-q1',
            year: 'SPPU May 2024',
            marks: 8,
            bloomsLevel: 'Understand',
            questionText: 'Explain why biological networks are scale-free networks. How does this property make biological systems robust against random mutations but vulnerable to targeted attacks?',
            keyPoints: [
              'Degree distribution follows power law: P(k) ~ k^(-gamma), typically 2 < gamma < 3',
              'Most nodes have few connections; a tiny fraction (Hubs) have massive connectivity',
              'Random mutation hits a low-degree node with >95% probability -> zero network collapse',
              'Targeted disruption of a central Hub (e.g. p53 in cancer) fragments the entire network'
            ],
            modelAnswerMarkdown: `### 1. Scale-Free Biological Networks
Unlike random Erdős–Rényi graphs (where node degrees follow a Poisson bell curve), biological networks (protein interaction networks, gene regulatory networks) exhibit a **power-law degree distribution**:
$$P(k) \\propto k^{-\\gamma}, \\quad 2 < \\gamma < 3$$

### 2. Structural Consequences
- **Vast majority of nodes (Effector proteins):** Possess very few interaction partners ($k=1$ or $k=2$).
- **Small minority of nodes (Hub proteins):** Possess hundreds of interaction edges (e.g., p53, Master transcription factors).

### 3. Error Tolerance vs. Attack Vulnerability
1. **Robustness to Random Mutations:** Since $>95\\%$ of nodes are low-degree peripheral nodes, random genomic mutations or deletions almost certainly strike non-critical nodes, leaving global network communication intact.
2. **Lethal Vulnerability to Targeted Attack (The Achilles Heel):** If an adversary or pathogen selectively disables high-betweenness Hub nodes, the entire biological network rapidly disintegrates into isolated subgraphs, causing cell apoptosis or system collapse.`
          }
        ]
      },
      {
        unitNumber: 5,
        title: 'Genomic Data Mining & Microarrays',
        weightageMarks: 18,
        overview: 'DNA microarray technology, RNA-Seq transcriptomics, normalization techniques (RMA, Quantile), Feature selection in high-dimensional genomic datasets, and clustering of gene expression profiles.',
        keyTopics: [
          'Microarray Technologies: Two-color cDNA microarrays, Affymetrix oligonucleotide chips, Probe intensity',
          'Data Preprocessing: Background correction, Log2 transformation, Quantile normalization',
          'Feature Selection in Genomics: Curse of dimensionality (p >> n), Filter (t-test, SAM), Wrapper, Embedded (LASSO)',
          'Gene Expression Clustering: Hierarchical clustering heatmaps, Self-Organizing Maps (SOM), k-means in genomics',
          'Biological Databases: NCBI Gene Expression Omnibus (GEO), ArrayExpress, TCGA cancer genomics'
        ],
        coreDerivations: [
          {
            title: 'Quantile Normalization Algorithm',
            description: 'Rank-based transformation enforcing identical distribution across multiple microarray chips.',
            latexEquation: 'x_{ij}^{\\text{norm}} = \\text{mean}\\left( \\{ x_{(i)k} \\}_{k=1}^M \\right)'
          }
        ],
        modelQuestions: [
          {
            id: 'bif-u5-q1',
            year: 'SPPU Dec 2023',
            marks: 8,
            bloomsLevel: 'Apply',
            questionText: 'Explain the curse of dimensionality in genomic datasets ($p \\gg n$). How do feature selection methods address this problem in disease biomarker discovery?',
            keyPoints: [
              'p >> n problem: Tens of thousands of genes (p approx 25,000) measured for only few patients (n approx 100)',
              'Leads to severe overfitting, spurious statistical correlations, and computational intractability',
              'Filter methods (t-test, ANOVA) rank genes by differential expression independently of the classifier',
              'Embedded methods (L1 LASSO regularization) shrink non-informative gene coefficients to exact zero'
            ],
            modelAnswerMarkdown: `### 1. The $p \\gg n$ Problem in Genomics
In genomic data mining, the number of measured features (genes / transcripts $p \\approx 20,000 - 50,000$) vastly exceeds the number of biological patient samples ($n \\approx 50 - 200$).

### 2. Pitfalls of High-Dimensionality
- **Geometric Sparsity:** In $p$-dimensional space, all sample points become equidistant from one another.
- **Overfitting & False Discovery:** Random noise easily creates perfect mathematical separation between healthy and diseased samples.

### 3. Feature Selection Remedies
1. **Filter Methods (Fast, Univariate):** Use statistical hypothesis tests (Student $t$-test, Significance Analysis of Microarrays - SAM, Wilcoxon rank-sum) to rank genes by $p$-value / fold-change ($|\\log_2(\\text{FC})| \\ge 2$).
2. **Embedded Regularization (LASSO / Elastic Net):**
   $$\\min_{\\mathbf{w}} \\sum_{i=1}^n (y_i - \\mathbf{w}^T \\mathbf{x}_i)^2 + \\lambda \\sum_{j=1}^p |w_j|$$
   The $L_1$ penalty drives irrelevant gene weights to exactly zero, isolating a sparse panel of 10-30 diagnostic biomarker genes.`
          }
        ]
      },
      {
        unitNumber: 6,
        title: 'Sequence Alignments, Phylogenetics & HMM',
        weightageMarks: 18,
        overview: 'Global (Needleman-Wunsch) vs Local (Smith-Waterman) dynamic programming alignment, Scoring matrices (PAM vs BLOSUM), Phylogenetic tree construction (UPGMA, Neighbor-Joining), and Hidden Markov Models in gene prediction.',
        keyTopics: [
          'Pairwise Alignment: Needleman-Wunsch global alignment algorithm, Smith-Waterman local alignment algorithm',
          'Scoring Matrices: PAM (Point Accepted Mutation) vs BLOSUM (BLOcks SUbstitution Matrix - BLOSUM62)',
          'Heuristic Search: BLAST (Word search, Extension, E-value derivation) vs FASTA',
          'Phylogenetics: Distance-based (UPGMA, NJ) vs Character-based (Maximum Parsimony, Maximum Likelihood)',
          'Hidden Markov Models (HMM): Viterbi algorithm, Forward-Backward algorithm for CpG island detection'
        ],
        coreDerivations: [
          {
            title: 'Needleman-Wunsch Global Alignment Dynamic Programming Matrix',
            description: 'Recurrence relation for filling score matrix with match/mismatch score S and linear gap penalty d.',
            latexEquation: 'M(i, j) = \\max \\begin{cases} M(i-1, j-1) + S(x_i, y_j) & (\\text{Diagonal: Match/Mismatch}) \\\\ M(i-1, j) - d & (\\text{Up: Gap in sequence } Y) \\\\ M(i, j-1) - d & (\\text{Left: Gap in sequence } X) \\end{cases}'
          },
          {
            title: 'Smith-Waterman Local Alignment Recurrence',
            description: 'Local alignment matrix with zero-cutoff condition for detecting conserved biological domains.',
            latexEquation: 'H(i, j) = \\max \\begin{cases} 0 \\\\ H(i-1, j-1) + S(x_i, y_j) \\\\ H(i-1, j) - d \\\\ H(i, j-1) - d \\end{cases}'
          }
        ],
        modelQuestions: [
          {
            id: 'bif-u6-q1',
            year: 'SPPU May 2024',
            marks: 10,
            bloomsLevel: 'Apply',
            questionText: 'Align sequences S1 = "ACGT" and S2 = "ACT" using Needleman-Wunsch algorithm with Match = +1, Mismatch = -1, Gap = -2. Construct the full dynamic programming matrix and show the optimal traceback alignment.',
            keyPoints: [
              'Initialize matrix of size (length(S1)+1) x (length(S2)+1) = 5 x 4',
              'Initialize row 0: [0, -2, -4, -6] and column 0: [0, -2, -4, -6, -8]',
              'Fill cells iteratively taking max of diagonal, up, and left',
              'Optimal score at bottom-right cell M(4, 3) = 0',
              'Traceback produces alignment: A-C-G-T aligned with A-C---T with 1 gap'
            ],
            modelAnswerMarkdown: `### 1. Needleman-Wunsch Matrix Construction
- Sequence 1 ($X$ on rows): $\\text{A-C-G-T}$ ($N=4$)
- Sequence 2 ($Y$ on columns): $\\text{A-C-T}$ ($M=3$)
- Parameters: Match $= +1$, Mismatch $= -1$, Gap penalty $d = -2$

#### Dynamic Programming Grid:
| | $\\epsilon$ | A (1) | C (2) | T (3) |
|---|---|---|---|---|
| **$\\epsilon$** | **0** | -2 | -4 | -6 |
| **A (1)** | -2 | **+1** (diag) | -1 (left) | -3 (left) |
| **C (2)** | -4 | -1 (up) | **+2** (diag) | 0 (left) |
| **G (3)** | -6 | -3 (up) | 0 (up) | **+1** (diag mismatch: 2-1=+1) |
| **T (4)** | -8 | -5 (up) | -2 (up) | **+1** (diag match: 0+1=+1) |

*(Detailed cell M(4,3): $\\max(M(3,2)+S(\\text{T},\\text{T}), M(3,3)-2, M(4,2)-2) = \\max(0+1, 1-2, -2-2) = \\max(1, -1, -4) = \\mathbf{+1}$)*

### 2. Traceback & Optimal Alignment
Starting from $M(4, 3) = +1$:
1. $M(4, 3) \\rightarrow M(3, 2)$ via Diagonal match (T with T)
2. $M(3, 2) \\rightarrow M(2, 2)$ via Up gap (G with $-$)
3. $M(2, 2) \\rightarrow M(1, 1)$ via Diagonal match (C with C)
4. $M(1, 1) \\rightarrow M(0, 0)$ via Diagonal match (A with A)

\`\`\`text
Sequence 1:  A - C - G - T
Sequence 2:  A - C - - - T
Score:      (+1) + (+1) + (-2) + (+1) = +1
\`\`\`
Total Alignment Score $= \\mathbf{+1}$`
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 4. INFORMATION RETRIEVAL (IR - Course Code: 417524)
  // =========================================================================
  {
    code: 'IR',
    name: 'Information Retrieval',
    courseCode: '417524',
    credits: 3,
    description: 'Classical IR models (Boolean, Vector Space, BIM), Inverted index compression, Web crawling, PageRank link analysis, and modern evaluation metrics (MAP, NDCG).',
    units: [
      {
        unitNumber: 3,
        title: 'Information Retrieval Models & Indexing',
        weightageMarks: 18,
        overview: 'Boolean retrieval, Inverted index construction, Vector Space Model (VSM), TF-IDF weighting, Cosine similarity, Probabilistic models (BIM, PRP), and Okapi BM25 ranking function.',
        keyTopics: [
          'Inverted Index Architecture: Dictionary lexicon, Postings lists, Skip pointers, Variable-byte compression',
          'Vector Space Model: Term Frequency (TF), Inverse Document Frequency (IDF), Length normalization',
          'Similarity Metrics: Cosine similarity, Jaccard coefficient, Dice coefficient, Euclidean distance',
          'Probabilistic IR: Probability Ranking Principle (PRP), Binary Independence Model (BIM), Odds ratio',
          'Modern Ranking: Okapi BM25 formula, Term frequency saturation ($k_1$), Document length normalization ($b$)'
        ],
        coreDerivations: [
          {
            title: 'TF-IDF Vector Space Cosine Similarity Formula',
            description: 'Standard formula computing angle between document vector d and query vector q.',
            latexEquation: '\\text{Score}(q, d) = \\frac{\\mathbf{q} \\cdot \\mathbf{d}}{\\|\\mathbf{q}\\| \\|\\mathbf{d}\\|} = \\frac{\\sum_{t \\in q \\cap d} w_{t, q} \\cdot w_{t, d}}{\\sqrt{\\sum_{t \\in q} w_{t, q}^2} \\cdot \\sqrt{\\sum_{t \\in d} w_{t, d}^2}}'
          },
          {
            title: 'Okapi BM25 Ranking Function',
            description: 'State-of-the-art probabilistic ranking function with saturation and length tuning.',
            latexEquation: '\\text{BM25}(D, Q) = \\sum_{i=1}^{n} \\text{IDF}(q_i) \\cdot \\frac{f(q_i, D) \\cdot (k_1 + 1)}{f(q_i, D) + k_1 \\cdot \\left(1 - b + b \\cdot \\frac{|D|}{\\text{avgdl}}\\right)}'
          }
        ],
        modelQuestions: [
          {
            id: 'ir-u3-q1',
            year: 'SPPU Dec 2023',
            marks: 10,
            bloomsLevel: 'Apply',
            questionText: 'Given a collection of 3 documents: D1: "data science AI", D2: "data mining AI", D3: "science research". Compute the TF-IDF weight vectors and calculate Cosine Similarity between Query Q: "data science" and each document.',
            keyPoints: [
              'Vocabulary V = {data, science, AI, mining, research}. N = 3.',
              'DF: data=2, science=2, AI=2, mining=1, research=1.',
              'IDF = log(N / DF): data=log(3/2)=0.176, science=log(3/2)=0.176, AI=0.176, mining=log(3/1)=0.477, research=0.477',
              'Compute query vector Q and document vectors D1, D2, D3',
              'Cosine similarity ranks D1 first, followed by D2 and D3'
            ],
            modelAnswerMarkdown: `### 1. Corpus Analysis & IDF Calculation
Total Documents $N = 3$.
- **Vocabulary:** $\\{\\text{data}, \\text{science}, \\text{AI}, \\text{mining}, \\text{research}\\}$

| Term ($t$) | Document Frequency ($DF$) | Inverse Document Frequency $\\text{IDF} = \\log_{10}(N/DF)$ |
|---|---|---|
| **data** | 2 (in D1, D2) | $\\log_{10}(3/2) = 0.1761$ |
| **science** | 2 (in D1, D3) | $\\log_{10}(3/2) = 0.1761$ |
| **AI** | 2 (in D1, D2) | $\\log_{10}(3/2) = 0.1761$ |
| **mining** | 1 (in D2) | $\\log_{10}(3/1) = 0.4771$ |
| **research** | 1 (in D3) | $\\log_{10}(3/1) = 0.4771$ |

### 2. TF-IDF Vectors
$$\\text{Term Order: } [\\text{data}, \\text{science}, \\text{AI}, \\text{mining}, \\text{research}]$$
- **Query $Q$ ("data science"):** $\\mathbf{q} = [0.1761, 0.1761, 0, 0, 0]$
  $$\\|\\mathbf{q}\\| = \\sqrt{0.1761^2 + 0.1761^2} = \\sqrt{0.0620} \\approx 0.2490$$
- **Document $D_1$ ("data science AI"):** $\\mathbf{d}_1 = [0.1761, 0.1761, 0.1761, 0, 0]$
  $$\\|\\mathbf{d}_1\\| = \\sqrt{3 \\times 0.1761^2} \\approx 0.3050$$
- **Document $D_2$ ("data mining AI"):** $\\mathbf{d}_2 = [0.1761, 0, 0.1761, 0.4771, 0]$
  $$\\|\\mathbf{d}_2\\| = \\sqrt{0.1761^2 + 0.1761^2 + 0.4771^2} = \\sqrt{0.2896} \\approx 0.5381$$
- **Document $D_3$ ("science research"):** $\\mathbf{d}_3 = [0, 0.1761, 0, 0, 0.4771]$
  $$\\|\\mathbf{d}_3\\| = \\sqrt{0.1761^2 + 0.4771^2} = \\sqrt{0.2586} \\approx 0.5085$$

### 3. Cosine Similarity Calculations
$$\\text{Sim}(Q, D_1) = \\frac{(0.1761)(0.1761) + (0.1761)(0.1761)}{0.2490 \\times 0.3050} = \\frac{0.0620}{0.0759} \\approx \\mathbf{0.8168}$$
$$\\text{Sim}(Q, D_2) = \\frac{(0.1761)(0.1761) + 0}{0.2490 \\times 0.5381} = \\frac{0.0310}{0.1340} \\approx \\mathbf{0.2313}$$
$$\\text{Sim}(Q, D_3) = \\frac{0 + (0.1761)(0.1761)}{0.2490 \\times 0.5085} = \\frac{0.0310}{0.1266} \\approx \\mathbf{0.2448}$$

**Final Document Ranking for Query Q:** $\\mathbf{D_1 > D_3 > D_2}$`
          }
        ]
      },
      {
        unitNumber: 4,
        title: 'Text Classification & Document Clustering',
        weightageMarks: 18,
        overview: 'Text feature extraction, Naive Bayes multinomial text classification, Support Vector Machines for high-dimensional text, Hierarchical clustering algorithms (Single-Link, Complete-Link), and Flat clustering.',
        keyTopics: [
          'Text Preprocessing: Tokenization, Stopword removal, Porter Stemming, Lemmatization, N-grams',
          'Multinomial Naive Bayes: Bag-of-Words representation, Laplace (+1) smoothing, Prior & Likelihood estimation',
          'Hierarchical Text Clustering: Single-Link (minimum distance), Complete-Link (maximum distance), Dendrograms',
          'Flat Clustering: K-Means for text with Cosine distance, Bisecting K-Means',
          'Cluster Evaluation: Purity, Normalized Mutual Information (NMI), Rand Index'
        ],
        coreDerivations: [
          {
            title: 'Multinomial Naive Bayes with Laplace Smoothing',
            description: 'Conditional probability of word t in class c with vocabulary size |V|.',
            latexEquation: 'P(t_k | c) = \\frac{N_{ck} + 1}{\\sum_{t=1}^{|V|} N_{ct} + |V|}, \\quad c_{\\text{MAP}} = \\arg\\max_{c \\in C} \\left[ \\log P(c) + \\sum_{i=1}^{L} \\log P(w_i | c) \\right]'
          }
        ],
        modelQuestions: [
          {
            id: 'ir-u4-q1',
            year: 'SPPU May 2024',
            marks: 8,
            bloomsLevel: 'Understand',
            questionText: 'Compare Single-Link and Complete-Link hierarchical clustering algorithms. Explain the chaining effect in Single-Link clustering with an appropriate diagram.',
            keyPoints: [
              'Single-Link defines cluster distance as minimum distance between any pair: D(A, B) = min d(x, y)',
              'Complete-Link defines cluster distance as maximum distance: D(A, B) = max d(x, y)',
              'Chaining effect: Single-link tends to merge clusters through long stringy chains of intermediate points',
              'Complete-link produces compact, spherical clusters of roughly equal diameter'
            ],
            modelAnswerMarkdown: `### 1. Hierarchical Linkage Criteria Comparison
| Criterion | Formula | Cluster Shape Property | Sensitivity |
|---|---|---|---|
| **Single-Link (MIN)** | $D(A, B) = \\min_{x \\in A, y \\in B} d(x, y)$ | Discovers elongated, non-elliptical clusters | Highly sensitive to noise / bridge points |
| **Complete-Link (MAX)**| $D(A, B) = \\max_{x \\in A, y \\in B} d(x, y)$ | Forces compact, spherical clusters of equal diameter | Less sensitive to noise, breaks large clusters |
| **Average-Link** | $D(A, B) = \\frac{1}{\\|A\\| \\|B\\|} \\sum_{x \\in A} \\sum_{y \\in B} d(x, y)$ | Balances compactness and elongation | Robust statistical trade-off |

### 2. The Chaining Effect in Single-Link
Because Single-Link only requires a **single pair** of close points to merge two large clusters, a sequence of nearby noise points acts as a "bridge". This causes disparate clusters to merge prematurely into long, stringy chains rather than meaningful semantic groups.`
          }
        ]
      },
      {
        unitNumber: 5,
        title: 'Web Search, Crawling & Link Analysis',
        weightageMarks: 18,
        overview: 'Web crawler architecture, Spider traps, Robots.txt politeness protocols, Link analysis algorithms (PageRank, HITS Hubs and Authorities), and search engine indexing architectures.',
        keyTopics: [
          'Web Crawler Architecture: URL frontier, DNS resolution, Fetcher, Parser, Duplicate elimination (Fingerprints)',
          'Crawling Challenges: Dynamic spider traps, Infinite calendar loops, Politeness policies, Freshness vs Revisit',
          'PageRank Algorithm: Random Surfer model, Teleportation probability, Damping factor (d=0.85 / 0.70), Power iteration',
          'HITS Algorithm: Kleinbergs Hubs and Authorities, Mutual reinforcement, Matrix iteration and convergence',
          'Search Engine Ranking: Inverted Index, Query execution engine, Click logs, Ranking signals'
        ],
        coreDerivations: [
          {
            title: 'PageRank Power Iteration Equation',
            description: 'Stationary probability distribution of random surfer over directed web graph of N pages.',
            latexEquation: '\\mathbf{r}^{(k+1)} = d \\cdot \\mathbf{M} \\mathbf{r}^{(k)} + \\frac{1 - d}{N} \\mathbf{e}, \\quad \\mathbf{M}_{ij} = \\begin{cases} 1/L(j) & \\text{if page } j \\text{ links to } i \\\\ 0 & \\text{otherwise} \\end{cases}'
          },
          {
            title: 'HITS Authority and Hub Mutual Update',
            description: 'Iterative update equations for authority score a(p) and hub score h(p).',
            latexEquation: 'a(p)^{(k)} = \\sum_{q \\to p} h(q)^{(k-1)}, \\quad h(p)^{(k)} = \\sum_{p \\to r} a(r)^{(k)}, \\quad \\text{normalized by } \\|\\mathbf{a}\\|, \\|\\mathbf{h}\\|'
          }
        ],
        modelQuestions: [
          {
            id: 'ir-u5-q1',
            year: 'SPPU Dec 2023',
            marks: 10,
            bloomsLevel: 'Apply',
            questionText: 'Consider a web graph with 3 pages A, B, and C. Page A links to B and C; Page B links to C; Page C links to A. Using damping factor d = 0.70, write the PageRank transition matrix and compute PageRank values for 2 iterations.',
            keyPoints: [
              'N = 3 pages. Initial rank vector r^(0) = [1/3, 1/3, 1/3] = [0.333, 0.333, 0.333]',
              'Out-degrees: L(A) = 2 (to B, C), L(B) = 1 (to C), L(C) = 1 (to A)',
              'Transition Matrix M: col A=[0, 1/2, 1/2], col B=[0, 0, 1], col C=[1, 0, 0]',
              'Iteration 1: r^(1) = 0.70 * M * r^(0) + (1-0.70)/3 * [1, 1, 1] = [0.3333, 0.2167, 0.4500]',
              'Iteration 2: r^(2) = [0.4150, 0.2167, 0.3683]'
            ],
            modelAnswerMarkdown: `### 1. Directed Web Graph Specification
- $A \\rightarrow B, C$ (Out-degree $L(A) = 2$)
- $B \\rightarrow C$ (Out-degree $L(B) = 1$)
- $C \\rightarrow A$ (Out-degree $L(C) = 1$)
- Total Pages $N = 3$, Damping factor $d = 0.70$, Teleportation constant $\\frac{1-d}{N} = \\frac{0.30}{3} = 0.10$.

### 2. Transition Matrix $\\mathbf{M}$
$$\\mathbf{M} = \\begin{bmatrix} 0 & 0 & 1 \\\\ 1/2 & 0 & 0 \\\\ 1/2 & 1 & 0 \\end{bmatrix}$$

### 3. Power Iteration Calculations
**Initialization ($k=0$):**
$$\\mathbf{r}^{(0)} = \\begin{bmatrix} 1/3 \\\\ 1/3 \\\\ 1/3 \\end{bmatrix} \\approx \\begin{bmatrix} 0.3333 \\\\ 0.3333 \\\\ 0.3333 \\end{bmatrix}$$

**Iteration 1 ($k=1$):**
$$\\mathbf{M} \\mathbf{r}^{(0)} = \\begin{bmatrix} 0(0.3333) + 0(0.3333) + 1(0.3333) \\\\ 0.5(0.3333) + 0(0.3333) + 0(0.3333) \\\\ 0.5(0.3333) + 1(0.3333) + 0(0.3333) \\end{bmatrix} = \\begin{bmatrix} 0.3333 \\\\ 0.1667 \\\\ 0.5000 \\end{bmatrix}$$
$$\\mathbf{r}^{(1)} = 0.70 \\begin{bmatrix} 0.3333 \\\\ 0.1667 \\\\ 0.5000 \\end{bmatrix} + \\begin{bmatrix} 0.10 \\\\ 0.10 \\\\ 0.10 \\end{bmatrix} = \\begin{bmatrix} 0.2333 + 0.10 \\\\ 0.1167 + 0.10 \\\\ 0.3500 + 0.10 \\end{bmatrix} = \\mathbf{\\begin{bmatrix} 0.3333 \\\\ 0.2167 \\\\ 0.4500 \\end{bmatrix}}$$

**Iteration 2 ($k=2$):**
$$\\mathbf{M} \\mathbf{r}^{(1)} = \\begin{bmatrix} 1(0.4500) \\\\ 0.5(0.3333) \\\\ 0.5(0.3333) + 1(0.2167) \\end{bmatrix} = \\begin{bmatrix} 0.4500 \\\\ 0.1667 \\\\ 0.3833 \\end{bmatrix}$$
$$\\mathbf{r}^{(2)} = 0.70 \\begin{bmatrix} 0.4500 \\\\ 0.1667 \\\\ 0.3833 \\end{bmatrix} + \\begin{bmatrix} 0.10 \\\\ 0.10 \\\\ 0.10 \\end{bmatrix} = \\begin{bmatrix} 0.3150 + 0.10 \\\\ 0.1167 + 0.10 \\\\ 0.2683 + 0.10 \\end{bmatrix} = \\mathbf{\\begin{bmatrix} 0.4150 \\\\ 0.2167 \\\\ 0.3683 \\end{bmatrix}}$$

**PageRank Ranking after 2 iterations:** $\\mathbf{A (0.4150) > C (0.3683) > B (0.2167)}$`
          }
        ]
      },
      {
        unitNumber: 6,
        title: 'Information Retrieval Evaluation & Vector Search',
        weightageMarks: 18,
        overview: 'Evaluation of unranked and ranked retrieval, Precision@K, Recall@K, Mean Average Precision (MAP), Mean Reciprocal Rank (MRR), Normalized Discounted Cumulative Gain (NDCG), Latent Semantic Analysis (LSA), and Vector Search.',
        keyTopics: [
          'Evaluation Fundamentals: Test collections (TREC, Cranfield), Ground truth relevance judgments',
          'Ranked Metrics: Precision@K, Recall@K, Average Precision (AP), Mean Average Precision (MAP)',
          'Reciprocal Rank: First relevant item index, Mean Reciprocal Rank (MRR) for question-answering',
          'Cumulative Gain: Discounted Cumulative Gain (DCG@K), Ideal DCG (IDCG@K), Normalized DCG (NDCG@K)',
          'Latent Semantic Analysis (LSA): Singular Value Decomposition (SVD), Low-rank latent concept mapping'
        ],
        coreDerivations: [
          {
            title: 'Mean Average Precision (MAP) & NDCG@K Formulation',
            description: 'Formulas for evaluation of multi-level and binary ranked search retrieval systems.',
            latexEquation: '\\text{MAP} = \\frac{1}{|Q|} \\sum_{j=1}^{|Q|} \\frac{1}{m_j} \\sum_{k=1}^{N_j} P(k) \\cdot \\text{rel}(k), \\quad \\text{DCG}_p = \\sum_{i=1}^p \\frac{2^{\\text{rel}_i} - 1}{\\log_2(i + 1)}, \\quad \\text{NDCG}_p = \\frac{\\text{DCG}_p}{\\text{IDCG}_p}'
          }
        ],
        modelQuestions: [
          {
            id: 'ir-u6-q1',
            year: 'SPPU May 2024',
            marks: 10,
            bloomsLevel: 'Apply',
            questionText: 'A search engine returns 5 ranked documents for a query with relevance scores: [3, 2, 0, 1, 2]. Compute DCG@5, Ideal DCG@5 (IDCG@5), and the final Normalized Discounted Cumulative Gain (NDCG@5).',
            keyPoints: [
              'Relevance levels r = [3, 2, 0, 1, 2]',
              'Discounted formula: (2^rel - 1) / log2(i + 1)',
              'Compute Gain values: 2^3-1=7, 2^2-1=3, 2^0-1=0, 2^1-1=1, 2^2-1=3',
              'DCG@5 = 7/log2(2) + 3/log2(3) + 0/log2(4) + 1/log2(5) + 3/log2(6) = 7 + 1.893 + 0 + 0.431 + 1.161 = 10.485',
              'Sort for Ideal: [3, 2, 2, 1, 0] -> IDCG@5 = 7/1 + 3/1.585 + 3/2 + 1/2.322 + 0 = 7 + 1.893 + 1.5 + 0.431 = 10.824',
              'NDCG@5 = 10.485 / 10.824 = 0.9687 (96.87%)'
            ],
            modelAnswerMarkdown: `### 1. Given Ranked List & Relevance Scores
Retrieved relevance array: $\\mathbf{R} = [r_1=3, \\; r_2=2, \\; r_3=0, \\; r_4=1, \\; r_5=2]$

### 2. Discounted Cumulative Gain ($\\text{DCG}_5$)
$$\\text{DCG}_5 = \\sum_{i=1}^{5} \\frac{2^{r_i} - 1}{\\log_2(i + 1)}$$

| Rank ($i$) | Relevance ($r_i$) | Gain ($2^{r_i} - 1$) | Discount ($\\log_2(i+1)$) | $\\text{Discounted Gain}$ |
|---|---|---|---|---|
| **1** | 3 | $2^3 - 1 = 7$ | $\\log_2(2) = 1.000$ | $7.0000$ |
| **2** | 2 | $2^2 - 1 = 3$ | $\\log_2(3) \\approx 1.5850$ | $1.8927$ |
| **3** | 0 | $2^0 - 1 = 0$ | $\\log_2(4) = 2.000$ | $0.0000$ |
| **4** | 1 | $2^1 - 1 = 1$ | $\\log_2(5) \\approx 2.3219$ | $0.4307$ |
| **5** | 2 | $2^2 - 1 = 3$ | $\\log_2(6) \\approx 2.5850$ | $1.1605$ |
| **Total** | | | | **$\\text{DCG}_5 = \\mathbf{10.4839}$** |

### 3. Ideal Ranking & $\\text{IDCG}_5$
Sort relevance scores in descending order: $\\mathbf{R}_{\\text{ideal}} = [3, 2, 2, 1, 0]$

| Rank ($i$) | Ideal $r_i$ | Gain ($2^{r_i} - 1$) | Discount ($\\log_2(i+1)$) | $\\text{Ideal Discounted Gain}$ |
|---|---|---|---|---|
| **1** | 3 | 7 | 1.000 | 7.0000 |
| **2** | 2 | 3 | 1.5850 | 1.8927 |
| **3** | 2 | 3 | 2.000 | 1.5000 |
| **4** | 1 | 1 | 2.3219 | 0.4307 |
| **5** | 0 | 0 | 2.5850 | 0.0000 |
| **Total** | | | | **$\\text{IDCG}_5 = \\mathbf{10.8234}$** |

### 4. Final Normalized DCG ($\\text{NDCG}_5$)
$$\\text{NDCG}_5 = \\frac{\\text{DCG}_5}{\\text{IDCG}_5} = \\frac{10.4839}{10.8234} \\approx \\mathbf{0.9686 \\; (96.86\\%)}$$`
          }
        ]
      }
    ]
  }
];
