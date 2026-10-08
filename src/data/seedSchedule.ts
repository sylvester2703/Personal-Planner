import { DaySchedule } from '@/types';

export const INITIAL_SCHEDULE: DaySchedule[] = [
  // ==========================================
  // PHASE 1: FOUNDATION & LAB PREP (OCT 08 - OCT 18)
  // ==========================================
  {
    date: '2026-10-08',
    dayOfWeek: 'Thursday',
    phase: 'FOUNDATION',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'Confusion Matrix & Visual Encodings',
    tasks: [
      { id: 't-1008-1', subjectCode: 'ML', unit: 3, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'Confusion Matrix Metrics & Derivation', description: 'Derive 3-class precision, recall, accuracy, specificity, and macro/micro F1 formulas with hand numericals.', isCompleted: false, isBacklog: false, originalDate: '2026-10-08', currentScheduledDate: '2026-10-08', priority: 'P1' },
      { id: 't-1008-2', subjectCode: 'DMV', unit: 3, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'Exploratory vs. Presentation Graphics', description: 'Study statistical historiography, 3D plots shortcomings, and data visualization taxonomy according to SPPU pattern.', isCompleted: false, isBacklog: false, originalDate: '2026-10-08', currentScheduledDate: '2026-10-08', priority: 'P1' },
      { id: 't-1008-3', subjectCode: 'ML', unit: 3, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Multiclass & Imbalanced Learning', description: 'Compare One-vs-Rest (OvR) and One-vs-One (OvO) decision boundaries and cost-sensitive re-sampling methods.', isCompleted: false, isBacklog: false, originalDate: '2026-10-08', currentScheduledDate: '2026-10-08', priority: 'P2' }
    ]
  },
  {
    date: '2026-10-09',
    dayOfWeek: 'Friday',
    phase: 'FOUNDATION',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'KNN Euclidean Trace & SVM Kernels',
    tasks: [
      { id: 't-1009-1', subjectCode: 'DMV', unit: 3, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'Data Handling in Visualization', description: 'Design choices, visual variables (position, length, color saturation), and scaling parameters.', isCompleted: false, isBacklog: false, originalDate: '2026-10-09', currentScheduledDate: '2026-10-09', priority: 'P1' },
      { id: 't-1009-2', subjectCode: 'ML', unit: 3, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'KNN Euclidean Distance Manual Trace', description: 'Compute Euclidean distance for test point (Physics=6, Chemistry=8) with K=3 and step-by-step voting.', isCompleted: false, isBacklog: false, originalDate: '2026-10-09', currentScheduledDate: '2026-10-09', priority: 'P1' },
      { id: 't-1009-3', subjectCode: 'ML', unit: 3, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'SVM Slack Variables & Kernels', description: 'Formulate soft-margin SVM with slack variables; define RBF, Polynomial, and Sigmoid kernels.', isCompleted: false, isBacklog: false, originalDate: '2026-10-09', currentScheduledDate: '2026-10-09', priority: 'P1' }
    ]
  },
  {
    date: '2026-10-10',
    dayOfWeek: 'Saturday',
    phase: 'FOUNDATION',
    dayType: 'SATURDAY',
    targetHours: 9.83,
    isAudited: false,
    notes: 'Saturday Marathon: BIF Homology & IR Probabilistic Models',
    tasks: [
      { id: 't-1010-1', subjectCode: 'BIF', unit: 3, timeSlot: '11:00 AM – 2:00 PM', plannedHours: 3.0, title: 'Homology Modeling 4-Step Pipeline', description: 'Template identification, target-template alignment, model generation, and Ramachandran validation.', isCompleted: false, isBacklog: false, originalDate: '2026-10-10', currentScheduledDate: '2026-10-10', priority: 'P1' },
      { id: 't-1010-2', subjectCode: 'BIF', unit: 3, timeSlot: '3:00 PM – 5:20 PM', plannedHours: 2.33, title: 'CADD & Molecular Docking Simulation', description: 'Computer-Aided Drug Design pipeline, ligand sampling, scoring functions, and binding affinity.', isCompleted: false, isBacklog: false, originalDate: '2026-10-10', currentScheduledDate: '2026-10-10', priority: 'P1' },
      { id: 't-1010-3', subjectCode: 'IR', unit: 3, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'Probabilistic Retrieval & BIM Model', description: 'Binary Independence Model (BIM) derivation and Probability Ranking Principle (PRP).', isCompleted: false, isBacklog: false, originalDate: '2026-10-10', currentScheduledDate: '2026-10-10', priority: 'P1' },
      { id: 't-1010-4', subjectCode: 'IR', unit: 3, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Vector Space Model & TF-IDF Cosine Math', description: 'Document term vectors, Inverse Document Frequency formulas, and Cosine similarity metric.', isCompleted: false, isBacklog: false, originalDate: '2026-10-10', currentScheduledDate: '2026-10-10', priority: 'P1' }
    ]
  },
  {
    date: '2026-10-11',
    dayOfWeek: 'Sunday',
    phase: 'FOUNDATION',
    dayType: 'SUNDAY',
    targetHours: 6.5,
    isAudited: false,
    notes: 'Sunday Practical Execution & Systems Biology',
    tasks: [
      { id: 't-1011-1', subjectCode: 'PRACTICAL', unit: null, timeSlot: '12:00 PM – 2:00 PM', plannedHours: 2.0, title: 'ML Lab Practical Code Run (PCA & Uber Fare)', description: 'Execute Wine dataset PCA and Uber Fare regression in Jupyter Notebook with local datasets.', isCompleted: false, isBacklog: false, originalDate: '2026-10-11', currentScheduledDate: '2026-10-11', priority: 'APPLICATION' },
      { id: 't-1011-2', subjectCode: 'IR', unit: 4, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'Naïve Bayes Text Classification', description: 'Laplace smoothing, prior probabilities, document feature representation, and classification steps.', isCompleted: false, isBacklog: false, originalDate: '2026-10-11', currentScheduledDate: '2026-10-11', priority: 'P1' },
      { id: 't-1011-3', subjectCode: 'BIF', unit: 4, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Systems Biology & Gene Regulatory Networks', description: 'Principles of systems biology, feedback loops, metabolic network graphs, and biological topology.', isCompleted: false, isBacklog: false, originalDate: '2026-10-11', currentScheduledDate: '2026-10-11', priority: 'P1' }
    ]
  },
  {
    date: '2026-10-12',
    dayOfWeek: 'Monday',
    phase: 'FOUNDATION',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'K-Means Elbow Method & Force Directed Layouts',
    tasks: [
      { id: 't-1012-1', subjectCode: 'ML', unit: 4, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'K-Means Clustering & Elbow Method', description: 'Centroid update math, inertia minimization, silhouette plot analysis, and WCSS formula.', isCompleted: false, isBacklog: false, originalDate: '2026-10-12', currentScheduledDate: '2026-10-12', priority: 'P1' },
      { id: 't-1012-2', subjectCode: 'DMV', unit: 4, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'Graph Layouts & Force-Directed Models', description: 'Spring embedders, Hookes law analogy, electrical repulsion mechanics, and energy minimization.', isCompleted: false, isBacklog: false, originalDate: '2026-10-12', currentScheduledDate: '2026-10-12', priority: 'P1' },
      { id: 't-1012-3', subjectCode: 'ML', unit: 4, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Agglomerative vs. Divisive Clustering', description: 'Linkage criteria (Single, Complete, Average) & dendrogram cutoff distance thresholding.', isCompleted: false, isBacklog: false, originalDate: '2026-10-12', currentScheduledDate: '2026-10-12', priority: 'P1' }
    ]
  },
  {
    date: '2026-10-13',
    dayOfWeek: 'Tuesday',
    phase: 'FOUNDATION',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'IR Single-Link matrix calculation practice',
    tasks: [
      { id: 't-1013-1', subjectCode: 'BIF', unit: 4, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'Cytoscape & Biological Network Metrics', description: 'Degree distribution, clustering coefficient, betweenness centrality, and hub identification.', isCompleted: false, isBacklog: false, originalDate: '2026-10-13', currentScheduledDate: '2026-10-13', priority: 'P1' },
      { id: 't-1013-2', subjectCode: 'IR', unit: 4, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'Single-Link Hierarchical Matrix Solving', description: 'Manual solving of 4x4 distance matrix and step-by-step cluster merging tree construction.', isCompleted: false, isBacklog: false, originalDate: '2026-10-13', currentScheduledDate: '2026-10-13', priority: 'P1' },
      { id: 't-1013-3', subjectCode: 'BIF', unit: 4, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Mathematical Modeling in Biology', description: 'Differential equations for gene expression and lac operon switch case study.', isCompleted: false, isBacklog: false, originalDate: '2026-10-13', currentScheduledDate: '2026-10-13', priority: 'P2' }
    ]
  },
  {
    date: '2026-10-14',
    dayOfWeek: 'Wednesday',
    phase: 'FOUNDATION',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'DBSCAN parameters & GMM Expectation-Maximization',
    tasks: [
      { id: 't-1014-1', subjectCode: 'ML', unit: 4, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'DBSCAN & Gaussian Mixture Models (GMM)', description: 'Epsilon, MinPts, Core/Border/Noise points definition + GMM EM algorithm E-step and M-step.', isCompleted: false, isBacklog: false, originalDate: '2026-10-14', currentScheduledDate: '2026-10-14', priority: 'P1' },
      { id: 't-1014-2', subjectCode: 'DMV', unit: 4, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'Multidimensional Scaling (MDS) & Bipartite Graphs', description: 'Stress minimization function, 2D proximity projections, and bipartite graph drawing.', isCompleted: false, isBacklog: false, originalDate: '2026-10-14', currentScheduledDate: '2026-10-14', priority: 'P1' },
      { id: 't-1014-3', subjectCode: 'ML', unit: 4, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Clustering Industrial Case Studies', description: 'Customer segmentation, fraud anomaly detection, and image segmentation SPPU answer templates.', isCompleted: false, isBacklog: false, originalDate: '2026-10-14', currentScheduledDate: '2026-10-14', priority: 'APPLICATION' }
    ]
  },
  {
    date: '2026-10-15',
    dayOfWeek: 'Thursday',
    phase: 'FOUNDATION',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'PageRank formula & Biological PCA',
    tasks: [
      { id: 't-1015-1', subjectCode: 'IR', unit: 5, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'Web Crawlers & Spider Traps', description: 'Architecture of crawlers, robots.txt, politeness policies, and spider trap circumvention.', isCompleted: false, isBacklog: false, originalDate: '2026-10-15', currentScheduledDate: '2026-10-15', priority: 'P1' },
      { id: 't-1015-2', subjectCode: 'BIF', unit: 5, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'PCA & Feature Selection in Genomics', description: 'Biological limitations of PCA, Filter vs. Wrapper vs. Embedded methods for microarrays.', isCompleted: false, isBacklog: false, originalDate: '2026-10-15', currentScheduledDate: '2026-10-15', priority: 'P1' },
      { id: 't-1015-3', subjectCode: 'IR', unit: 5, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'PageRank Algorithm & Random Surfer', description: 'PageRank transition matrix setup and damping factor d=0.70 / d=0.85 power iteration equations.', isCompleted: false, isBacklog: false, originalDate: '2026-10-15', currentScheduledDate: '2026-10-15', priority: 'P1' }
    ]
  },
  {
    date: '2026-10-16',
    dayOfWeek: 'Friday',
    phase: 'FOUNDATION',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'Data wrangling & Lab Viva top 30 questions',
    tasks: [
      { id: 't-1016-1', subjectCode: 'DMV', unit: 4, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'Data Wrangling Complete Workflow', description: 'Imputation strategies, transformation, melting, reshaping, and merging multiple heterogeneous datasets.', isCompleted: false, isBacklog: false, originalDate: '2026-10-16', currentScheduledDate: '2026-10-16', priority: 'P1' },
      { id: 't-1016-2', subjectCode: 'PRACTICAL', unit: null, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'DMV Lab Practical Plots Execution', description: 'Run all Matplotlib, Seaborn, and Plotly assignment codes on local machine with generated charts.', isCompleted: false, isBacklog: false, originalDate: '2026-10-16', currentScheduledDate: '2026-10-16', priority: 'APPLICATION' },
      { id: 't-1016-3', subjectCode: 'PRACTICAL', unit: null, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Top 30 External Lab Viva Questions', description: 'Master L1 vs L2, StandardScaler necessity, OOB error, and PCA variance for viva examiners.', isCompleted: false, isBacklog: false, originalDate: '2026-10-16', currentScheduledDate: '2026-10-16', priority: 'P1' }
    ]
  },
  {
    date: '2026-10-17',
    dayOfWeek: 'Saturday',
    phase: 'FOUNDATION',
    dayType: 'SATURDAY',
    targetHours: 9.83,
    isAudited: false,
    notes: 'Ensemble Learning Deep Dive: AdaBoost & Stacking',
    tasks: [
      { id: 't-1017-1', subjectCode: 'ML', unit: 5, timeSlot: '11:00 AM – 2:00 PM', plannedHours: 3.0, title: 'Bagging vs. Boosting & Random Forest', description: 'Bootstrap aggregation, Out-of-Bag (OOB) error, variance reduction mechanics, and feature sub-sampling.', isCompleted: false, isBacklog: false, originalDate: '2026-10-17', currentScheduledDate: '2026-10-17', priority: 'P1' },
      { id: 't-1017-2', subjectCode: 'ML', unit: 5, timeSlot: '3:00 PM – 5:20 PM', plannedHours: 2.33, title: 'AdaBoost Algorithm Step-by-Step', description: 'Derive sample weight update equation and classifier weight alpha_t = 0.5 * ln((1-e)/e).', isCompleted: false, isBacklog: false, originalDate: '2026-10-17', currentScheduledDate: '2026-10-17', priority: 'P1' },
      { id: 't-1017-3', subjectCode: 'ML', unit: 5, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'Voting Ensembles & Stacking Meta-Learner', description: 'Hard vs. Soft voting, Meta-classifier blending architecture, and multi-layer ensemble designs.', isCompleted: false, isBacklog: false, originalDate: '2026-10-17', currentScheduledDate: '2026-10-17', priority: 'P1' },
      { id: 't-1017-4', subjectCode: 'PRACTICAL', unit: null, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Dry Run Mock Practicals Code Execution', description: 'Test scripts inside VS Code with local dataset paths and prepare terminal commands.', isCompleted: false, isBacklog: false, originalDate: '2026-10-17', currentScheduledDate: '2026-10-17', priority: 'APPLICATION' }
    ]
  },
  {
    date: '2026-10-18',
    dayOfWeek: 'Sunday',
    phase: 'FOUNDATION',
    dayType: 'SUNDAY',
    targetHours: 6.5,
    isAudited: false,
    notes: 'Split-Apply-Combine & Groupby mechanics in DMV',
    tasks: [
      { id: 't-1018-1', subjectCode: 'PRACTICAL', unit: null, timeSlot: '12:00 PM – 2:00 PM', plannedHours: 2.0, title: 'Lab Journal Final Printing & Index Signoff', description: 'Print output graphs and bind writeups for mock practical check.', isCompleted: false, isBacklog: false, originalDate: '2026-10-18', currentScheduledDate: '2026-10-18', priority: 'ROUTINE' },
      { id: 't-1018-2', subjectCode: 'DMV', unit: 5, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'Split-Apply-Combine & GroupBy Mechanics', description: 'Pandas groupby aggregation, transformations, filtering, and custom apply functions.', isCompleted: false, isBacklog: false, originalDate: '2026-10-18', currentScheduledDate: '2026-10-18', priority: 'P1' },
      { id: 't-1018-3', subjectCode: 'IR', unit: 5, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'HITS Algorithm (Hubs & Authorities)', description: 'Derive Authority update equation a(p) and Hub update equation h(p) with matrix representation.', isCompleted: false, isBacklog: false, originalDate: '2026-10-18', currentScheduledDate: '2026-10-18', priority: 'P1' }
    ]
  },

  // ==========================================
  // PHASE 2: SUBMISSIONS & COLLEGE SIGNOFF (OCT 19 - OCT 25)
  // ==========================================
  {
    date: '2026-10-19',
    dayOfWeek: 'Monday',
    phase: 'SUBMISSIONS',
    dayType: 'PRACTICAL_COLLEGE',
    targetHours: 7.0,
    isAudited: false,
    notes: 'College Lab Submission Day 1: ML Journal Validation',
    tasks: [
      { id: 't-1019-1', subjectCode: 'PRACTICAL', unit: null, timeSlot: '10:00 AM – 2:00 PM', plannedHours: 3.0, title: 'ML Lab Journal Submission & HOD Signoff', description: 'Present all 8 assignments with code, output plots, and viva answers for official lab signoff.', isCompleted: false, isBacklog: false, originalDate: '2026-10-19', currentScheduledDate: '2026-10-19', priority: 'P1' },
      { id: 't-1019-2', subjectCode: 'DMV', unit: 5, timeSlot: '4:00 PM – 6:30 PM', plannedHours: 2.5, title: 'DMV Visualization Best Practices & Seaborn', description: 'Heatmaps, pairplots, facet grids, and multi-panel figures for data storytelling.', isCompleted: false, isBacklog: false, originalDate: '2026-10-19', currentScheduledDate: '2026-10-19', priority: 'P1' },
      { id: 't-1019-3', subjectCode: 'IR', unit: 5, timeSlot: '10:00 PM – 11:30 PM', plannedHours: 1.5, title: 'Web Search Architecture & Crawl Scheduling', description: 'Review URL frontier priority queues, duplicate elimination, and Bloom filters.', isCompleted: false, isBacklog: false, originalDate: '2026-10-19', currentScheduledDate: '2026-10-19', priority: 'P2' }
    ]
  },
  {
    date: '2026-10-20',
    dayOfWeek: 'Tuesday',
    phase: 'SUBMISSIONS',
    dayType: 'PRACTICAL_COLLEGE',
    targetHours: 7.0,
    isAudited: false,
    notes: 'College Lab Submission Day 2: DMV & BIF Journals',
    tasks: [
      { id: 't-1020-1', subjectCode: 'PRACTICAL', unit: null, timeSlot: '10:00 AM – 2:00 PM', plannedHours: 3.0, title: 'DMV & BIF Lab Journal Verification', description: 'Complete continuous assessment rubric, signature stamps, and index entry.', isCompleted: false, isBacklog: false, originalDate: '2026-10-20', currentScheduledDate: '2026-10-20', priority: 'P1' },
      { id: 't-1020-2', subjectCode: 'ML', unit: 5, timeSlot: '4:00 PM – 6:30 PM', plannedHours: 2.5, title: 'Gradient Boosting & XGBoost Principles', description: 'Residual fitting, shrinkage rate eta, tree regularization, and split criterion.', isCompleted: false, isBacklog: false, originalDate: '2026-10-20', currentScheduledDate: '2026-10-20', priority: 'P1' },
      { id: 't-1020-3', subjectCode: 'BIF', unit: 5, timeSlot: '10:00 PM – 11:30 PM', plannedHours: 1.5, title: 'Microarray Normalization Techniques', description: 'Quantile normalization, RMA, and differential gene expression analysis.', isCompleted: false, isBacklog: false, originalDate: '2026-10-20', currentScheduledDate: '2026-10-20', priority: 'P2' }
    ]
  },
  {
    date: '2026-10-21',
    dayOfWeek: 'Wednesday',
    phase: 'SUBMISSIONS',
    dayType: 'PRACTICAL_COLLEGE',
    targetHours: 7.5,
    isAudited: false,
    notes: 'Project Phase-1 Progress Review & IR Lab Viva',
    tasks: [
      { id: 't-1021-1', subjectCode: 'GENERAL', unit: null, timeSlot: '10:00 AM – 1:30 PM', plannedHours: 3.0, title: 'BE Capstone Project Phase-1 Guide Review', description: 'Present literature survey, system architecture diagrams, and dataset preprocessing pipeline.', isCompleted: false, isBacklog: false, originalDate: '2026-10-21', currentScheduledDate: '2026-10-21', priority: 'P1' },
      { id: 't-1021-2', subjectCode: 'IR', unit: 6, timeSlot: '3:30 PM – 6:00 PM', plannedHours: 2.5, title: 'IR Evaluation Metrics (MAP, MRR, NDCG)', description: 'Calculate Mean Average Precision (MAP), Mean Reciprocal Rank (MRR), and NDCG@K step-by-step.', isCompleted: false, isBacklog: false, originalDate: '2026-10-21', currentScheduledDate: '2026-10-21', priority: 'P1' },
      { id: 't-1021-3', subjectCode: 'ML', unit: 6, timeSlot: '9:30 PM – 11:30 PM', plannedHours: 2.0, title: 'Feedforward Neural Networks & Activations', description: 'Sigmoid, Tanh, ReLU, Leaky ReLU, Softmax mathematical definitions and derivative graphs.', isCompleted: false, isBacklog: false, originalDate: '2026-10-21', currentScheduledDate: '2026-10-21', priority: 'P1' }
    ]
  },
  {
    date: '2026-10-22',
    dayOfWeek: 'Thursday',
    phase: 'SUBMISSIONS',
    dayType: 'PRACTICAL_COLLEGE',
    targetHours: 7.0,
    isAudited: false,
    notes: 'Final Signoff of all 4 Subject Lab Portfolios',
    tasks: [
      { id: 't-1022-1', subjectCode: 'PRACTICAL', unit: null, timeSlot: '10:00 AM – 1:00 PM', plannedHours: 3.0, title: 'Department Final Signoff & Hall Ticket Verification', description: 'Obtain all teacher signatures, internal marks tally, and check nominal roll entries.', isCompleted: false, isBacklog: false, originalDate: '2026-10-22', currentScheduledDate: '2026-10-22', priority: 'ROUTINE' },
      { id: 't-1022-2', subjectCode: 'BIF', unit: 5, timeSlot: '3:30 PM – 6:00 PM', plannedHours: 2.5, title: 'BLAST vs. FASTA Algorithms', description: 'Heuristic alignment methods: word search, scoring matrices (PAM vs BLOSUM), and E-value interpretation.', isCompleted: false, isBacklog: false, originalDate: '2026-10-22', currentScheduledDate: '2026-10-22', priority: 'P1' },
      { id: 't-1022-3', subjectCode: 'DMV', unit: 6, timeSlot: '10:00 PM – 11:30 PM', plannedHours: 1.5, title: 'Dashboarding Architectures (Dash & Streamlit)', description: 'Reactive state management, component layout grids, and interactive callback functions.', isCompleted: false, isBacklog: false, originalDate: '2026-10-22', currentScheduledDate: '2026-10-22', priority: 'P2' }
    ]
  },
  {
    date: '2026-10-23',
    dayOfWeek: 'Friday',
    phase: 'SUBMISSIONS',
    dayType: 'PRACTICAL_COLLEGE',
    targetHours: 7.0,
    isAudited: false,
    notes: 'Internal Mock Practical Exam Drill',
    tasks: [
      { id: 't-1023-1', subjectCode: 'PRACTICAL', unit: null, timeSlot: '10:00 AM – 1:30 PM', plannedHours: 3.0, title: 'College Internal Mock Practical Exam', description: 'Simulate 2-hour coding session (ML Wine PCA + DMV Airbnb visualization) under timed supervision.', isCompleted: false, isBacklog: false, originalDate: '2026-10-23', currentScheduledDate: '2026-10-23', priority: 'P1' },
      { id: 't-1023-2', subjectCode: 'IR', unit: 6, timeSlot: '3:30 PM – 6:00 PM', plannedHours: 2.5, title: 'Latent Semantic Analysis (LSA) & SVD', description: 'Singular Value Decomposition math (U * Sigma * V^T) and low-rank approximation for semantic search.', isCompleted: false, isBacklog: false, originalDate: '2026-10-23', currentScheduledDate: '2026-10-23', priority: 'P1' },
      { id: 't-1023-3', subjectCode: 'ML', unit: 6, timeSlot: '10:00 PM – 11:30 PM', plannedHours: 1.5, title: 'Backpropagation Gradient Derivation', description: 'Chain rule application for weights between hidden and output layer with squared error loss.', isCompleted: false, isBacklog: false, originalDate: '2026-10-23', currentScheduledDate: '2026-10-23', priority: 'P1' }
    ]
  },
  {
    date: '2026-10-24',
    dayOfWeek: 'Saturday',
    phase: 'SUBMISSIONS',
    dayType: 'SATURDAY',
    targetHours: 9.83,
    isAudited: false,
    notes: 'Saturday Marathon: Practical Code Execution Blitz',
    tasks: [
      { id: 't-1024-1', subjectCode: 'PRACTICAL', unit: null, timeSlot: '11:00 AM – 2:00 PM', plannedHours: 3.0, title: 'Deep Code Execution: ML Assignments 1-6', description: 'Re-run Linear Regression, KNN, K-Means, SVM, Decision Tree, and PCA scripts locally.', isCompleted: false, isBacklog: false, originalDate: '2026-10-24', currentScheduledDate: '2026-10-24', priority: 'APPLICATION' },
      { id: 't-1024-2', subjectCode: 'BIF', unit: 6, timeSlot: '3:00 PM – 5:20 PM', plannedHours: 2.33, title: 'Needleman-Wunsch Global Alignment Matrix', description: 'Manual computation of dynamic programming grid with match +1, mismatch -1, gap -2, and traceback.', isCompleted: false, isBacklog: false, originalDate: '2026-10-24', currentScheduledDate: '2026-10-24', priority: 'P1' },
      { id: 't-1024-3', subjectCode: 'DMV', unit: 5, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'Pandas Aggregations & Pivot Tables', description: 'Master multi-index unstacking, crosstab matrices, and custom aggregation pipelines.', isCompleted: false, isBacklog: false, originalDate: '2026-10-24', currentScheduledDate: '2026-10-24', priority: 'P1' },
      { id: 't-1024-4', subjectCode: 'IR', unit: 4, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Complete-Link & Average-Link Clustering', description: 'Solve hierarchical distance matrix with MAX and average distance merging criteria.', isCompleted: false, isBacklog: false, originalDate: '2026-10-24', currentScheduledDate: '2026-10-24', priority: 'P1' }
    ]
  },
  {
    date: '2026-10-25',
    dayOfWeek: 'Sunday',
    phase: 'SUBMISSIONS',
    dayType: 'SUNDAY',
    targetHours: 6.5,
    isAudited: false,
    notes: 'Circadian Buffer & Practical Exam Pre-Flight Check',
    tasks: [
      { id: 't-1025-1', subjectCode: 'PRACTICAL', unit: null, timeSlot: '12:00 PM – 2:30 PM', plannedHours: 2.5, title: 'External Viva Oral Q&A Fast Flashcard Drill', description: 'Memorize answers to 40 standard viva examiner questions across ML, DMV, BIF, and IR.', isCompleted: false, isBacklog: false, originalDate: '2026-10-25', currentScheduledDate: '2026-10-25', priority: 'P1' },
      { id: 't-1025-2', subjectCode: 'ML', unit: 3, timeSlot: '7:30 PM – 9:30 PM', plannedHours: 2.0, title: 'ROC & Precision-Recall Curve Properties', description: 'True Positive Rate vs. False Positive Rate, AUC interpretation, and optimal threshold selection.', isCompleted: false, isBacklog: false, originalDate: '2026-10-25', currentScheduledDate: '2026-10-25', priority: 'P1' },
      { id: 't-1025-3', subjectCode: 'GENERAL', unit: null, timeSlot: '10:30 PM – 12:30 AM', plannedHours: 2.0, title: 'Practical Exam Logistics & Kit Preparation', description: 'Organize signed journals, college ID, stationery, and review clean code templates.', isCompleted: false, isBacklog: false, originalDate: '2026-10-25', currentScheduledDate: '2026-10-25', priority: 'ROUTINE' }
    ]
  },

  // ==========================================
  // PHASE 3: PRACTICAL EXAMS & INTENSIVE SPRINT (OCT 26 - NOV 05)
  // ==========================================
  {
    date: '2026-10-26',
    dayOfWeek: 'Monday',
    phase: 'PRACTICALS',
    dayType: 'PRACTICAL_COLLEGE',
    targetHours: 7.0,
    isAudited: false,
    notes: '🎯 SPPU External Practical Exam: Machine Learning Lab',
    tasks: [
      { id: 't-1026-1', subjectCode: 'PRACTICAL', unit: null, timeSlot: '9:00 AM – 1:00 PM', plannedHours: 4.0, title: 'SPPU Machine Learning Lab Practical Exam', description: 'Execute assigned ML problem statement on lab machine and defend oral viva with External Examiner.', isCompleted: false, isBacklog: false, originalDate: '2026-10-26', currentScheduledDate: '2026-10-26', priority: 'P1' },
      { id: 't-1026-2', subjectCode: 'ML', unit: 6, timeSlot: '5:00 PM – 7:00 PM', plannedHours: 2.0, title: 'Convolutional Neural Networks (CNN) Architecture', description: 'Convolution kernel, stride, padding, Max pooling, and feature map dimensions calculation.', isCompleted: false, isBacklog: false, originalDate: '2026-10-26', currentScheduledDate: '2026-10-26', priority: 'P1' },
      { id: 't-1026-3', subjectCode: 'DMV', unit: 6, timeSlot: '9:30 PM – 10:30 PM', plannedHours: 1.0, title: 'Geospatial & Time-Series Visual Encodings', description: 'Choropleth maps, bubble maps, seasonal decomposition plots, and streamgraphs.', isCompleted: false, isBacklog: false, originalDate: '2026-10-26', currentScheduledDate: '2026-10-26', priority: 'P2' }
    ]
  },
  {
    date: '2026-10-27',
    dayOfWeek: 'Tuesday',
    phase: 'PRACTICALS',
    dayType: 'PRACTICAL_COLLEGE',
    targetHours: 7.0,
    isAudited: false,
    notes: '🎯 SPPU External Practical Exam: DMV Lab',
    tasks: [
      { id: 't-1027-1', subjectCode: 'PRACTICAL', unit: null, timeSlot: '9:00 AM – 1:00 PM', plannedHours: 4.0, title: 'SPPU Data Mining & Visualization Practical Exam', description: 'Implement interactive EDA visualization assignment and answer data cleaning viva questions.', isCompleted: false, isBacklog: false, originalDate: '2026-10-27', currentScheduledDate: '2026-10-27', priority: 'P1' },
      { id: 't-1027-2', subjectCode: 'BIF', unit: 6, timeSlot: '5:00 PM – 7:00 PM', plannedHours: 2.0, title: 'Phylogenetic Tree Construction (UPGMA & NJ)', description: 'Step-by-step UPGMA distance matrix recalculation and Neighbor-Joining star decomposition.', isCompleted: false, isBacklog: false, originalDate: '2026-10-27', currentScheduledDate: '2026-10-27', priority: 'P1' },
      { id: 't-1027-3', subjectCode: 'IR', unit: 6, timeSlot: '9:30 PM – 10:30 PM', plannedHours: 1.0, title: 'Vector Search & Approximate Nearest Neighbors', description: 'HNSW graphs, Inverted File Index (IVF), and cosine quantization.', isCompleted: false, isBacklog: false, originalDate: '2026-10-27', currentScheduledDate: '2026-10-27', priority: 'P2' }
    ]
  },
  {
    date: '2026-10-28',
    dayOfWeek: 'Wednesday',
    phase: 'PRACTICALS',
    dayType: 'PRACTICAL_COLLEGE',
    targetHours: 7.0,
    isAudited: false,
    notes: '🎯 SPPU External Practical Exam: Elective Lab (BIF/IR)',
    tasks: [
      { id: 't-1028-1', subjectCode: 'PRACTICAL', unit: null, timeSlot: '9:00 AM – 1:00 PM', plannedHours: 4.0, title: 'SPPU Elective Practical Exam & Viva Defense', description: 'Execute sequence alignment / inverted index retrieval script with external evaluation.', isCompleted: false, isBacklog: false, originalDate: '2026-10-28', currentScheduledDate: '2026-10-28', priority: 'P1' },
      { id: 't-1028-2', subjectCode: 'ML', unit: 6, timeSlot: '5:00 PM – 7:00 PM', plannedHours: 2.0, title: 'Deep Learning Optimizers (SGD, RMSProp, Adam)', description: 'Momentum equations, exponential moving averages of gradients, and adaptive learning rates.', isCompleted: false, isBacklog: false, originalDate: '2026-10-28', currentScheduledDate: '2026-10-28', priority: 'P1' },
      { id: 't-1028-3', subjectCode: 'DMV', unit: 3, timeSlot: '9:30 PM – 10:30 PM', plannedHours: 1.0, title: 'Visual Encodings Effectiveness Ranking', description: 'Mackinlay and Cleveland & McGill ranking of quantitative, ordinal, and nominal encodings.', isCompleted: false, isBacklog: false, originalDate: '2026-10-28', currentScheduledDate: '2026-10-28', priority: 'P1' }
    ]
  },
  {
    date: '2026-10-29',
    dayOfWeek: 'Thursday',
    phase: 'PRACTICALS',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'Transition to 100% Theory Focus',
    tasks: [
      { id: 't-1029-1', subjectCode: 'ML', unit: 3, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'Decision Tree Splitting Criteria', description: 'Entropy, Information Gain, Gini Impurity, and Gain Ratio calculations with numerical table.', isCompleted: false, isBacklog: false, originalDate: '2026-10-29', currentScheduledDate: '2026-10-29', priority: 'P1' },
      { id: 't-1029-2', subjectCode: 'IR', unit: 3, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'Boolean Model vs. Vector Space Model', description: 'Exact match limitations, term weighting advantages, and query evaluation algorithms.', isCompleted: false, isBacklog: false, originalDate: '2026-10-29', currentScheduledDate: '2026-10-29', priority: 'P1' },
      { id: 't-1029-3', subjectCode: 'BIF', unit: 3, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Ramachandran Plot & Secondary Structure', description: 'Psi vs. Phi steric hindrance, allowed alpha-helix and beta-sheet regions, and Proline/Glycine behavior.', isCompleted: false, isBacklog: false, originalDate: '2026-10-29', currentScheduledDate: '2026-10-29', priority: 'P1' }
    ]
  },
  {
    date: '2026-10-30',
    dayOfWeek: 'Friday',
    phase: 'PRACTICALS',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'Hidden Markov Models in BIF & CNN Feature Maps',
    tasks: [
      { id: 't-1030-1', subjectCode: 'BIF', unit: 6, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'Hidden Markov Models (HMM) in Gene Prediction', description: 'Emission probabilities, transition probabilities, and Viterbi decoding algorithm in DNA modeling.', isCompleted: false, isBacklog: false, originalDate: '2026-10-30', currentScheduledDate: '2026-10-30', priority: 'P1' },
      { id: 't-1030-2', subjectCode: 'ML', unit: 6, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'CNN Architecture Case Studies (LeNet, AlexNet, VGG)', description: 'Layer configurations, parameter counts, receptive fields, and 1x1 convolutions in modern vision models.', isCompleted: false, isBacklog: false, originalDate: '2026-10-30', currentScheduledDate: '2026-10-30', priority: 'P1' },
      { id: 't-1030-3', subjectCode: 'DMV', unit: 4, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Spring Embedder Layout Algorithm', description: 'Eades algorithm, Fruchterman-Reingold model, and grid variant computational complexity.', isCompleted: false, isBacklog: false, originalDate: '2026-10-30', currentScheduledDate: '2026-10-30', priority: 'P1' }
    ]
  },
  {
    date: '2026-10-31',
    dayOfWeek: 'Saturday',
    phase: 'PRACTICALS',
    dayType: 'SATURDAY',
    targetHours: 9.83,
    isAudited: false,
    notes: 'Saturday Marathon: IR & ML Comprehensive Solving',
    tasks: [
      { id: 't-1031-1', subjectCode: 'IR', unit: 3, timeSlot: '11:00 AM – 2:00 PM', plannedHours: 3.0, title: 'TF-IDF Cosine Similarity 3-Document Matrix', description: 'Compute document term matrix, document lengths, and rank query Q with Cosine metric by hand.', isCompleted: false, isBacklog: false, originalDate: '2026-10-31', currentScheduledDate: '2026-10-31', priority: 'P1' },
      { id: 't-1031-2', subjectCode: 'ML', unit: 4, timeSlot: '3:00 PM – 5:20 PM', plannedHours: 2.33, title: 'K-Means 2D Step-by-Step Numerical', description: 'Calculate Euclidean distances to initial centroids, assign 6 points, and calculate updated mean vectors.', isCompleted: false, isBacklog: false, originalDate: '2026-10-31', currentScheduledDate: '2026-10-31', priority: 'P1' },
      { id: 't-1031-3', subjectCode: 'DMV', unit: 4, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'MDS Proximity Matrix Solving', description: 'Double centering matrix B, eigenvalue decomposition, and coordinate extraction for 4 objects.', isCompleted: false, isBacklog: false, originalDate: '2026-10-31', currentScheduledDate: '2026-10-31', priority: 'P1' },
      { id: 't-1031-4', subjectCode: 'BIF', unit: 4, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Biological Network Motifs & Feedback Loops', description: 'Feed-forward loops (coherent vs incoherent), bifans, and negative feedback stability.', isCompleted: false, isBacklog: false, originalDate: '2026-10-31', currentScheduledDate: '2026-10-31', priority: 'P1' }
    ]
  },
  {
    date: '2026-11-01',
    dayOfWeek: 'Sunday',
    phase: 'PRACTICALS',
    dayType: 'SUNDAY',
    targetHours: 6.5,
    isAudited: false,
    notes: 'Sunday Subject Mind Map & Synthesis',
    tasks: [
      { id: 't-1101-1', subjectCode: 'ML', unit: 5, timeSlot: '12:00 PM – 2:30 PM', plannedHours: 2.5, title: 'AdaBoost 4-Sample Weight Calculation', description: 'Manually solve sample weight update table, alpha_1, error rate epsilon_1, and re-normalized weights.', isCompleted: false, isBacklog: false, originalDate: '2026-11-01', currentScheduledDate: '2026-11-01', priority: 'P1' },
      { id: 't-1101-2', subjectCode: 'IR', unit: 5, timeSlot: '7:30 PM – 9:30 PM', plannedHours: 2.0, title: 'PageRank Damping Power Iteration', description: 'Solve 3-node graph PageRank with d=0.70 for iteration 1 and iteration 2.', isCompleted: false, isBacklog: false, originalDate: '2026-11-01', currentScheduledDate: '2026-11-01', priority: 'P1' },
      { id: 't-1101-3', subjectCode: 'DMV', unit: 5, timeSlot: '10:30 PM – 12:30 AM', plannedHours: 2.0, title: 'Split-Apply-Combine Window Functions & Rolling Stats', description: 'Pandas rolling window calculations, cumulative operations, and groupby transforms.', isCompleted: false, isBacklog: false, originalDate: '2026-11-01', currentScheduledDate: '2026-11-01', priority: 'P2' }
    ]
  },
  {
    date: '2026-11-02',
    dayOfWeek: 'Monday',
    phase: 'PRACTICALS',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'RNN & LSTM Vanishing Gradient Theory',
    tasks: [
      { id: 't-1102-1', subjectCode: 'ML', unit: 6, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'Recurrent Neural Networks (RNN) & LSTM Gates', description: 'Vanishing gradient problem in BPTT; derive Forget, Input, and Output gate equations for LSTM.', isCompleted: false, isBacklog: false, originalDate: '2026-11-02', currentScheduledDate: '2026-11-02', priority: 'P1' },
      { id: 't-1102-2', subjectCode: 'DMV', unit: 3, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: '3D Graphics Limitations & Human Visual Perception', description: 'Occlusion, perspective distortion, depth cues, and Tufte principles of graphical integrity.', isCompleted: false, isBacklog: false, originalDate: '2026-11-02', currentScheduledDate: '2026-11-02', priority: 'P1' },
      { id: 't-1102-3', subjectCode: 'IR', unit: 3, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Inverted Index Construction & Postings List', description: 'Term vocabulary dictionary, postings lists with document IDs and term frequencies, and intersection algorithm.', isCompleted: false, isBacklog: false, originalDate: '2026-11-02', currentScheduledDate: '2026-11-02', priority: 'P1' }
    ]
  },
  {
    date: '2026-11-03',
    dayOfWeek: 'Tuesday',
    phase: 'PRACTICALS',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'Smith-Waterman Local Alignment & NDCG@5',
    tasks: [
      { id: 't-1103-1', subjectCode: 'BIF', unit: 6, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'Smith-Waterman Local Alignment Trace', description: 'Dynamic programming with 0-cutoff condition, finding local highest scoring sub-alignment.', isCompleted: false, isBacklog: false, originalDate: '2026-11-03', currentScheduledDate: '2026-11-03', priority: 'P1' },
      { id: 't-1103-2', subjectCode: 'IR', unit: 6, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'NDCG@5 Manual Ranking Computation', description: 'Given relevance scores [3, 2, 3, 0, 1], compute Gain, Discounted Gain, Ideal DCG, and NDCG@5.', isCompleted: false, isBacklog: false, originalDate: '2026-11-03', currentScheduledDate: '2026-11-03', priority: 'P1' },
      { id: 't-1103-3', subjectCode: 'ML', unit: 3, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Confusion Matrix 3x3 Macro vs Micro F1', description: 'Calculate precision and recall for Class A, Class B, and Class C; contrast Macro vs Micro F1.', isCompleted: false, isBacklog: false, originalDate: '2026-11-03', currentScheduledDate: '2026-11-03', priority: 'P1' }
    ]
  },
  {
    date: '2026-11-04',
    dayOfWeek: 'Wednesday',
    phase: 'PRACTICALS',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'Data Imputation & Random Forest OOB Error',
    tasks: [
      { id: 't-1104-1', subjectCode: 'DMV', unit: 4, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'Missing Data Imputation Techniques', description: 'MCAR, MAR, MNAR mechanisms; mean/median, KNN-imputer, and MICE iterative methods.', isCompleted: false, isBacklog: false, originalDate: '2026-11-04', currentScheduledDate: '2026-11-04', priority: 'P1' },
      { id: 't-1104-2', subjectCode: 'ML', unit: 5, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'Random Forest Out-of-Bag (OOB) Error', description: 'Derive probability of a sample not being selected in bootstrap sample (approx 1/e = 36.8%).', isCompleted: false, isBacklog: false, originalDate: '2026-11-04', currentScheduledDate: '2026-11-04', priority: 'P1' },
      { id: 't-1104-3', subjectCode: 'BIF', unit: 4, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Systems Biology Feedback Control', description: 'Positive feedback bi-stability and negative feedback homeostatic noise suppression.', isCompleted: false, isBacklog: false, originalDate: '2026-11-04', currentScheduledDate: '2026-11-04', priority: 'P2' }
    ]
  },
  {
    date: '2026-11-05',
    dayOfWeek: 'Thursday',
    phase: 'PRACTICALS',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'Web Search Ranking & Stacking Architectures',
    tasks: [
      { id: 't-1105-1', subjectCode: 'IR', unit: 5, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'Search Engine Click-Through Rate (CTR) Models', description: 'Position bias models, user browsing models (UBM), and click log feedback in ranking.', isCompleted: false, isBacklog: false, originalDate: '2026-11-05', currentScheduledDate: '2026-11-05', priority: 'P1' },
      { id: 't-1105-2', subjectCode: 'ML', unit: 5, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'Stacking vs Blending Ensemble Architectures', description: 'K-fold out-of-fold predictions generation, level-1 meta feature matrix, and risk of leakage.', isCompleted: false, isBacklog: false, originalDate: '2026-11-05', currentScheduledDate: '2026-11-05', priority: 'P1' },
      { id: 't-1105-3', subjectCode: 'BIF', unit: 5, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Genomic PCA vs. t-SNE / UMAP', description: 'Non-linear dimensionality reduction trade-offs for single-cell RNA sequencing visualization.', isCompleted: false, isBacklog: false, originalDate: '2026-11-05', currentScheduledDate: '2026-11-05', priority: 'P1' }
    ]
  },

  // ==========================================
  // PHASE 4: INTENSIVE THEORY MASTERY (NOV 06 - NOV 20)
  // ==========================================
  {
    date: '2026-11-06',
    dayOfWeek: 'Friday',
    phase: 'INTENSIVE',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'ML Unit 3 Supervised Mastery (Dec 2022 & May 2023 PYQs)',
    tasks: [
      { id: 't-1106-1', subjectCode: 'ML', unit: 3, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'ML Unit 3 University PYQs Drill', description: 'Solve SPPU Dec 2022 and May 2023 10-mark questions on SVM dual formulation and decision trees.', isCompleted: false, isBacklog: false, originalDate: '2026-11-06', currentScheduledDate: '2026-11-06', priority: 'P1' },
      { id: 't-1106-2', subjectCode: 'DMV', unit: 3, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'DMV Unit 3 Historical Graphics & Encodings', description: 'Minards Napoleon chart, Playfair graphics, and graphical perception principles.', isCompleted: false, isBacklog: false, originalDate: '2026-11-06', currentScheduledDate: '2026-11-06', priority: 'P1' },
      { id: 't-1106-3', subjectCode: 'IR', unit: 3, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'IR Binary Independence Model (BIM) Derivation', description: 'Derive Retrieval Status Value (RSV) formula from odds ratio and Bayes rule.', isCompleted: false, isBacklog: false, originalDate: '2026-11-06', currentScheduledDate: '2026-11-06', priority: 'P1' }
    ]
  },
  {
    date: '2026-11-07',
    dayOfWeek: 'Saturday',
    phase: 'INTENSIVE',
    dayType: 'SATURDAY',
    targetHours: 9.83,
    isAudited: false,
    notes: 'Saturday Marathon: Unit 4 Deep Solving across all subjects',
    tasks: [
      { id: 't-1107-1', subjectCode: 'ML', unit: 4, timeSlot: '11:00 AM – 2:00 PM', plannedHours: 3.0, title: 'ML Unit 4 Unsupervised PYQs & GMM EM Derivation', description: 'Derive GMM responsibility weights gamma_ik and M-step mean vector update formulas.', isCompleted: false, isBacklog: false, originalDate: '2026-11-07', currentScheduledDate: '2026-11-07', priority: 'P1' },
      { id: 't-1107-2', subjectCode: 'DMV', unit: 4, timeSlot: '3:00 PM – 5:20 PM', plannedHours: 2.33, title: 'DMV Unit 4 Graph Drawing PYQ Drill', description: 'Solve SPPU Dec 2023 questions on planar graph drawing and force-directed convergence.', isCompleted: false, isBacklog: false, originalDate: '2026-11-07', currentScheduledDate: '2026-11-07', priority: 'P1' },
      { id: 't-1107-3', subjectCode: 'BIF', unit: 3, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'BIF Unit 3 CADD & Docking PYQ Drill', description: 'Structure-based vs. Ligand-based drug design; grid-based energy evaluation functions.', isCompleted: false, isBacklog: false, originalDate: '2026-11-07', currentScheduledDate: '2026-11-07', priority: 'P1' },
      { id: 't-1107-4', subjectCode: 'IR', unit: 4, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'IR Unit 4 Hierarchical Clustering PYQ Drill', description: 'Solve 5-document distance matrix using Single-Link and Complete-Link criteria.', isCompleted: false, isBacklog: false, originalDate: '2026-11-07', currentScheduledDate: '2026-11-07', priority: 'P1' }
    ]
  },
  {
    date: '2026-11-08',
    dayOfWeek: 'Sunday',
    phase: 'INTENSIVE',
    dayType: 'SUNDAY',
    targetHours: 6.5,
    isAudited: false,
    notes: 'Sunday Numerical Solving: Cosine Similarity & UPGMA',
    tasks: [
      { id: 't-1108-1', subjectCode: 'IR', unit: 3, timeSlot: '12:00 PM – 2:30 PM', plannedHours: 2.5, title: 'Vector Space Model 4-Document Cosine Solving', description: 'Hand-calculate term frequencies, inverse document frequencies, and ranked cosine scores.', isCompleted: false, isBacklog: false, originalDate: '2026-11-08', currentScheduledDate: '2026-11-08', priority: 'P1' },
      { id: 't-1108-2', subjectCode: 'BIF', unit: 6, timeSlot: '7:30 PM – 9:30 PM', plannedHours: 2.0, title: 'UPGMA 5-Taxa Phylogenetic Tree Construction', description: 'Calculate distance matrix iterations, draw rooted tree, and compute branch lengths.', isCompleted: false, isBacklog: false, originalDate: '2026-11-08', currentScheduledDate: '2026-11-08', priority: 'P1' },
      { id: 't-1108-3', subjectCode: 'ML', unit: 5, timeSlot: '10:30 PM – 12:30 AM', plannedHours: 2.0, title: 'AdaBoost 5-Sample Hand Numerical', description: 'Solve round 1 and round 2 sample weights and weak classifier decision stump boundaries.', isCompleted: false, isBacklog: false, originalDate: '2026-11-08', currentScheduledDate: '2026-11-08', priority: 'P1' }
    ]
  },
  {
    date: '2026-11-09',
    dayOfWeek: 'Monday',
    phase: 'INTENSIVE',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'ML Unit 5 Ensemble PYQs & PageRank Iteration',
    tasks: [
      { id: 't-1109-1', subjectCode: 'ML', unit: 5, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'ML Unit 5 Ensemble Mastery PYQs', description: 'Solve SPPU Dec 2023 & May 2024 questions on AdaBoost weight updates and Random Forest OOB error.', isCompleted: false, isBacklog: false, originalDate: '2026-11-09', currentScheduledDate: '2026-11-09', priority: 'P1' },
      { id: 't-1109-2', subjectCode: 'DMV', unit: 5, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'DMV Unit 5 Advanced Visualization Pipelines', description: 'Write full Python code for multi-facet subplots, correlation matrices, and custom colormaps.', isCompleted: false, isBacklog: false, originalDate: '2026-11-09', currentScheduledDate: '2026-11-09', priority: 'P1' },
      { id: 't-1109-3', subjectCode: 'IR', unit: 5, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'PageRank 4-Node Transition Matrix Iteration', description: 'Compute PageRank vector r^(k+1) = d * M * r^(k) + (1-d)/N * 1 for two iterations.', isCompleted: false, isBacklog: false, originalDate: '2026-11-09', currentScheduledDate: '2026-11-09', priority: 'P1' }
    ]
  },
  {
    date: '2026-11-10',
    dayOfWeek: 'Tuesday',
    phase: 'INTENSIVE',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'BIF Systems Biology & IR Evaluation Metrics',
    tasks: [
      { id: 't-1110-1', subjectCode: 'BIF', unit: 4, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'BIF Unit 4 Network Biology PYQ Mastery', description: 'Solve SPPU questions on scale-free biological networks, power-law degree distributions, and hub vulnerability.', isCompleted: false, isBacklog: false, originalDate: '2026-11-10', currentScheduledDate: '2026-11-10', priority: 'P1' },
      { id: 't-1110-2', subjectCode: 'IR', unit: 6, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'IR Unit 6 MAP & 11-Point Interpolated Precision', description: 'Calculate Average Precision (AP) for 3 queries, compute Mean AP, and plot 11-point precision-recall curve.', isCompleted: false, isBacklog: false, originalDate: '2026-11-10', currentScheduledDate: '2026-11-10', priority: 'P1' },
      { id: 't-1110-3', subjectCode: 'ML', unit: 6, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'ML Unit 6 CNN Calculations & Receptive Field', description: 'Calculate output dimensions and number of trainable parameters for 3-layer CNN.', isCompleted: false, isBacklog: false, originalDate: '2026-11-10', currentScheduledDate: '2026-11-10', priority: 'P1' }
    ]
  },
  {
    date: '2026-11-11',
    dayOfWeek: 'Wednesday',
    phase: 'INTENSIVE',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'ML Deep Learning & Backpropagation PYQs',
    tasks: [
      { id: 't-1110-4', subjectCode: 'ML', unit: 6, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'ML Unit 6 Backpropagation Numerical Solving', description: 'Execute 1 forward pass and 1 backward pass on a 2-2-1 neural network by hand.', isCompleted: false, isBacklog: false, originalDate: '2026-11-11', currentScheduledDate: '2026-11-11', priority: 'P1' },
      { id: 't-1111-1', subjectCode: 'DMV', unit: 6, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'DMV Unit 6 Spatial Plots & Dashboard Layouts', description: 'Design interactive dashboard wireframes, filter widgets, and layout responsive grids.', isCompleted: false, isBacklog: false, originalDate: '2026-11-11', currentScheduledDate: '2026-11-11', priority: 'P1' },
      { id: 't-1111-2', subjectCode: 'BIF', unit: 5, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'BIF Unit 5 Genomic Data Mining PYQs', description: 'Feature selection algorithms for gene expression matrices and curse of dimensionality in genomics.', isCompleted: false, isBacklog: false, originalDate: '2026-11-11', currentScheduledDate: '2026-11-11', priority: 'P1' }
    ]
  },
  {
    date: '2026-11-12',
    dayOfWeek: 'Thursday',
    phase: 'INTENSIVE',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'IR Complete Subject PYQ Solving (2019 Pattern)',
    tasks: [
      { id: 't-1112-1', subjectCode: 'IR', unit: 3, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'IR Units 3 & 4 Comprehensive PYQ Solving', description: 'Solve SPPU May 2023 & Dec 2023 papers for Information Retrieval (40 Marks).', isCompleted: false, isBacklog: false, originalDate: '2026-11-12', currentScheduledDate: '2026-11-12', priority: 'P1' },
      { id: 't-1112-2', subjectCode: 'BIF', unit: 6, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'BIF Units 5 & 6 Comprehensive PYQ Solving', description: 'Solve SPPU Dec 2023 & May 2024 papers for Bioinformatics (40 Marks).', isCompleted: false, isBacklog: false, originalDate: '2026-11-12', currentScheduledDate: '2026-11-12', priority: 'P1' },
      { id: 't-1112-3', subjectCode: 'ML', unit: 3, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'ML Regularization & Overfitting Mitigation', description: 'L1 Lasso (sparsity induction) vs. L2 Ridge (weight decay) and Dropout probability derivations.', isCompleted: false, isBacklog: false, originalDate: '2026-11-12', currentScheduledDate: '2026-11-12', priority: 'P1' }
    ]
  },
  {
    date: '2026-11-13',
    dayOfWeek: 'Friday',
    phase: 'INTENSIVE',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'DMV Complete Subject PYQ Solving',
    tasks: [
      { id: 't-1113-1', subjectCode: 'DMV', unit: 3, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'DMV Units 3 & 4 Comprehensive PYQ Solving', description: 'Solve SPPU May 2023 & Dec 2023 papers for Data Mining & Visualization.', isCompleted: false, isBacklog: false, originalDate: '2026-11-13', currentScheduledDate: '2026-11-13', priority: 'P1' },
      { id: 't-1113-2', subjectCode: 'ML', unit: 3, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'SVM Kernel Trick & Mercer Theorem', description: 'Define kernel function K(x, z) = phi(x) . phi(z); prove Mercer condition and construct RBF kernel space.', isCompleted: false, isBacklog: false, originalDate: '2026-11-13', currentScheduledDate: '2026-11-13', priority: 'P1' },
      { id: 't-1113-3', subjectCode: 'IR', unit: 3, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Inverted Index Compression Methods', description: 'Variable Byte (v-byte) encoding and Elias Gamma / Delta bit-level compression algorithms.', isCompleted: false, isBacklog: false, originalDate: '2026-11-13', currentScheduledDate: '2026-11-13', priority: 'P1' }
    ]
  },
  {
    date: '2026-11-14',
    dayOfWeek: 'Saturday',
    phase: 'INTENSIVE',
    dayType: 'SATURDAY',
    targetHours: 9.83,
    isAudited: false,
    notes: 'Saturday Marathon: 100-Mark Full Syllabus Mock Drill',
    tasks: [
      { id: 't-1114-1', subjectCode: 'ML', unit: 3, timeSlot: '11:00 AM – 2:00 PM', plannedHours: 3.0, title: 'Machine Learning 100-Mark Full Syllabus Speed Drill', description: 'Solve 10 top exam questions covering Units 3, 4, 5, and 6 under strict 3-hour timer.', isCompleted: false, isBacklog: false, originalDate: '2026-11-14', currentScheduledDate: '2026-11-14', priority: 'P1' },
      { id: 't-1114-2', subjectCode: 'DMV', unit: 4, timeSlot: '3:00 PM – 5:20 PM', plannedHours: 2.33, title: 'DMV Full Syllabus Design & Graph Layout Drill', description: 'Draw layouts for force-directed graphs, bipartite matching, and write pandas data manipulation pipelines.', isCompleted: false, isBacklog: false, originalDate: '2026-11-14', currentScheduledDate: '2026-11-14', priority: 'P1' },
      { id: 't-1114-3', subjectCode: 'BIF', unit: 3, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'BIF Full Syllabus Formula & Derivation Blitz', description: 'Review homology modeling, docking scoring, Cytoscape centrality, and alignment matrices.', isCompleted: false, isBacklog: false, originalDate: '2026-11-14', currentScheduledDate: '2026-11-14', priority: 'P1' },
      { id: 't-1114-4', subjectCode: 'IR', unit: 5, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'IR Evaluation & Ranking Metrics Blitz', description: 'Speed calculations for MAP, MRR, NDCG@5, and PageRank transition matrices.', isCompleted: false, isBacklog: false, originalDate: '2026-11-14', currentScheduledDate: '2026-11-14', priority: 'P1' }
    ]
  },
  {
    date: '2026-11-15',
    dayOfWeek: 'Sunday',
    phase: 'INTENSIVE',
    dayType: 'SUNDAY',
    targetHours: 6.5,
    isAudited: false,
    notes: 'Sunday Mock Analysis & Error Remediation',
    tasks: [
      { id: 't-1115-1', subjectCode: 'ML', unit: 4, timeSlot: '12:00 PM – 2:30 PM', plannedHours: 2.5, title: 'ML Mock Error Remediation & Formula Revision', description: 'Re-solve all incorrect numerical steps in K-Means, AdaBoost, and Backprop from Saturday drill.', isCompleted: false, isBacklog: false, originalDate: '2026-11-15', currentScheduledDate: '2026-11-15', priority: 'P1' },
      { id: 't-1115-2', subjectCode: 'BIF', unit: 3, timeSlot: '7:30 PM – 9:30 PM', plannedHours: 2.0, title: 'Ramachandran Plot Disallowed Regions Analysis', description: 'Analyze steric clashes between side chains and main chain; Glycine flexibility and Proline rigidity.', isCompleted: false, isBacklog: false, originalDate: '2026-11-15', currentScheduledDate: '2026-11-15', priority: 'P1' },
      { id: 't-1115-3', subjectCode: 'IR', unit: 5, timeSlot: '10:30 PM – 12:30 AM', plannedHours: 2.0, title: 'Spider Traps & Crawler Detection Algorithms', description: 'Dynamic URL traps, infinite calendar loops, and algorithmic detection mechanisms.', isCompleted: false, isBacklog: false, originalDate: '2026-11-15', currentScheduledDate: '2026-11-15', priority: 'P1' }
    ]
  },
  {
    date: '2026-11-16',
    dayOfWeek: 'Monday',
    phase: 'INTENSIVE',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'ML High-Yield 10-Mark Question Templates',
    tasks: [
      { id: 't-1116-1', subjectCode: 'ML', unit: 3, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'ML 10-Mark Model Answer Templates', description: 'Draft step-by-step master answers for SVM soft margin derivation and Decision Tree ID3 algorithm.', isCompleted: false, isBacklog: false, originalDate: '2026-11-16', currentScheduledDate: '2026-11-16', priority: 'P1' },
      { id: 't-1116-2', subjectCode: 'DMV', unit: 3, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'Visualization Ethics & Lie Factor Calculation', description: 'Derive Lie Factor = (Size of effect in graphic) / (Size of effect in data) with numerical examples.', isCompleted: false, isBacklog: false, originalDate: '2026-11-16', currentScheduledDate: '2026-11-16', priority: 'P1' },
      { id: 't-1116-3', subjectCode: 'IR', unit: 4, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Text Preprocessing Pipeline in IR', description: 'Tokenization, stopword removal, Porter stemmer rules, and lemmatization vs. stemming.', isCompleted: false, isBacklog: false, originalDate: '2026-11-16', currentScheduledDate: '2026-11-16', priority: 'P1' }
    ]
  },
  {
    date: '2026-11-17',
    dayOfWeek: 'Tuesday',
    phase: 'INTENSIVE',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'BIF Drug Discovery & IR 11-Point Precision',
    tasks: [
      { id: 't-1117-1', subjectCode: 'BIF', unit: 3, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'BIF Drug Discovery Pipeline & ADMET', description: 'Target identification, validation, lead optimization, and ADMET pharmacokinetic properties.', isCompleted: false, isBacklog: false, originalDate: '2026-11-17', currentScheduledDate: '2026-11-17', priority: 'P1' },
      { id: 't-1117-2', subjectCode: 'ML', unit: 3, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'Multi-Class Decision Boundaries (OvR vs OvO)', description: 'Derive formula for number of classifiers: N for OvR and N*(N-1)/2 for OvO; draw decision regions.', isCompleted: false, isBacklog: false, originalDate: '2026-11-17', currentScheduledDate: '2026-11-17', priority: 'P1' },
      { id: 't-1117-3', subjectCode: 'IR', unit: 6, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Precision-Recall Interpolation Curve Solving', description: 'Compute 11-point interpolated precision values at recall levels [0.0, 0.1, ..., 1.0].', isCompleted: false, isBacklog: false, originalDate: '2026-11-17', currentScheduledDate: '2026-11-17', priority: 'P1' }
    ]
  },
  {
    date: '2026-11-18',
    dayOfWeek: 'Wednesday',
    phase: 'INTENSIVE',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'Force-Directed Physics & GMM EM Derivation',
    tasks: [
      { id: 't-1118-1', subjectCode: 'DMV', unit: 4, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'Force-Directed Layout Physics Derivations', description: 'Hooke law attractive force F_a = d^2 / k and Coulomb electrical repulsive force F_r = -k^2 / d.', isCompleted: false, isBacklog: false, originalDate: '2026-11-18', currentScheduledDate: '2026-11-18', priority: 'P1' },
      { id: 't-1118-2', subjectCode: 'ML', unit: 4, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'GMM Expectation-Maximization Complete Derivation', description: 'Derive log-likelihood objective function, Jensen inequality lower bound, and variance update.', isCompleted: false, isBacklog: false, originalDate: '2026-11-18', currentScheduledDate: '2026-11-18', priority: 'P1' },
      { id: 't-1118-3', subjectCode: 'BIF', unit: 5, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Gene Expression Clustering (Hierarchical vs SOM)', description: 'Self-Organizing Maps (SOM) architecture and Kohonen learning rule for microarrays.', isCompleted: false, isBacklog: false, originalDate: '2026-11-18', currentScheduledDate: '2026-11-18', priority: 'P1' }
    ]
  },
  {
    date: '2026-11-19',
    dayOfWeek: 'Thursday',
    phase: 'INTENSIVE',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'BM25 Ranking Function & PDB Structure Format',
    tasks: [
      { id: 't-1119-1', subjectCode: 'IR', unit: 3, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'Okapi BM25 Ranking Function & Parameters', description: 'Derive BM25 formula with term saturation k1 and document length normalization parameter b.', isCompleted: false, isBacklog: false, originalDate: '2026-11-19', currentScheduledDate: '2026-11-19', priority: 'P1' },
      { id: 't-1119-2', subjectCode: 'BIF', unit: 3, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'Protein Data Bank (PDB) Format & Validation', description: 'ATOM, HETATM, SEQRES record structures, resolution metrics, and R-factor in crystallography.', isCompleted: false, isBacklog: false, originalDate: '2026-11-19', currentScheduledDate: '2026-11-19', priority: 'P1' },
      { id: 't-1119-3', subjectCode: 'ML', unit: 5, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'XGBoost Objective Function & Second-Order Taylor', description: 'Derive gradient g_i and hessian h_i expansion for optimal leaf weights w_j* and tree score.', isCompleted: false, isBacklog: false, originalDate: '2026-11-19', currentScheduledDate: '2026-11-19', priority: 'P1' }
    ]
  },
  {
    date: '2026-11-20',
    dayOfWeek: 'Friday',
    phase: 'INTENSIVE',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'Gestalt Laws in DMV & Semi-Supervised Learning',
    tasks: [
      { id: 't-1120-1', subjectCode: 'DMV', unit: 6, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'Gestalt Laws of Visual Perception in Dashboards', description: 'Proximity, Similarity, Enclosure, Continuity, and Connection applied to analytical UI.', isCompleted: false, isBacklog: false, originalDate: '2026-11-20', currentScheduledDate: '2026-11-20', priority: 'P1' },
      { id: 't-1120-2', subjectCode: 'ML', unit: 4, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'Semi-Supervised Learning & Self-Training', description: 'Pseudo-labeling algorithm, co-training with multi-view feature splits, and graph-based label propagation.', isCompleted: false, isBacklog: false, originalDate: '2026-11-20', currentScheduledDate: '2026-11-20', priority: 'P1' },
      { id: 't-1120-3', subjectCode: 'IR', unit: 5, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Web Crawler DNS Caching & Politeness Protocol', description: 'Mercator crawler architecture, per-host queue managers, and robots.txt caching.', isCompleted: false, isBacklog: false, originalDate: '2026-11-20', currentScheduledDate: '2026-11-20', priority: 'P1' }
    ]
  },

  // ==========================================
  // PHASE 5: FULL-LENGTH MOCKS & PYQ DRILLS (NOV 21 - NOV 28)
  // ==========================================
  {
    date: '2026-11-21',
    dayOfWeek: 'Saturday',
    phase: 'MOCKS',
    dayType: 'SATURDAY',
    targetHours: 9.83,
    isAudited: false,
    notes: '🎯 FULL MOCK EXAM 1: MACHINE LEARNING (3 Hours)',
    tasks: [
      { id: 't-1121-1', subjectCode: 'ML', unit: 3, timeSlot: '11:00 AM – 2:00 PM', plannedHours: 3.0, title: 'Full Mock Exam: Machine Learning (70 Marks)', description: 'Simulate full SPPU In-Sem + End-Sem question paper under strict 3-hour exam conditions.', isCompleted: false, isBacklog: false, originalDate: '2026-11-21', currentScheduledDate: '2026-11-21', priority: 'P1' },
      { id: 't-1121-2', subjectCode: 'ML', unit: 4, timeSlot: '3:00 PM – 5:20 PM', plannedHours: 2.33, title: 'ML Mock Paper Evaluation & Model Answer Audit', description: 'Cross-check answers against SPPU marking scheme; assign marks and identify scoring gaps.', isCompleted: false, isBacklog: false, originalDate: '2026-11-21', currentScheduledDate: '2026-11-21', priority: 'P1' },
      { id: 't-1121-3', subjectCode: 'ML', unit: 5, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'Targeted Remediation: Weak ML Topics', description: 'Deep study of all questions where marks were lost during mock simulation.', isCompleted: false, isBacklog: false, originalDate: '2026-11-21', currentScheduledDate: '2026-11-21', priority: 'P1' },
      { id: 't-1121-4', subjectCode: 'DMV', unit: 3, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'DMV Formula & Design Rules Quick Refresh', description: 'Review visual encodings, Lie factor, and Pandas groupby syntax.', isCompleted: false, isBacklog: false, originalDate: '2026-11-21', currentScheduledDate: '2026-11-21', priority: 'P2' }
    ]
  },
  {
    date: '2026-11-22',
    dayOfWeek: 'Sunday',
    phase: 'MOCKS',
    dayType: 'SUNDAY',
    targetHours: 6.5,
    isAudited: false,
    notes: '🎯 FULL MOCK EXAM 2: DATA MINING & VISUALIZATION (3 Hours)',
    tasks: [
      { id: 't-1122-1', subjectCode: 'DMV', unit: 4, timeSlot: '12:00 PM – 3:00 PM', plannedHours: 3.0, title: 'Full Mock Exam: DMV (70 Marks)', description: 'Write complete 3-hour SPPU End-Sem paper including graph algorithms and data wrangling code.', isCompleted: false, isBacklog: false, originalDate: '2026-11-22', currentScheduledDate: '2026-11-22', priority: 'P1' },
      { id: 't-1122-2', subjectCode: 'DMV', unit: 5, timeSlot: '7:30 PM – 9:30 PM', plannedHours: 2.0, title: 'DMV Mock Paper Self-Grading & Diagram Polish', description: 'Review chart sketches, graph draw clarity, and pandas code correctness.', isCompleted: false, isBacklog: false, originalDate: '2026-11-22', currentScheduledDate: '2026-11-22', priority: 'P1' },
      { id: 't-1122-3', subjectCode: 'BIF', unit: 3, timeSlot: '10:30 PM – 12:00 AM', plannedHours: 1.5, title: 'BIF Top 10 High-Yield Questions Rapid Blitz', description: 'Review Ramachandran plot, Homology modeling, and Cytoscape networks.', isCompleted: false, isBacklog: false, originalDate: '2026-11-22', currentScheduledDate: '2026-11-22', priority: 'P1' }
    ]
  },
  {
    date: '2026-11-23',
    dayOfWeek: 'Monday',
    phase: 'MOCKS',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: '🎯 FULL MOCK EXAM 3: INFORMATION RETRIEVAL (3 Hours)',
    tasks: [
      { id: 't-1123-1', subjectCode: 'IR', unit: 3, timeSlot: '2:00 PM – 5:00 PM', plannedHours: 3.0, title: 'Full Mock Exam: Information Retrieval (70 Marks)', description: 'Solve full 70-mark paper: TF-IDF, Single-link, PageRank, MAP, and Inverted Index.', isCompleted: false, isBacklog: false, originalDate: '2026-11-23', currentScheduledDate: '2026-11-23', priority: 'P1' },
      { id: 't-1123-2', subjectCode: 'IR', unit: 5, timeSlot: '7:30 PM – 9:30 PM', plannedHours: 2.0, title: 'IR Paper Audit & Numerical Accuracy Verification', description: 'Verify PageRank matrix calculations and cosine similarity fractions.', isCompleted: false, isBacklog: false, originalDate: '2026-11-23', currentScheduledDate: '2026-11-23', priority: 'P1' },
      { id: 't-1123-3', subjectCode: 'ML', unit: 3, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'ML Supervised Learning Speed Formulas Refresher', description: 'Quick recall of Gini impurity, entropy, soft margin SVM, and KNN distance.', isCompleted: false, isBacklog: false, originalDate: '2026-11-23', currentScheduledDate: '2026-11-23', priority: 'P1' }
    ]
  },
  {
    date: '2026-11-24',
    dayOfWeek: 'Tuesday',
    phase: 'MOCKS',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: '🎯 FULL MOCK EXAM 4: BIOINFORMATICS (3 Hours)',
    tasks: [
      { id: 't-1124-1', subjectCode: 'BIF', unit: 3, timeSlot: '2:00 PM – 5:00 PM', plannedHours: 3.0, title: 'Full Mock Exam: Bioinformatics (70 Marks)', description: 'Write full 3-hour SPPU End-Sem paper covering structure prediction, systems biology, and alignment.', isCompleted: false, isBacklog: false, originalDate: '2026-11-24', currentScheduledDate: '2026-11-24', priority: 'P1' },
      { id: 't-1124-2', subjectCode: 'BIF', unit: 6, timeSlot: '7:30 PM – 9:30 PM', plannedHours: 2.0, title: 'BIF Paper Audit & Needleman-Wunsch Verification', description: 'Check matrix traceback paths and scoring penalties against SPPU rubrics.', isCompleted: false, isBacklog: false, originalDate: '2026-11-24', currentScheduledDate: '2026-11-24', priority: 'P1' },
      { id: 't-1124-3', subjectCode: 'DMV', unit: 4, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'DMV Design Cheat Sheet Consolidation', description: 'Write 2-page master cheat sheet for all visual variables and graph algorithms.', isCompleted: false, isBacklog: false, originalDate: '2026-11-24', currentScheduledDate: '2026-11-24', priority: 'P1' }
    ]
  },
  {
    date: '2026-11-25',
    dayOfWeek: 'Wednesday',
    phase: 'MOCKS',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'Subject Rotation 1: ML Numerical Mastery Blitz',
    tasks: [
      { id: 't-1125-1', subjectCode: 'ML', unit: 3, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'ML Numerical Blitz: Confusion Matrix & KNN', description: 'Solve 4 different confusion matrix numericals and 2 KNN classification problems by hand.', isCompleted: false, isBacklog: false, originalDate: '2026-11-25', currentScheduledDate: '2026-11-25', priority: 'P1' },
      { id: 't-1125-2', subjectCode: 'ML', unit: 4, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'ML Numerical Blitz: K-Means & AdaBoost', description: 'Solve 1 complete K-Means 2-iteration problem and 1 AdaBoost sample weight update problem.', isCompleted: false, isBacklog: false, originalDate: '2026-11-25', currentScheduledDate: '2026-11-25', priority: 'P1' },
      { id: 't-1125-3', subjectCode: 'DMV', unit: 4, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Force-Directed Graph Convergence Review', description: 'Review step damping, temperature schedule, and termination conditions.', isCompleted: false, isBacklog: false, originalDate: '2026-11-25', currentScheduledDate: '2026-11-25', priority: 'P2' }
    ]
  },
  {
    date: '2026-11-26',
    dayOfWeek: 'Thursday',
    phase: 'MOCKS',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'Subject Rotation 2: IR Numericals Blitz',
    tasks: [
      { id: 't-1126-1', subjectCode: 'IR', unit: 3, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'IR Numerical Blitz: Single-Link & TF-IDF', description: 'Solve 1 distance matrix clustering problem and 1 3-document cosine ranking problem.', isCompleted: false, isBacklog: false, originalDate: '2026-11-26', currentScheduledDate: '2026-11-26', priority: 'P1' },
      { id: 't-1126-2', subjectCode: 'IR', unit: 5, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'IR Numerical Blitz: PageRank & MAP/MRR', description: 'Solve 1 3-node PageRank iteration and 1 3-query Mean Average Precision computation.', isCompleted: false, isBacklog: false, originalDate: '2026-11-26', currentScheduledDate: '2026-11-26', priority: 'P1' },
      { id: 't-1126-3', subjectCode: 'BIF', unit: 6, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Needleman-Wunsch vs. Smith-Waterman Matrix Blitz', description: 'Solve both global and local matrices for sequences ACGTAG and ACTAG.', isCompleted: false, isBacklog: false, originalDate: '2026-11-26', currentScheduledDate: '2026-11-26', priority: 'P1' }
    ]
  },
  {
    date: '2026-11-27',
    dayOfWeek: 'Friday',
    phase: 'MOCKS',
    dayType: 'INTERNSHIP',
    targetHours: 7.0,
    isAudited: false,
    notes: 'Subject Rotation 3: DMV & High-Frequency Definitions',
    tasks: [
      { id: 't-1127-1', subjectCode: 'DMV', unit: 3, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'DMV High-Frequency Conceptual Questions Blitz', description: 'Master answers to 15 standard 5-mark conceptual questions across Units 3-6.', isCompleted: false, isBacklog: false, originalDate: '2026-11-27', currentScheduledDate: '2026-11-27', priority: 'P1' },
      { id: 't-1127-2', subjectCode: 'ML', unit: 6, timeSlot: '7:30 PM – 10:00 PM', plannedHours: 2.5, title: 'Deep Learning Diagram Drawing Speed Test', description: 'Practice drawing CNN architecture, LSTM memory cell, and Autoencoder diagrams in under 2 minutes.', isCompleted: false, isBacklog: false, originalDate: '2026-11-27', currentScheduledDate: '2026-11-27', priority: 'P1' },
      { id: 't-1127-3', subjectCode: 'BIF', unit: 4, timeSlot: '11:00 PM – 1:00 AM', plannedHours: 2.0, title: 'Systems Biology Key Definitions & Terms', description: 'Review network centrality formulas, feed-forward loops, and differential equation models.', isCompleted: false, isBacklog: false, originalDate: '2026-11-27', currentScheduledDate: '2026-11-27', priority: 'P2' }
    ]
  },
  {
    date: '2026-11-28',
    dayOfWeek: 'Saturday',
    phase: 'MOCKS',
    dayType: 'SATURDAY',
    targetHours: 9.83,
    isAudited: false,
    notes: 'Saturday Mega-Sprint: 4 Subjects 50 PYQs in 8 Hours',
    tasks: [
      { id: 't-1128-1', subjectCode: 'ML', unit: 3, timeSlot: '11:00 AM – 1:30 PM', plannedHours: 2.5, title: 'Machine Learning Top 15 Guaranteed PYQs', description: 'Rapid revision of SVM, KNN, K-Means, GMM, AdaBoost, Random Forest, and CNN questions.', isCompleted: false, isBacklog: false, originalDate: '2026-11-28', currentScheduledDate: '2026-11-28', priority: 'P1' },
      { id: 't-1128-2', subjectCode: 'DMV', unit: 4, timeSlot: '2:30 PM – 5:00 PM', plannedHours: 2.5, title: 'DMV Top 15 Guaranteed PYQs', description: 'Rapid revision of visual variables, Force-directed layouts, MDS, pandas groupby, and dashboards.', isCompleted: false, isBacklog: false, originalDate: '2026-11-28', currentScheduledDate: '2026-11-28', priority: 'P1' },
      { id: 't-1128-3', subjectCode: 'IR', unit: 3, timeSlot: '6:00 PM – 8:30 PM', plannedHours: 2.5, title: 'Information Retrieval Top 15 Guaranteed PYQs', description: 'Rapid revision of TF-IDF, BIM, Single-Link, PageRank, MAP/MRR/NDCG, and Web Crawlers.', isCompleted: false, isBacklog: false, originalDate: '2026-11-28', currentScheduledDate: '2026-11-28', priority: 'P1' },
      { id: 't-1128-4', subjectCode: 'BIF', unit: 3, timeSlot: '9:30 PM – 11:50 PM', plannedHours: 2.33, title: 'Bioinformatics Top 15 Guaranteed PYQs', description: 'Rapid revision of Homology modeling, CADD, Cytoscape, UPGMA, and Needleman-Wunsch alignment.', isCompleted: false, isBacklog: false, originalDate: '2026-11-28', currentScheduledDate: '2026-11-28', priority: 'P1' }
    ]
  },

  // ==========================================
  // PHASE 6: EXAM BUFFER & FINAL REVISION SPRINT (NOV 29 - DEC 03)
  // ==========================================
  {
    date: '2026-11-29',
    dayOfWeek: 'Sunday',
    phase: 'EXAM_BUFFER',
    dayType: 'SUNDAY',
    targetHours: 6.5,
    isAudited: false,
    notes: 'Machine Learning Final Deep Lock & Formula Memorization',
    tasks: [
      { id: 't-1129-1', subjectCode: 'ML', unit: 3, timeSlot: '11:00 AM – 2:00 PM', plannedHours: 3.0, title: 'ML Units 3 & 4 Complete Formula Lock', description: 'Final memorization of all metrics, Gini index, SVM margins, K-Means inertia, and GMM equations.', isCompleted: false, isBacklog: false, originalDate: '2026-11-29', currentScheduledDate: '2026-11-29', priority: 'P1' },
      { id: 't-1129-2', subjectCode: 'ML', unit: 5, timeSlot: '3:30 PM – 6:00 PM', plannedHours: 2.5, title: 'ML Units 5 & 6 Ensemble & Deep Learning Lock', description: 'Final memorization of AdaBoost alpha_t, Random Forest OOB error, CNN arithmetic, and LSTM gates.', isCompleted: false, isBacklog: false, originalDate: '2026-11-29', currentScheduledDate: '2026-11-29', priority: 'P1' },
      { id: 't-1129-3', subjectCode: 'GENERAL', unit: null, timeSlot: '9:00 PM – 10:00 PM', plannedHours: 1.0, title: 'Exam Day 1 Logistics & Early Sleep Protocol', description: 'Pack hall ticket, college ID, stationery, water bottle; ensure 8 hours of sleep for peak cognitive alertness.', isCompleted: false, isBacklog: false, originalDate: '2026-11-29', currentScheduledDate: '2026-11-29', priority: 'ROUTINE' }
    ]
  },
  {
    date: '2026-11-30',
    dayOfWeek: 'Monday',
    phase: 'EXAM_BUFFER',
    dayType: 'EXAM_DAY',
    targetHours: 5.5,
    isAudited: false,
    notes: '🎯 SPPU THEORY EXAM DAY 1: MACHINE LEARNING (2:00 PM – 4:30 PM)',
    tasks: [
      { id: 't-1130-1', subjectCode: 'ML', unit: 3, timeSlot: '8:30 AM – 11:30 AM', plannedHours: 3.0, title: 'Pre-Exam Warmup: Machine Learning Formula Flashcards', description: 'Quick scan of master formula sheet and 5 key derivations; no heavy reading.', isCompleted: false, isBacklog: false, originalDate: '2026-11-30', currentScheduledDate: '2026-11-30', priority: 'P1' },
      { id: 't-1130-2', subjectCode: 'ML', unit: null, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'SPPU MACHINE LEARNING END-SEM EXAM', description: 'Execute clean, structured 70-mark paper presentation with clear diagrams and boxed numerical answers.', isCompleted: false, isBacklog: false, originalDate: '2026-11-30', currentScheduledDate: '2026-11-30', priority: 'P1' },
      { id: 't-1130-3', subjectCode: 'DMV', unit: 3, timeSlot: '8:00 PM – 10:00 PM', plannedHours: 2.0, title: 'DMV Warmup: Visual Variables & Historiography', description: 'Transition mindset immediately to Data Mining & Visualization Units 3 & 4.', isCompleted: false, isBacklog: false, originalDate: '2026-11-30', currentScheduledDate: '2026-11-30', priority: 'P1' }
    ]
  },
  {
    date: '2026-12-01',
    dayOfWeek: 'Tuesday',
    phase: 'EXAM_BUFFER',
    dayType: 'EXAM_DAY',
    targetHours: 8.0,
    isAudited: false,
    notes: 'DMV Final Revision Sprint: 12-Hour Intensive Unit 3-6 Lock',
    tasks: [
      { id: 't-1201-1', subjectCode: 'DMV', unit: 3, timeSlot: '9:00 AM – 12:00 PM', plannedHours: 3.0, title: 'DMV Units 3 & 4 Complete Revision', description: 'Master visual encodings, Lie factor calculation, Force-directed algorithms, and MDS proximity.', isCompleted: false, isBacklog: false, originalDate: '2026-12-01', currentScheduledDate: '2026-12-01', priority: 'P1' },
      { id: 't-1201-2', subjectCode: 'DMV', unit: 5, timeSlot: '2:00 PM – 5:00 PM', plannedHours: 3.0, title: 'DMV Units 5 & 6 Complete Revision', description: 'Master Split-Apply-Combine groupby pipelines, Matplotlib/Seaborn code patterns, and Dashboard design.', isCompleted: false, isBacklog: false, originalDate: '2026-12-01', currentScheduledDate: '2026-12-01', priority: 'P1' },
      { id: 't-1201-3', subjectCode: 'DMV', unit: 3, timeSlot: '7:30 PM – 9:30 PM', plannedHours: 2.0, title: 'DMV Top 20 PYQ Rapid Answer Scan', description: 'Review SPPU previous year question answers and diagram drawing templates.', isCompleted: false, isBacklog: false, originalDate: '2026-12-01', currentScheduledDate: '2026-12-01', priority: 'P1' }
    ]
  },
  {
    date: '2026-12-02',
    dayOfWeek: 'Wednesday',
    phase: 'EXAM_BUFFER',
    dayType: 'EXAM_DAY',
    targetHours: 5.5,
    isAudited: false,
    notes: '🎯 SPPU THEORY EXAM DAY 2: DATA MINING & VISUALIZATION (2:00 PM – 4:30 PM)',
    tasks: [
      { id: 't-1202-1', subjectCode: 'DMV', unit: 3, timeSlot: '8:30 AM – 11:30 AM', plannedHours: 3.0, title: 'Pre-Exam Warmup: DMV Design Rules & Code Templates', description: 'Quick scan of Lie factor formulas, Mackinlay visual rankings, and pandas groupby snippets.', isCompleted: false, isBacklog: false, originalDate: '2026-12-02', currentScheduledDate: '2026-12-02', priority: 'P1' },
      { id: 't-1202-2', subjectCode: 'DMV', unit: null, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'SPPU DATA MINING & VISUALIZATION END-SEM EXAM', description: 'Write 70-mark exam with clean graph sketches, design justifications, and pandas code snippets.', isCompleted: false, isBacklog: false, originalDate: '2026-12-02', currentScheduledDate: '2026-12-02', priority: 'P1' },
      { id: 't-1202-3', subjectCode: 'IR', unit: 3, timeSlot: '8:00 PM – 10:30 PM', plannedHours: 2.5, title: 'Elective (IR/BIF) Final Warmup: Units 3 & 4', description: 'Transition mindset to Information Retrieval / Bioinformatics for the grand finale exam tomorrow.', isCompleted: false, isBacklog: false, originalDate: '2026-12-02', currentScheduledDate: '2026-12-02', priority: 'P1' }
    ]
  },
  {
    date: '2026-12-03',
    dayOfWeek: 'Thursday',
    phase: 'EXAM_BUFFER',
    dayType: 'EXAM_DAY',
    targetHours: 5.5,
    isAudited: false,
    notes: '🎯 SPPU THEORY EXAM DAY 3: BIOINFORMATICS / IR (2:00 PM – 4:30 PM)',
    tasks: [
      { id: 't-1203-1', subjectCode: 'IR', unit: 3, timeSlot: '8:30 AM – 11:30 AM', plannedHours: 3.0, title: 'Pre-Exam Warmup: IR & BIF Master Formulas', description: 'Scan PageRank formula, TF-IDF cosine similarity, Needleman-Wunsch matrix, and UPGMA algorithms.', isCompleted: false, isBacklog: false, originalDate: '2026-12-03', currentScheduledDate: '2026-12-03', priority: 'P1' },
      { id: 't-1203-2', subjectCode: 'IR', unit: null, timeSlot: '2:00 PM – 4:30 PM', plannedHours: 2.5, title: 'SPPU ELECTIVE END-SEM EXAM (IR / BIOINFORMATICS)', description: 'Deliver final 70-mark university paper with flawless mathematical steps and structured theory.', isCompleted: false, isBacklog: false, originalDate: '2026-12-03', currentScheduledDate: '2026-12-03', priority: 'P1' },
      { id: 't-1203-3', subjectCode: 'GENERAL', unit: null, timeSlot: '6:00 PM – 8:00 PM', plannedHours: 2.0, title: '🎉 SEMESTER 7 VICTORY & SYSTEM RETROSPECTIVE', description: 'Complete 57-day schedule audit, celebrate 100% exam completion, and backup system state.', isCompleted: false, isBacklog: false, originalDate: '2026-12-03', currentScheduledDate: '2026-12-03', priority: 'ROUTINE' }
    ]
  }
];
