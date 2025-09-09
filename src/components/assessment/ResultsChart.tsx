import { WiscarScores } from '@/types/assessment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ResultsChartProps {
  wiscarScores: WiscarScores;
  overallScore: number;
}

export const ResultsChart = ({ wiscarScores, overallScore }: ResultsChartProps) => {
  const scoreItems = [
    { label: 'Will (Persistence)', value: wiscarScores.will, description: 'Drive and motivation to overcome challenges' },
    { label: 'Interest', value: wiscarScores.interest, description: 'Genuine curiosity about wearable technology' },
    { label: 'Skill', value: wiscarScores.skill, description: 'Current technical and problem-solving abilities' },
    { label: 'Cognitive', value: wiscarScores.cognitive, description: 'Analytical thinking and learning capacity' },
    { label: 'Ability to Learn', value: wiscarScores.ability_to_learn, description: 'Openness to feedback and growth' },
    { label: 'Real-World Alignment', value: wiscarScores.real_world_alignment, description: 'Fit with actual job requirements' },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  const getOverallRecommendation = (score: number) => {
    if (score >= 75) return { text: 'Excellent Fit', color: 'text-success', recommendation: 'Yes' };
    if (score >= 55) return { text: 'Good Potential', color: 'text-warning', recommendation: 'Maybe' };
    return { text: 'Consider Alternatives', color: 'text-destructive', recommendation: 'No' };
  };

  const overall = getOverallRecommendation(overallScore);

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Your CareerFit Score</CardTitle>
          <div className="text-6xl font-bold text-primary">{overallScore}</div>
          <div className={`text-xl font-semibold ${overall.color}`}>
            {overall.text}
          </div>
          <div className="text-lg">
            Recommendation: <span className={`font-bold ${overall.color}`}>{overall.recommendation}</span>
          </div>
        </CardHeader>
      </Card>

      {/* WISCAR Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>WISCAR Framework Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {scoreItems.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.label}</span>
                <span className="text-sm font-bold">{item.value}/100</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-700 ${getScoreColor(item.value)}`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};