import { useState, useCallback } from 'react';
import { AssessmentAnswer, AssessmentResult, AssessmentState, WiscarScores } from '@/types/assessment';
import { assessmentQuestions } from '@/data/assessmentQuestions';

export const useAssessment = () => {
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentSection: 0,
    currentQuestion: 0,
    answers: [],
    startTime: new Date(),
    isCompleted: false,
  });

  const sections = ['psychometric', 'technical', 'wiscar'];
  const currentSectionQuestions = assessmentQuestions.filter(
    q => q.section === sections[assessmentState.currentSection]
  );

  const addAnswer = useCallback((questionId: string, answer: string | number) => {
    setAssessmentState(prev => ({
      ...prev,
      answers: [
        ...prev.answers.filter(a => a.questionId !== questionId),
        { questionId, answer, timestamp: new Date() }
      ]
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    setAssessmentState(prev => {
      const nextQuestionIndex = prev.currentQuestion + 1;
      const hasMoreQuestionsInSection = nextQuestionIndex < currentSectionQuestions.length;
      
      if (hasMoreQuestionsInSection) {
        return { ...prev, currentQuestion: nextQuestionIndex };
      } else if (prev.currentSection < sections.length - 1) {
        return { 
          ...prev, 
          currentSection: prev.currentSection + 1, 
          currentQuestion: 0 
        };
      } else {
        return { ...prev, isCompleted: true };
      }
    });
  }, [currentSectionQuestions.length, sections.length]);

  const calculateResults = useCallback((): AssessmentResult => {
    const answers = assessmentState.answers;
    
    // Calculate psychometric score
    const psychometricQuestions = assessmentQuestions.filter(q => q.category === 'psychometric');
    const psychometricAnswers = answers.filter(a => 
      psychometricQuestions.some(q => q.id === a.questionId)
    );
    const psychometricScore = psychometricAnswers.length > 0 
      ? (psychometricAnswers.reduce((sum, answer) => {
          const question = psychometricQuestions.find(q => q.id === answer.questionId);
          const weight = question?.weight || 1;
          const normalizedScore = typeof answer.answer === 'number' ? answer.answer * 20 : 60;
          return sum + (normalizedScore * weight);
        }, 0) / psychometricAnswers.reduce((sum, answer) => {
          const question = psychometricQuestions.find(q => q.id === answer.questionId);
          return sum + (question?.weight || 1);
        }, 0))
      : 50;

    // Calculate technical score
    const technicalQuestions = assessmentQuestions.filter(q => 
      q.category === 'technical' || q.category === 'aptitude' || q.category === 'domain-specific'
    );
    const technicalAnswers = answers.filter(a => 
      technicalQuestions.some(q => q.id === a.questionId)
    );
    const technicalScore = technicalAnswers.length > 0
      ? (technicalAnswers.reduce((sum, answer) => {
          const question = technicalQuestions.find(q => q.id === answer.questionId);
          const weight = question?.weight || 1;
          let score = 50; // Default neutral score
          
          if (question?.correctAnswer) {
            score = answer.answer === question.correctAnswer ? 100 : 20;
          } else if (typeof answer.answer === 'number') {
            score = answer.answer * 10; // For rating scales
          }
          
          return sum + (score * weight);
        }, 0) / technicalAnswers.reduce((sum, answer) => {
          const question = technicalQuestions.find(q => q.id === answer.questionId);
          return sum + (question?.weight || 1);
        }, 0))
      : 50;

    // Calculate WISCAR scores
    const wiscarScores: WiscarScores = {
      will: Math.min(100, Math.max(0, psychometricScore + Math.random() * 20 - 10)),
      interest: Math.min(100, Math.max(0, psychometricScore + Math.random() * 20 - 10)),
      skill: Math.min(100, Math.max(0, technicalScore + Math.random() * 15 - 7.5)),
      cognitive: Math.min(100, Math.max(0, technicalScore + Math.random() * 15 - 7.5)),
      ability_to_learn: Math.min(100, Math.max(0, (psychometricScore + technicalScore) / 2 + Math.random() * 15 - 7.5)),
      real_world_alignment: Math.min(100, Math.max(0, (psychometricScore + technicalScore) / 2 + Math.random() * 20 - 10)),
    };

    const overallConfidence = Math.round(
      (wiscarScores.will + wiscarScores.interest + wiscarScores.skill + 
       wiscarScores.cognitive + wiscarScores.ability_to_learn + wiscarScores.real_world_alignment) / 6
    );

    const recommendation: 'Yes' | 'Maybe' | 'No' = 
      overallConfidence >= 75 ? 'Yes' : overallConfidence >= 55 ? 'Maybe' : 'No';

    return {
      user_id: 'anonymous_user',
      domain: 'wearable_developer',
      psychometric_score: Math.round(psychometricScore),
      technical_readiness_score: Math.round(technicalScore),
      wiscars: {
        will: Math.round(wiscarScores.will),
        interest: Math.round(wiscarScores.interest),
        skill: Math.round(wiscarScores.skill),
        cognitive: Math.round(wiscarScores.cognitive),
        ability_to_learn: Math.round(wiscarScores.ability_to_learn),
        real_world_alignment: Math.round(wiscarScores.real_world_alignment),
      },
      overall_confidence: overallConfidence,
      recommendation,
      next_steps: getNextSteps(recommendation, technicalScore, psychometricScore),
      top_roles: getTopRoles(overallConfidence),
      alternative_roles: getAlternativeRoles(),
      timestamp: new Date(),
    };
  }, [assessmentState.answers]);

  return {
    assessmentState,
    currentSectionQuestions,
    currentSection: sections[assessmentState.currentSection],
    addAnswer,
    nextQuestion,
    calculateResults,
    totalProgress: (assessmentState.currentSection * 100 + 
      (assessmentState.currentQuestion / currentSectionQuestions.length) * 100) / sections.length,
  };
};

const getNextSteps = (recommendation: 'Yes' | 'Maybe' | 'No', technicalScore: number, psychometricScore: number): string[] => {
  if (recommendation === 'Yes') {
    return [
      'Enroll in "Embedded Systems for Wearables" course',
      'Practice Bluetooth Low Energy projects',
      'Build sensor integration applications',
      'Join wearable development communities',
    ];
  } else if (recommendation === 'Maybe') {
    const steps = [];
    if (technicalScore < 60) {
      steps.push('Strengthen C/C++ programming fundamentals');
      steps.push('Learn embedded systems basics');
    }
    if (psychometricScore < 60) {
      steps.push('Explore wearable technology to build interest');
      steps.push('Consider starting with mobile app development');
    }
    steps.push('Take beginner embedded systems courses');
    return steps;
  } else {
    return [
      'Consider mobile app development as an alternative',
      'Explore web development opportunities',
      'Build foundational programming skills',
      'Reassess career interests in 6-12 months',
    ];
  }
};

const getTopRoles = (confidence: number): string[] => {
  const allRoles = [
    'Wearable Firmware Engineer',
    'Mobile App Developer (Wearable-focused)',
    'Embedded Systems Developer',
    'UX/UI Designer for Wearables',
    'Sensor Data Analyst',
  ];
  
  return confidence >= 70 ? allRoles.slice(0, 3) : allRoles.slice(0, 2);
};

const getAlternativeRoles = (): string[] => [
  'Mobile Application Developer',
  'IoT Developer',
  'Hardware Test Engineer',
  'Web Developer',
];