export interface AssessmentQuestion {
  id: string;
  type: 'multiple-choice' | 'likert' | 'scenario' | 'rating';
  category: 'psychometric' | 'technical' | 'aptitude' | 'domain-specific';
  question: string;
  options?: string[];
  correctAnswer?: string;
  weight: number;
  section: 'introduction' | 'psychometric' | 'technical' | 'wiscar';
}

export interface AssessmentAnswer {
  questionId: string;
  answer: string | number;
  timestamp: Date;
}

export interface WiscarScores {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability_to_learn: number;
  real_world_alignment: number;
}

export interface AssessmentResult {
  user_id: string;
  domain: string;
  psychometric_score: number;
  technical_readiness_score: number;
  wiscars: WiscarScores;
  overall_confidence: number;
  recommendation: 'Yes' | 'Maybe' | 'No';
  next_steps: string[];
  top_roles: string[];
  alternative_roles: string[];
  timestamp: Date;
}

export interface AssessmentState {
  currentSection: number;
  currentQuestion: number;
  answers: AssessmentAnswer[];
  startTime: Date;
  isCompleted: boolean;
}