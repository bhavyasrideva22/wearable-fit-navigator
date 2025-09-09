import { AssessmentQuestion } from '@/types/assessment';

export const assessmentQuestions: AssessmentQuestion[] = [
  // Psychometric Section - Interest & Motivation
  {
    id: 'psych_1',
    type: 'likert',
    category: 'psychometric',
    section: 'psychometric',
    question: 'I enjoy creating software that interacts with physical devices.',
    weight: 1.2,
  },
  {
    id: 'psych_2',
    type: 'likert',
    category: 'psychometric',
    section: 'psychometric',
    question: 'I am comfortable working on detailed, repetitive debugging tasks.',
    weight: 1.0,
  },
  {
    id: 'psych_3',
    type: 'likert',
    category: 'psychometric',
    section: 'psychometric',
    question: 'I find hardware-software integration fascinating.',
    weight: 1.3,
  },
  {
    id: 'psych_4',
    type: 'likert',
    category: 'psychometric',
    section: 'psychometric',
    question: 'I persist even when development challenges become difficult.',
    weight: 1.1,
  },
  {
    id: 'psych_5',
    type: 'multiple-choice',
    category: 'psychometric',
    section: 'psychometric',
    question: 'Which type of project would excite you most?',
    options: [
      'Building a fitness tracker that monitors heart rate and sleep patterns',
      'Creating a web application for e-commerce',
      'Developing a mobile game',
      'Designing a database system'
    ],
    weight: 1.2,
  },

  // Technical & Aptitude Section
  {
    id: 'tech_1',
    type: 'multiple-choice',
    category: 'technical',
    section: 'technical',
    question: 'Which programming language is most commonly used for embedded systems in wearables?',
    options: ['Python', 'C/C++', 'JavaScript', 'PHP'],
    correctAnswer: 'C/C++',
    weight: 1.0,
  },
  {
    id: 'tech_2',
    type: 'multiple-choice',
    category: 'technical',
    section: 'technical',
    question: 'What is the primary concern when developing for wearable devices?',
    options: ['Database optimization', 'Battery life and power consumption', 'Server scalability', 'SEO optimization'],
    correctAnswer: 'Battery life and power consumption',
    weight: 1.3,
  },
  {
    id: 'tech_3',
    type: 'multiple-choice',
    category: 'technical',
    section: 'technical',
    question: 'Which wireless protocol is most energy-efficient for wearables?',
    options: ['Wi-Fi', 'Bluetooth Classic', 'Bluetooth Low Energy (BLE)', '4G/LTE'],
    correctAnswer: 'Bluetooth Low Energy (BLE)',
    weight: 1.2,
  },
  {
    id: 'tech_4',
    type: 'multiple-choice',
    category: 'aptitude',
    section: 'technical',
    question: 'If a smartwatch accelerometer reads [2.1, -1.8, 9.2] m/s², which axis likely represents gravity?',
    options: ['X-axis (2.1)', 'Y-axis (-1.8)', 'Z-axis (9.2)', 'All axes equally'],
    correctAnswer: 'Z-axis (9.2)',
    weight: 1.1,
  },
  {
    id: 'tech_5',
    type: 'scenario',
    category: 'domain-specific',
    section: 'technical',
    question: 'Your wearable app is draining battery too quickly. What would be your first optimization approach?',
    options: [
      'Reduce sensor sampling frequency and optimize data processing',
      'Add more features to justify the battery usage',
      'Increase the screen brightness for better visibility',
      'Switch to a more powerful processor'
    ],
    correctAnswer: 'Reduce sensor sampling frequency and optimize data processing',
    weight: 1.4,
  },

  // WISCAR Framework Questions
  {
    id: 'wiscar_will_1',
    type: 'likert',
    category: 'psychometric',
    section: 'wiscar',
    question: 'I would continue working on a challenging wearable project even if it takes months to solve.',
    weight: 1.2,
  },
  {
    id: 'wiscar_interest_1',
    type: 'likert',
    category: 'psychometric',
    section: 'wiscar',
    question: 'I actively follow news and trends in wearable technology.',
    weight: 1.1,
  },
  {
    id: 'wiscar_skill_1',
    type: 'rating',
    category: 'technical',
    section: 'wiscar',
    question: 'Rate your current programming experience (1-10 scale):',
    weight: 1.0,
  },
  {
    id: 'wiscar_cognitive_1',
    type: 'multiple-choice',
    category: 'aptitude',
    section: 'wiscar',
    question: 'A wearable device receives data at 50Hz but only needs to process every 10th sample. What\'s the effective processing rate?',
    options: ['50Hz', '5Hz', '500Hz', '0.5Hz'],
    correctAnswer: '5Hz',
    weight: 1.2,
  },
  {
    id: 'wiscar_learn_1',
    type: 'likert',
    category: 'psychometric',
    section: 'wiscar',
    question: 'I actively seek feedback and use it to improve my technical skills.',
    weight: 1.1,
  },
  {
    id: 'wiscar_real_1',
    type: 'scenario',
    category: 'domain-specific',
    section: 'wiscar',
    question: 'You\'re debugging a smartwatch that freezes during intensive calculations. Your approach would be:',
    options: [
      'Check memory usage and optimize algorithms for constrained resources',
      'Restart the device and hope it works',
      'Increase processing power requirements',
      'Disable the problematic feature entirely'
    ],
    correctAnswer: 'Check memory usage and optimize algorithms for constrained resources',
    weight: 1.3,
  },
];

export const sectionTitles = {
  psychometric: 'Psychological Fit Assessment',
  technical: 'Technical Readiness Evaluation',
  wiscar: 'WISCAR Framework Analysis'
};

export const sectionDescriptions = {
  psychometric: 'Understanding your motivation, interests, and personality fit for wearable development',
  technical: 'Evaluating your current technical knowledge and problem-solving abilities',
  wiscar: 'Comprehensive analysis using our proven career-fit framework'
};