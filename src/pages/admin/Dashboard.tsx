import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Link } from 'react-router-dom';
import { Users, Briefcase, TrendingUp, Activity, UserCheck, Building, PlusCircle, BarChart3, Sparkles, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { StatCard } from '@/components/StatCard';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const AdminDashboard = () => {
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
    { title: 'Total Students', value: '156', icon: Users, color: 'primary' as const, trend: { value: 12, isPositive: true } },
    { title: 'Active Mentors', value: '42', icon: UserCheck, color: 'secondary' as const, trend: { value: 8, isPositive: true } },
    { title: 'Total Internships', value: '89', icon: Briefcase, color: 'info' as const, trend: { value: 15, isPositive: true } },
    { title: 'System Activity', value: '94%', icon: Activity, color: 'success' as const, trend: { value: 2, isPositive: true } },
  ];

  const recentActivities = [
    { action: 'New student registered', user: 'Alice Johnson', time: '5 minutes ago', type: 'user' },
    { action: 'Internship posted', user: 'TechCorp', time: '1 hour ago', type: 'internship' },
    { action: 'Application approved', user: 'Bob Smith', time: '2 hours ago', type: 'application' },
    { action: 'Mentor joined', user: 'Jane Doe', time: '3 hours ago', type: 'user' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Administrator Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">Manage users, internships, and system operations</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              {...stat}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Recently Posted Internship Alert */}
        {recentInternship && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <Link to="/admin/internships" className="block">
              <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5 hover:shadow-glow transition-all duration-300 cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">New Internship Posted!</h3>
                    <p className="text-muted-foreground">
                      {recentInternship.title} at {recentInternship.company}
                    </p>
                    <p className="text-xs text-primary mt-1">Click to view all internships →</p>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/admin/internships">
                      <Button variant="outline" size="sm">
                        View All
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
            </Link>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            {
              title: 'Post Internship',
              description: 'Create new opportunity',
              icon: PlusCircle,
              link: '/admin/post-internship',
              gradient: 'from-primary to-primary/80',
            },
            {
              title: 'Manage Users',
              description: 'Students, mentors, and admins',
              icon: Users,
              link: '/admin/users',
              gradient: 'from-secondary to-secondary/80',
            },
            {
              title: 'Manage Internships',
              description: 'Oversee all opportunities',
              icon: Briefcase,
              link: '/admin/internships',
              gradient: 'from-info to-info/80',
            },
            {
              title: 'Analytics & Reports',
              description: 'View system insights',
              icon: BarChart3,
              link: '/admin/reports',
              gradient: 'from-accent to-accent/80',
            },
          ].map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link to={action.link} className="block h-full">
                <Card className="h-full hover:shadow-glow transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm group">
                  <CardHeader className="pb-8">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {action.title}
                    </CardTitle>
                    <CardDescription className="text-sm">{action.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Recent System Activity</CardTitle>
              <CardDescription>Latest updates across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-muted/50 hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'user' ? 'bg-primary' : 
                        activity.type === 'internship' ? 'bg-secondary' : 
                        'bg-info'
                      } group-hover:scale-125 transition-transform`} />
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{activity.action}</h3>
                        <p className="text-sm text-muted-foreground">{activity.user}</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
