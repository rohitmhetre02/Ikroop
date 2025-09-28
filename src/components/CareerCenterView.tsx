import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Search, MapPin, Briefcase, Calendar, Star, Bookmark, DollarSign, Clock, User } from "lucide-react";

interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salaryRange: string;
  description: string;
  skills: string[];
  postedBy: string;
  postedDate: string;
  isRecommended?: boolean;
}

export function CareerCenterView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState<JobOpportunity | null>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  // Mock job data
  const [jobs] = useState<JobOpportunity[]>([
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Infosys',
      location: 'Bengaluru, Karnataka',
      type: 'full-time',
      salaryRange: '₹15,00,000 - ₹25,00,000',
      description: 'Join our team building next-generation cloud infrastructure. Looking for someone with strong backend experience and leadership skills.',
      skills: ['Python', 'Go', 'Kubernetes', 'AWS', 'Microservices'],
      postedBy: 'John Doe (Class of 2018)',
      postedDate: '2 days ago',
      isRecommended: true
    },
    {
      id: '2',
      title: 'Product Marketing Manager',
      company: 'Tata Consultancy Services',
      location: 'Mumbai, Maharashtra',
      type: 'full-time',
      salaryRange: '₹10,00,000 - ₹18,00,000',
      description: 'Lead product marketing initiatives for our enterprise solutions. Perfect for someone with B2B SaaS experience.',
      skills: ['Product Marketing', 'Analytics', 'Content Strategy', 'B2B SaaS'],
      postedBy: 'Jane Smith (Class of 2019)',
      postedDate: '1 week ago',
      isRecommended: true
    },
    {
      id: '3',
      title: 'UX Designer',
      company: 'Adobe India',
      location: 'Bengaluru, Karnataka',
      type: 'full-time',
      salaryRange: '₹12,00,000 - ₹20,00,000',
      description: 'Design user experiences for creative tools used by millions. Looking for someone passionate about design systems.',
      skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping'],
      postedBy: 'Sarah Wilson (Class of 2020)',
      postedDate: '3 days ago',
      isRecommended: true
    },
    {
      id: '4',
      title: 'Data Scientist',
      company: 'Reliance Jio',
      location: 'Mumbai, Maharashtra',
      type: 'full-time',
      salaryRange: '₹14,00,000 - ₹22,00,000',
      description: 'Work on recommendation algorithms and data analysis to improve user experience.',
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
      postedBy: 'Mike Johnson (Class of 2017)',
      postedDate: '5 days ago'
    },
    {
      id: '5',
      title: 'Financial Analyst',
      company: 'HDFC Bank',
      location: 'Mumbai, Maharashtra',
      type: 'full-time',
      salaryRange: '₹8,00,000 - ₹12,00,000',
      description: 'Join our investment banking team. Great opportunity for recent graduates.',
      skills: ['Excel', 'Financial Modeling', 'Valuation', 'Bloomberg Terminal'],
      postedBy: 'Lisa Chen (Class of 2016)',
      postedDate: '1 week ago'
    },
    {
      id: '6',
      title: 'Frontend Developer',
      company: 'Swiggy',
      location: 'Bengaluru, Karnataka',
      type: 'contract',
      salaryRange: '₹800 - ₹1,500/hr',
      description: 'Build beautiful and responsive user interfaces for our platform.',
      skills: ['React', 'TypeScript', 'CSS', 'JavaScript'],
      postedBy: 'Alex Rodriguez (Class of 2021)',
      postedDate: '4 days ago'
    }
  ]);

  const recommendedJobs = jobs.filter(job => job.isRecommended).slice(0, 3);
  const otherJobs = jobs.filter(job => !job.isRecommended);
  
  const filteredJobs = otherJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesSkill = !skillFilter || job.skills.some(skill => skill.toLowerCase().includes(skillFilter.toLowerCase()));
    const matchesSalary = salaryFilter === "all" || job.salaryRange.includes(salaryFilter);
    return matchesSearch && matchesLocation && matchesSkill && matchesSalary;
  });

  const handleSaveJob = (jobId: string) => {
    setSavedJobs(prev => prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]);
  };

  const handleApply = (job: JobOpportunity) => {
    alert(`Applying to ${job.title} at ${job.company}`);
  };

  const handleViewDetails = (job: JobOpportunity) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-100 text-green-800';
      case 'part-time': return 'bg-blue-100 text-blue-800';
      case 'contract': return 'bg-purple-100 text-purple-800';
      case 'internship': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Career Center</h1>
        <p className="text-muted-foreground">
          Discover job opportunities and advance your career with our alumni network
        </p>
      </div>

      {/* Recommended Jobs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" /> Recommended for You
          </CardTitle>
          <CardDescription>Top job opportunities based on your profile and interests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedJobs.map(job => (
              <Card key={job.id} className="border-yellow-200 bg-yellow-50/50">
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h4 className="font-semibold">{job.title}</h4>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="h-3 w-3" /> {job.salaryRange}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {job.skills.slice(0, 3).map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                  <Button size="sm" className="w-full" onClick={() => handleViewDetails(job)}>View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters + Other Jobs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" /> All Job Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <Input placeholder="Search jobs..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <Input placeholder="Location..." value={locationFilter} onChange={e => setLocationFilter(e.target.value)} />
            <Input placeholder="Skills..." value={skillFilter} onChange={e => setSkillFilter(e.target.value)} />
            <Select value={salaryFilter} onValueChange={setSalaryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Salary Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ranges</SelectItem>
                <SelectItem value="50k">$50k+</SelectItem>
                <SelectItem value="80k">$80k+</SelectItem>
                <SelectItem value="100k">$100k+</SelectItem>
                <SelectItem value="150k">$150k+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="sm" className="mb-4" onClick={() => {
            setSearchTerm(""); setLocationFilter(""); setSkillFilter(""); setSalaryFilter("all");
          }}>Clear All Filters</Button>

          {/* Job List */}
          <div className="space-y-4">
            {filteredJobs.map(job => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <p className="text-muted-foreground">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeColor(job.type)}>{job.type}</Badge>
                      <Button variant="ghost" size="sm" onClick={() => handleSaveJob(job.id)}>
                        <Bookmark className={`h-4 w-4 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> {job.location}</div>
                    <div className="flex items-center"><DollarSign className="h-4 w-4 mr-2" /> {job.salaryRange}</div>
                    <div className="flex items-center"><Clock className="h-4 w-4 mr-2" /> {job.postedDate}</div>
                  </div>
                  <p className="text-sm mb-4 line-clamp-2">{job.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map(skill => <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>)}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="h-4 w-4 mr-2" /> Posted by {job.postedBy}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(job)}>View Details</Button>
                      <Button size="sm" onClick={() => handleApply(job)}>Apply Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No jobs found matching your criteria.</div>
          )}
        </CardContent>
      </Card>

      {/* Job Details Dialog */}
      <Dialog open={showJobDetails} onOpenChange={setShowJobDetails}>
        <DialogContent>
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedJob.title}</DialogTitle>
                <DialogDescription>{selectedJob.company}</DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div className="flex items-center text-sm text-muted-foreground"><MapPin className="h-4 w-4 mr-2" /> {selectedJob.location}</div>
                <div className="flex items-center text-sm text-muted-foreground"><DollarSign className="h-4 w-4 mr-2" /> {selectedJob.salaryRange}</div>
                <div className="flex items-center text-sm text-muted-foreground"><Calendar className="h-4 w-4 mr-2" /> {selectedJob.postedDate}</div>
                <p>{selectedJob.description}</p>
                <div className="flex flex-wrap gap-2">{selectedJob.skills.map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)}</div>
                <div className="text-sm text-muted-foreground">Posted by {selectedJob.postedBy}</div>
                <Button className="w-full mt-4" onClick={() => handleApply(selectedJob)}>Apply Now</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
