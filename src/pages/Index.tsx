import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Cpu, 
  Smartphone, 
  Zap, 
  Target, 
  TrendingUp, 
  Users, 
  CheckCircle,
  Clock,
  Award,
  ArrowRight
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: 'Psychological Fit',
      description: 'Assess your motivation, interests, and personality alignment'
    },
    {
      icon: Cpu,
      title: 'Technical Readiness',
      description: 'Evaluate programming skills and embedded systems knowledge'
    },
    {
      icon: TrendingUp,
      title: 'WISCAR Framework',
      description: 'Comprehensive analysis using proven career-fit methodology'
    },
    {
      icon: Users,
      title: 'Career Guidance',
      description: 'Personalized role recommendations and learning paths'
    }
  ];

  const benefits = [
    'Discover if wearable development aligns with your strengths',
    'Get personalized career recommendations',
    'Identify skill gaps and improvement areas',
    'Receive actionable next steps for your journey'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20" variant="outline">
              CareerFit Readiness Assessment™
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Should I Learn to Become a
              <br />
              <span className="text-foreground">Wearable Developer?</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover your potential in wearable technology development through our comprehensive AI-powered assessment. 
              Get personalized insights on your psychological fit, technical readiness, and career alignment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={() => navigate('/assessment')}
                variant="hero" 
                size="lg" 
                className="text-lg px-8 py-6 min-w-[200px]"
              >
                Start Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>20-30 minutes</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">3</div>
                <div className="text-sm text-muted-foreground">Sections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">6</div>
                <div className="text-sm text-muted-foreground">WISCAR Metrics</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">100%</div>
                <div className="text-sm text-muted-foreground">Personalized</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Wearable Development */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What is Wearable Development?</h2>
            <p className="text-lg text-muted-foreground">
              Designing, coding, testing, and maintaining software and firmware for wearable devices 
              such as smartwatches, fitness trackers, AR/VR headsets, and medical devices.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <Smartphone className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Device Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Bridge hardware and software, optimizing for battery life, 
                  sensor accuracy, and seamless user experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-accent">
              <CardHeader>
                <Zap className="w-10 h-10 text-accent mb-2" />
                <CardTitle>Performance Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Master constrained environments, real-time processing, 
                  and efficient data handling for wearable platforms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-success">
              <CardHeader>
                <Award className="w-10 h-10 text-success mb-2" />
                <CardTitle>Innovation Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Shape the future of human-computer interaction through 
                  innovative wearable solutions and IoT connectivity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Assessment Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Career Assessment</h2>
            <p className="text-lg text-muted-foreground">
              Our scientifically-backed evaluation covers all aspects of wearable developer readiness
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mx-auto text-primary mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What You'll Discover</h2>
              <p className="text-lg text-muted-foreground">
                Get actionable insights to guide your career journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader>
                  <CardTitle className="text-xl">Your Results Include</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Overall Confidence Score</span>
                    <Badge variant="secondary">0-100</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>WISCAR Analysis</span>
                    <Badge variant="secondary">6 Metrics</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Career Recommendations</span>
                    <Badge variant="secondary">Yes/Maybe/No</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Learning Path</span>
                    <Badge variant="secondary">Personalized</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Discover Your Potential?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Take the first step towards your wearable development career. 
              Our assessment provides the clarity you need to make confident decisions.
            </p>
            
            <Button 
              onClick={() => navigate('/assessment')}
              variant="hero" 
              size="lg" 
              className="text-xl px-12 py-8"
            >
              Begin Your Assessment
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
