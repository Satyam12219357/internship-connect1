import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { Search, MapPin, Clock, DollarSign, Calendar, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend: string;
  deadline: string;
  description: string;
  requirements: string[];
  type: string;
  postedDate: string;
}

const StudentInternships = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCompany, setFilterCompany] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [filterDuration, setFilterDuration] = useState('all');

  // Mock internship data
  const internships: Internship[] = [
    {
      id: '1',
      title: 'Product Manager Intern',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      duration: '3 months',
      stipend: '$2000/month',
      deadline: '2025-12-31',
      description: 'Join our product team to work on cutting-edge consumer applications. You will collaborate with engineers, designers, and stakeholders to define product strategy and roadmap.',
      requirements: ['Strong analytical skills', 'Basic understanding of product lifecycle', 'Excellent communication', 'Knowledge of Agile methodologies'],
      type: 'Full-time',
      postedDate: '2025-11-01',
    },
    {
      id: '2',
      title: 'Associate Product Manager',
      company: 'StartupXYZ',
      location: 'Remote',
      duration: '6 months',
      stipend: '$1500/month',
      deadline: '2025-12-15',
      description: 'Work directly with our founders to shape product vision. This role offers hands-on experience in a fast-paced startup environment with real impact on business outcomes.',
      requirements: ['Problem-solving mindset', 'User empathy', 'Data-driven thinking', 'Wireframing skills (Figma/Sketch)'],
      type: 'Remote',
      postedDate: '2025-11-05',
    },
    {
      id: '3',
      title: 'Product Analyst Intern',
      company: 'BigTech Inc',
      location: 'New York, NY',
      duration: '4 months',
      stipend: '$2500/month',
      deadline: '2025-12-20',
      description: 'Analyze user data and market trends to inform product decisions. Support the product team with metrics, dashboards, and actionable insights.',
      requirements: ['SQL proficiency', 'Excel/Google Sheets expert', 'Statistical analysis', 'Python/R knowledge is a plus'],
      type: 'Full-time',
      postedDate: '2025-11-08',
    },
    {
      id: '4',
      title: 'Product Strategy Fellow',
      company: 'ConsultCo',
      location: 'Boston, MA',
      duration: '3 months',
      stipend: '$3000/month',
      deadline: '2025-12-25',
      description: 'Develop strategic recommendations for Fortune 500 clients. Learn product strategy frameworks and present insights to senior leadership.',
      requirements: ['MBA or equivalent experience', 'Strategic thinking', 'Presentation skills', 'Business acumen'],
      type: 'Full-time',
      postedDate: '2025-11-10',
    },
    {
      id: '5',
      title: 'Junior Product Manager',
      company: 'FinanceApp',
      location: 'Chicago, IL',
      duration: '6 months',
      stipend: '$2200/month',
      deadline: '2026-01-05',
      description: 'Help build the next generation of financial products for millennials. Work on mobile app features and payment integrations.',
      requirements: ['Mobile app experience', 'Financial tech interest', 'User research skills', 'Competitive analysis'],
      type: 'Hybrid',
      postedDate: '2025-11-12',
    },
    {
      id: '6',
      title: 'Product Operations Intern',
      company: 'CloudSolutions',
      location: 'Seattle, WA',
      duration: '4 months',
      stipend: '$1800/month',
      deadline: '2025-12-28',
      description: 'Streamline product development processes and improve team efficiency. Create documentation and manage product launches.',
      requirements: ['Project management', 'Process optimization', 'Technical writing', 'Stakeholder management'],
      type: 'Full-time',
      postedDate: '2025-11-13',
    },
  ];

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCompany = filterCompany === 'all' || internship.company === filterCompany;
    const matchesRole = filterRole === 'all' || internship.title.toLowerCase().includes(filterRole.toLowerCase());
    const matchesDuration = filterDuration === 'all' || internship.duration === filterDuration;
    
    return matchesSearch && matchesCompany && matchesRole && matchesDuration;
  });

  const companies = ['all', ...new Set(internships.map(i => i.company))];
  const durations = ['all', '3 months', '4 months', '6 months'];

  const handleApply = (internshipId: string, title: string) => {
    toast.success(`Application submitted for ${title}!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Browse Internships</h1>
          <p className="text-muted-foreground">Discover opportunities that match your career goals</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search internships..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={filterCompany} onValueChange={setFilterCompany}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company === 'all' ? 'All Companies' : company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="product manager">Product Manager</SelectItem>
                  <SelectItem value="analyst">Product Analyst</SelectItem>
                  <SelectItem value="strategy">Product Strategy</SelectItem>
                  <SelectItem value="operations">Product Operations</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterDuration} onValueChange={setFilterDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((duration) => (
                    <SelectItem key={duration} value={duration}>
                      {duration === 'all' ? 'All Durations' : duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results count */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredInternships.length}</span> internship{filteredInternships.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Internship Listings */}
        <div className="space-y-6">
          {filteredInternships.map((internship, index) => (
            <Card key={internship.id} className="hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-primary">{internship.company[0]}</span>
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-1">{internship.title}</CardTitle>
                        <CardDescription className="text-base font-semibold text-foreground">{internship.company}</CardDescription>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mt-4">
                      <Badge variant="secondary" className="gap-1">
                        <MapPin className="h-3 w-3" />
                        {internship.location}
                      </Badge>
                      <Badge variant="secondary" className="gap-1">
                        <Clock className="h-3 w-3" />
                        {internship.duration}
                      </Badge>
                      <Badge variant="secondary" className="gap-1">
                        <DollarSign className="h-3 w-3" />
                        {internship.stipend}
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <Calendar className="h-3 w-3" />
                        Deadline: {new Date(internship.deadline).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                  
                  <Button onClick={() => handleApply(internship.id, internship.title)} className="gap-2">
                    Apply Now
                    <CheckCircle2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-muted-foreground">{internship.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Requirements</h4>
                    <ul className="space-y-1">
                      {internship.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Posted on {new Date(internship.postedDate).toLocaleDateString()} • {internship.type}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredInternships.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No internships found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setFilterCompany('all');
                    setFilterRole('all');
                    setFilterDuration('all');
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentInternships;
