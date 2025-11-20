import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  Building2, 
  Briefcase, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock,
  Plus,
  X,
  Sparkles
} from 'lucide-react';

const PostInternship = () => {
  const [requirements, setRequirements] = useState<string[]>(['']);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    duration: '',
    stipend: '',
    deadline: '',
    description: '',
  });

  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const updateRequirement = (index: number, value: string) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.company || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Filter out empty requirements
    const validRequirements = requirements.filter(req => req.trim() !== '');
    
    if (validRequirements.length === 0) {
      toast.error('Please add at least one requirement');
      return;
    }

    setIsSubmitting(true);

    // Mock submission with localStorage
    setTimeout(() => {
      // Store recently posted internship
      const internshipData = {
        title: formData.title,
        company: formData.company,
        timestamp: Date.now(),
      };
      localStorage.setItem('recentInternship', JSON.stringify(internshipData));
      
      toast.success('🎉 Internship posted successfully!', {
        description: 'Students can now view and apply for this opportunity.',
      });

      setIsSubmitting(false);

      // Reset form
      setFormData({
        title: '',
        company: '',
        location: '',
        type: '',
        duration: '',
        stipend: '',
        deadline: '',
        description: '',
      });
      setRequirements(['']);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Post New Internship</h1>
                <p className="text-muted-foreground">Create an opportunity for aspiring product managers</p>
              </div>
            </div>
          </div>

          <Card className="shadow-soft border-border/50 backdrop-blur-sm bg-card/50">
            <CardHeader>
              <CardTitle>Internship Details</CardTitle>
              <CardDescription>
                Fill in the information below to create a new internship opportunity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title & Company */}
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="title" className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-primary" />
                      Position Title *
                    </Label>
                    <Input
                      id="title"
                      placeholder="e.g., Product Manager Intern"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="bg-background/50"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="company" className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-accent" />
                      Company Name *
                    </Label>
                    <Input
                      id="company"
                      placeholder="e.g., TechCorp Inc."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                      className="bg-background/50"
                    />
                  </motion.div>
                </div>

                {/* Location & Type */}
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="location" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-success" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      placeholder="e.g., Remote / New York, NY"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="bg-background/50"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="type" className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-warning" />
                      Type
                    </Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                </div>

                {/* Duration & Stipend */}
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="duration" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-info" />
                      Duration
                    </Label>
                    <Input
                      id="duration"
                      placeholder="e.g., 3 months / 6 months"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="bg-background/50"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="stipend" className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-success" />
                      Stipend
                    </Label>
                    <Input
                      id="stipend"
                      placeholder="e.g., $2000/month or Unpaid"
                      value={formData.stipend}
                      onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
                      className="bg-background/50"
                    />
                  </motion.div>
                </div>

                {/* Deadline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <Label htmlFor="deadline" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-warning" />
                    Application Deadline
                  </Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="bg-background/50"
                  />
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="space-y-2"
                >
                  <Label htmlFor="description">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of the internship role, responsibilities, and what the intern will learn..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={6}
                    className="bg-background/50 resize-none"
                  />
                </motion.div>

                {/* Requirements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  <Label>Requirements *</Label>
                  <div className="space-y-3">
                    {requirements.map((req, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex gap-2"
                      >
                        <Input
                          placeholder={`Requirement ${index + 1}`}
                          value={req}
                          onChange={(e) => updateRequirement(index, e.target.value)}
                          className="bg-background/50"
                        />
                        {requirements.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeRequirement(index)}
                            className="shrink-0 hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </motion.div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addRequirement}
                      className="w-full border-dashed hover:border-primary hover:bg-primary/5"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Requirement
                    </Button>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="flex gap-4 pt-4"
                >
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-primary to-accent hover:shadow-glow"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Post Internship
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setFormData({
                        title: '',
                        company: '',
                        location: '',
                        type: '',
                        duration: '',
                        stipend: '',
                        deadline: '',
                        description: '',
                      });
                      setRequirements(['']);
                    }}
                  >
                    Clear Form
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PostInternship;
