import { useAssessment } from '@/hooks/useAssessment';
import { ProgressBar } from '@/components/assessment/ProgressBar';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { sectionTitles, sectionDescriptions } from '@/data/assessmentQuestions';
import { ChevronRight, ArrowLeft } from 'lucide-react';

const Assessment = () => {
  const navigate = useNavigate();
  const {
    assessmentState,
    currentSectionQuestions,
    currentSection,
    addAnswer,
    nextQuestion,
    calculateResults,
    totalProgress,
  } = useAssessment();

  const [currentAnswer, setCurrentAnswer] = useState<string | number | undefined>();

  if (assessmentState.isCompleted) {
    const results = calculateResults();
    localStorage.setItem('assessmentResults', JSON.stringify(results));
    navigate('/results');
    return null;
  }

  const currentQuestion = currentSectionQuestions[assessmentState.currentQuestion];
  const isLastQuestion = assessmentState.currentQuestion === currentSectionQuestions.length - 1;
  const isLastSection = assessmentState.currentSection === 2; // 0-indexed, 3 sections total

  const handleAnswer = (answer: string | number) => {
    setCurrentAnswer(answer);
    addAnswer(currentQuestion.id, answer);
  };

  const handleNext = () => {
    if (currentAnswer !== undefined) {
      nextQuestion();
      setCurrentAnswer(undefined);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const sectionTitle = sectionTitles[currentSection as keyof typeof sectionTitles];
  const sectionDescription = sectionDescriptions[currentSection as keyof typeof sectionDescriptions];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" onClick={handleBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              CareerFit Readiness Assessment™
            </h1>
            <p className="text-muted-foreground">
              Wearable Developer Evaluation
            </p>
          </div>

          <ProgressBar
            current={assessmentState.currentQuestion + 1}
            total={currentSectionQuestions.length}
            sectionName={sectionTitle}
          />
        </div>

        <div className="space-y-6">
          <Card className="border-2 border-primary/10">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
              <CardTitle className="text-xl">{sectionTitle}</CardTitle>
              <p className="text-muted-foreground">{sectionDescription}</p>
            </CardHeader>
          </Card>

          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            currentAnswer={currentAnswer}
          />

          <div className="flex justify-between items-center pt-6">
            <div className="text-sm text-muted-foreground">
              Section {assessmentState.currentSection + 1} of 3 • 
              Question {assessmentState.currentQuestion + 1} of {currentSectionQuestions.length}
            </div>
            
            <Button
              onClick={handleNext}
              disabled={currentAnswer === undefined}
              variant="hero"
              size="lg"
              className="min-w-[120px]"
            >
              {isLastQuestion && isLastSection ? 'Complete' : 'Next'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-card border rounded-full px-4 py-2 shadow-lg">
            <span className="text-sm font-medium">
              {Math.round(totalProgress)}% Complete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;