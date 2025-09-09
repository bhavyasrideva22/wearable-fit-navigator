import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AssessmentResult } from '@/types/assessment';
import { ResultsChart } from '@/components/assessment/ResultsChart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Share2, BookOpen, Users, Target, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [results, setResults] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    const savedResults = localStorage.getItem('assessmentResults');
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!results) {
    return <div>Loading...</div>;
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Wearable Developer Assessment Results',
          text: `I scored ${results.overall_confidence}/100 on the CareerFit Assessment for Wearable Development!`,
          url: window.location.origin,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      const text = `I scored ${results.overall_confidence}/100 on the CareerFit Assessment for Wearable Development! Check it out at ${window.location.origin}`;
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Share your results with friends!",
      });
    }
  };

  const handleDownloadReport = () => {
    const reportData = {
      ...results,
      generated_at: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json',
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wearable-developer-assessment-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Report Downloaded",
      description: "Your detailed assessment report has been saved.",
    });
  };

  const getRecommendationStyle = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return 'bg-success text-white';
      case 'Maybe': return 'bg-warning text-white';
      case 'No': return 'bg-destructive text-white';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Your Assessment Results
            </h1>
            <p className="text-muted-foreground text-lg">
              Comprehensive analysis of your wearable developer potential
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            <ResultsChart
              wiscarScores={results.wiscars}
              overallScore={results.overall_confidence}
            />

            {/* Detailed Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Personalized Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Recommendation</h4>
                  <Badge className={getRecommendationStyle(results.recommendation)} variant="secondary">
                    {results.recommendation === 'Yes' && '✓ Proceed with Confidence'}
                    {results.recommendation === 'Maybe' && '⚡ Potential with Development'}
                    {results.recommendation === 'No' && '🔄 Consider Alternatives'}
                  </Badge>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Key Strengths</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(results.wiscars)
                      .filter(([_, score]) => score >= 70)
                      .map(([key, score]) => (
                        <div key={key} className="flex justify-between p-2 bg-success/10 rounded">
                          <span className="capitalize">{key.replace('_', ' ')}</span>
                          <span className="font-bold">{score}</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Areas for Growth</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(results.wiscars)
                      .filter(([_, score]) => score < 70)
                      .map(([key, score]) => (
                        <div key={key} className="flex justify-between p-2 bg-warning/10 rounded">
                          <span className="capitalize">{key.replace('_', ' ')}</span>
                          <span className="font-bold">{score}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {results.next_steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Career Roles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Recommended Roles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-success mb-2">Top Matches</h4>
                  <div className="space-y-2">
                    {results.top_roles.map((role, index) => (
                      <Badge key={index} variant="secondary" className="w-full justify-start">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-muted-foreground mb-2">Alternatives</h4>
                  <div className="space-y-2">
                    {results.alternative_roles.map((role, index) => (
                      <Badge key={index} variant="outline" className="w-full justify-start">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={handleShare} variant="tech" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Results
                </Button>
                <Button onClick={handleDownloadReport} variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button onClick={() => navigate('/assessment')} variant="secondary" className="w-full">
                  Retake Assessment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;