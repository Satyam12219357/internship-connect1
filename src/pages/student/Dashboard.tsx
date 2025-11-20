import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Link } from 'react-router-dom';
import { Briefcase, FileText, UserCircle, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const StudentDashboard = () => {
  const stats = [
    { label: 'Active Applications', value: '3', icon: FileText, color: 'text-primary' },
    { label: 'Internships Available', value: '12', icon: Briefcase, color: 'text-accent' },
    { label: 'Pending Reviews', value: '2', icon: Clock, color: 'text-warning' },
    { label: 'Completed', value: '1', icon: CheckCircle, color: 'text-success' },
  ];

  const recentApplications = [
    { title: 'Product Manager Intern', company: 'TechCorp', status: 'Under Review', date: '2 days ago' },
    { title: 'APM Program', company: 'StartupXYZ', status: 'Interview Scheduled', date: '1 week ago' },
    { title: 'PM Fellow', company: 'BigTech Inc', status: 'Submitted', date: '2 weeks ago' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
          <p className="text-muted-foreground">Track your internship applications and progress</p>
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

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link to="/student/internships" className="block">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-primary/20 hover:border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Browse Internships
                </CardTitle>
                <CardDescription>Explore available opportunities</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/student/applications" className="block">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-accent/20 hover:border-accent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  My Applications
                </CardTitle>
                <CardDescription>View application status</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/student/profile" className="block">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-muted hover:border-muted-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCircle className="h-5 w-5" />
                  Update Profile
                </CardTitle>
                <CardDescription>Manage your information</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Track your latest internship applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((app, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-semibold">{app.title}</h3>
                    <p className="text-sm text-muted-foreground">{app.company}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {app.status}
                    </span>
                    <span className="text-sm text-muted-foreground">{app.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link to="/student/applications">
                <Button variant="outline" className="w-full">View All Applications</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
