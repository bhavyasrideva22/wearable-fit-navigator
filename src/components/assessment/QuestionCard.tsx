import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AssessmentQuestion } from '@/types/assessment';
import { useState } from 'react';

interface QuestionCardProps {
  question: AssessmentQuestion;
  onAnswer: (answer: string | number) => void;
  currentAnswer?: string | number;
}

export const QuestionCard = ({ question, onAnswer, currentAnswer }: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | undefined>(currentAnswer);

  const handleAnswer = (answer: string | number) => {
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  const renderLikertScale = () => {
    const labels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-5 gap-2 text-xs text-muted-foreground text-center">
          {labels.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <Button
              key={value}
              variant={selectedAnswer === value ? "default" : "outline"}
              className="h-12"
              onClick={() => handleAnswer(value)}
            >
              {value}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const renderMultipleChoice = () => (
    <div className="space-y-3">
      {question.options?.map((option, index) => (
        <Button
          key={index}
          variant={selectedAnswer === option ? "default" : "tech"}
          className="w-full text-left justify-start p-4 h-auto min-h-[3rem]"
          onClick={() => handleAnswer(option)}
        >
          <span className="flex-1">{option}</span>
        </Button>
      ))}
    </div>
  );

  const renderRating = () => (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Beginner (1)</span>
        <span>Expert (10)</span>
      </div>
      <div className="grid grid-cols-10 gap-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
          <Button
            key={value}
            variant={selectedAnswer === value ? "default" : "outline"}
            className="h-10 p-0"
            onClick={() => handleAnswer(value)}
          >
            {value}
          </Button>
        ))}
      </div>
    </div>
  );

  const renderScenario = () => renderMultipleChoice();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'psychometric': return 'border-l-accent';
      case 'technical': return 'border-l-primary';
      case 'aptitude': return 'border-l-info';
      case 'domain-specific': return 'border-l-success';
      default: return 'border-l-muted';
    }
  };

  return (
    <Card className={`border-l-4 ${getCategoryColor(question.category)}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{question.question}</CardTitle>
          <span className="text-xs bg-secondary px-2 py-1 rounded-full capitalize">
            {question.category.replace('-', ' ')}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {question.type === 'likert' && renderLikertScale()}
        {question.type === 'multiple-choice' && renderMultipleChoice()}
        {question.type === 'rating' && renderRating()}
        {question.type === 'scenario' && renderScenario()}
      </CardContent>
    </Card>
  );
};