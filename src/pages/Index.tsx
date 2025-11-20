import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { GraduationCap, Users, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  // Redirect to appropriate dashboard if already logged in
  if (user) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  const features = [
    {
      title: 'Real-World Experience',
      description: 'Gain hands-on experience with actual product management tasks',
      icon: GraduationCap,
    },
    {
      title: 'Expert Mentorship',
      description: 'Learn from experienced product managers in the industry',
      icon: Users,
    },
    {
      title: 'Secure Platform',
      description: 'Safe and monitored environment for learning and growth',
      icon: Shield,
    },
  ];

  const benefits = [
    'Apply to multiple internship opportunities',
    'Track your application status in real-time',
    'Receive feedback from industry mentors',
    'Build your professional portfolio',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Welcome to PM Internship Portal
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Connect students with industry-leading mentors. Start your journey in product management today.
          </p>

          {/* Login Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Link to="/login/student" className="w-full sm:w-auto">
              <Button size="lg" className="w-full gap-2 shadow-lg hover:shadow-xl transition-all">
                Student Login
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login/mentor" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full gap-2 hover:bg-primary/5">
                Mentor Login
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login/admin" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full gap-2 hover:bg-primary/5">
                Admin Login
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {features.map((feature, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-all animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 rounded-full bg-primary/10">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <Card className="border-border max-w-2xl mx-auto">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold mb-6">Why Choose Our Platform?</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 text-left">
                    <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                    <p className="text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Demo Credentials */}
          <Card className="border-primary/20 bg-primary/5 max-w-2xl mx-auto mt-8">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Demo Credentials (All roles):</p>
              <p className="text-sm font-mono">
                Email: <span className="font-semibold">[role]@test.com</span> | Password: <span className="font-semibold">password</span>
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Replace [role] with student, mentor, or admin
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
