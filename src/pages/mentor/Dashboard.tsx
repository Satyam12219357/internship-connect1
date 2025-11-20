import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Link } from 'react-router-dom';
import { Briefcase, Users, FileCheck, PlusCircle, MessageSquare, Sparkles, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const MentorDashboard = () => {
  const [recentInternship, setRecentInternship] = useState<{ title: string; company: string; timestamp: number } | null>(null);

  useEffect(() => {
    // Check localStorage for recently posted internship
    const stored = localStorage.getItem('recentInternship');
    if (stored) {
      const data = JSON.parse(stored);
      // Only show if posted within last 24 hours
      if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
        setRecentInternship(data);
      } else {
        localStorage.removeItem('recentInternship');
      }
    }
  }, []);

  const handleDeleteInternship = () => {
    localStorage.removeItem('recentInternship');
    setRecentInternship(null);
    toast.success('Internship deleted successfully');
  };

  const stats = [
    { label: 'Active Internships', value: '5', icon: Briefcase, color: 'text-primary' },
    { label: 'Total Applications', value: '24', icon: Users, color: 'text-accent' },
    { label: 'Pending Reviews', value: '8', icon: FileCheck, color: 'text-warning' },
    { label: 'Assigned Interns', value: '3', icon: Users, color: 'text-success' },
  ];

  const pendingApplications = [
    { name: 'Alice Johnson', position: 'Product Manager Intern', appliedDate: '1 day ago', experience: '2 years' },
    { name: 'Bob Smith', position: 'APM Program', appliedDate: '3 days ago', experience: '1 year' },
    { name: 'Carol White', position: 'Product Analyst', appliedDate: '5 days ago', experience: '3 years' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Mentor Dashboard</h1>
          <p className="text-muted-foreground">Manage internships and guide future product managers</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* NEW INTERNSHIP Alert */}
        {recentInternship && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10 hover:shadow-glow transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary animate-pulse-glow">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase tracking-wide">
                        NEW INTERNSHIP
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{recentInternship.title}</h3>
                    <p className="text-muted-foreground">
                      {recentInternship.company} • Just posted
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/mentor/post-internship">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={handleDeleteInternship}
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link to="/mentor/post-internship" className="block">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-primary/20 hover:border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlusCircle className="h-5 w-5" />
                  Post Internship
                </CardTitle>
                <CardDescription>Create new opportunity</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/mentor/applications" className="block">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-accent/20 hover:border-accent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5" />
                  Review Applications
                </CardTitle>
                <CardDescription>Manage student applications</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/mentor/evaluations" className="block">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-success/20 hover:border-success">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Evaluations
                </CardTitle>
                <CardDescription>Submit feedback</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Pending Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Applications</CardTitle>
            <CardDescription>Review and respond to student applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApplications.map((app, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-semibold">{app.name}</h3>
                    <p className="text-sm text-muted-foreground">{app.position}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{app.experience} experience</p>
                      <p className="text-xs text-muted-foreground">{app.appliedDate}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="default">Review</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link to="/mentor/applications">
                <Button variant="outline" className="w-full">View All Applications</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MentorDashboard;
