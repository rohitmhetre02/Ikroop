import { useState } from "react";
import {
  Card, CardContent, CardDescription,
  CardHeader, CardTitle
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Star, Users, DollarSign, MessageSquare, X } from "lucide-react";

interface Mentor {
  id: string;
  name: string;
  image: string;
  profession: string;
  shortServices: string;
  services: string[];
  priceRange: string;
  rating: number;
  mentees: number;
  reviews: string[];
  isAvailable?: boolean;
  isRecommended?: boolean;
}

const mentors: Mentor[] = [
  {
    id: "1",
    name: "Dr. Aditi Mehra",
    image: "https://i.pravatar.cc/150?img=47",
    profession: "Data Scientist at Infosys",
    shortServices: "Machine Learning career guidance",
    services: [
      "One-on-one guidance for Data Science career path",
      "Mock interviews & resume review",
      "Project mentorship in ML & AI"
    ],
    priceRange: "₹1,000 – ₹2,000 / session",
    rating: 4.9,
    mentees: 125,
    reviews: [
      "Excellent mentor, very detailed explanations!",
      "Helped me crack my first ML job."
    ],
    isAvailable: true,
    isRecommended: true
  },
  {
    id: "2",
    name: "Rahul Sharma",
    image: "https://i.pravatar.cc/150?img=32",
    profession: "Senior Frontend Engineer at TCS",
    shortServices: "React & TypeScript coaching",
    services: [
      "Deep dive sessions on React architecture",
      "Performance optimization strategies",
      "Guidance on large-scale front-end projects"
    ],
    priceRange: "₹800 – ₹1,500 / session",
    rating: 4.7,
    mentees: 90,
    reviews: [
      "Very knowledgeable in frontend best practices.",
      "Great tips for improving code quality."
    ],
    isAvailable: true,
    isRecommended: true
  },
  {
    id: "3",
    name: "Priya Nair",
    image: "https://i.pravatar.cc/150?img=25",
    profession: "Product Manager at Flipkart",
    shortServices: "Product management & strategy",
    services: [
      "Roadmap planning & feature prioritization",
      "Interview preparation for PM roles",
      "Case-study and business analysis coaching"
    ],
    priceRange: "₹1,200 – ₹2,500 / session",
    rating: 4.8,
    mentees: 150,
    reviews: [
      "Priya gave me a clear path to transition into PM.",
      "Her real-world examples are invaluable."
    ],
    isAvailable: false,
    isRecommended: true
  },
  {
    id: "4",
    name: "Vikram Singh",
    image: "https://i.pravatar.cc/150?img=12",
    profession: "AI Engineer at Google",
    shortServices: "AI & ML career guidance",
    services: [
      "AI project mentoring",
      "Resume & LinkedIn profile review",
      "Interview preparation"
    ],
    priceRange: "₹1,500 – ₹3,000 / session",
    rating: 4.6,
    mentees: 80,
    reviews: [
      "Very insightful mentorship.",
      "Helped me land an AI role."
    ],
    isAvailable: true,
    isRecommended: false
  },
  {
    id: "5",
    name: "Neha Kapoor",
    image: "https://i.pravatar.cc/150?img=15",
    profession: "Full Stack Developer at Infosys",
    shortServices: "Web development & career guidance",
    services: [
      "One-on-one mentoring in React & Node.js",
      "Portfolio & GitHub project review",
      "Interview preparation for tech roles"
    ],
    priceRange: "₹900 – ₹2,000 / session",
    rating: 4.8,
    mentees: 95,
    reviews: [
      "Neha helped me get my first full-stack job!",
      "Very practical guidance, loved her mentorship."
    ],
    isAvailable: true,
    isRecommended: false
  },
  {
    id: "6",
    name: "Rohit Verma",
    image: "https://i.pravatar.cc/150?img=18",
    profession: "Data Analyst at Wipro",
    shortServices: "Data analysis & Excel mastery",
    services: [
      "Advanced Excel & Power BI sessions",
      "Data visualization techniques",
      "Resume & interview guidance for analyst roles"
    ],
    priceRange: "₹800 – ₹1,500 / session",
    rating: 4.7,
    mentees: 70,
    reviews: [
      "Rohit’s sessions are very detailed and easy to follow.",
      "Helped me improve my data analysis skills immensely."
    ],
    isAvailable: true,
    isRecommended: false
  }
];

export default function MentorshipView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showFeatures, setShowFeatures] = useState<Mentor | null>(null);

  const recommendedMentors = mentors.filter(m => m.isRecommended).slice(0, 3);
  const otherMentors = mentors.filter(m => !m.isRecommended);

  const filteredOtherMentors = otherMentors.filter(m => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.profession.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "available" && m.isAvailable);
    return matchesSearch && matchesFilter;
  });

  const handleOpenProfile = (mentor: Mentor) => setSelectedMentor(mentor);
  const handleBook = (mentor: Mentor) => alert(`Booking mentorship session with ${mentor.name}`);
  const handleShowFeatures = (mentor: Mentor) => setShowFeatures(mentor);

  const MentorCard = ({ mentor }: { mentor: Mentor }) => (
    <Card key={mentor.id} className={`hover:shadow-md transition-shadow ${mentor.isRecommended ? "border-yellow-200 bg-yellow-50/50" : ""}`}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleOpenProfile(mentor)}>
          <img src={mentor.image} alt={mentor.name} className="h-12 w-12 rounded-full object-cover" />
          <div>
            <h4 className="font-semibold">{mentor.name}</h4>
            <p className="text-sm text-muted-foreground">{mentor.profession}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{mentor.shortServices}</p>
        <div className="flex flex-col gap-2">
          <Button size="sm" variant="outline" onClick={() => handleShowFeatures(mentor)}>
            View Features
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" /> {mentor.priceRange}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-500" /> {mentor.rating}
          </Badge>
        </div>
        <Button size="sm" className="w-full mt-2" disabled={!mentor.isAvailable} onClick={() => handleBook(mentor)}>
          <MessageSquare className="h-4 w-4" /> {mentor.isAvailable ? "Book Mentorship" : "Unavailable"}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Mentorship</h1>
        <p className="text-muted-foreground">Browse experienced mentors and book one-on-one sessions</p>
      </div>

      <Tabs defaultValue="mentors" className="space-y-6">

        <TabsContent value="mentors" className="space-y-6">
          {/* Recommended Mentors */}
          {recommendedMentors.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" /> Recommended Mentors
                </CardTitle>
                <CardDescription>Hand-picked mentors based on popularity and ratings</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedMentors.map(mentor => <MentorCard key={mentor.id} mentor={mentor} />)}
              </CardContent>
            </Card>
          )}

          {/* Other Mentors */}
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <Input placeholder="Search mentors by name or profession..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <select value={selectedFilter} onChange={e => setSelectedFilter(e.target.value)} className="border rounded-md p-2 md:w-48">
                  <option value="all">All Mentors</option>
                  <option value="available">Available</option>
                </select>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOtherMentors.length > 0 ? filteredOtherMentors.map(mentor => <MentorCard key={mentor.id} mentor={mentor} />) :
                <div className="text-center py-8 text-muted-foreground">No mentors found.</div>
              }
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Mentor Profile Dialog */}
      <Dialog open={!!selectedMentor} onOpenChange={() => setSelectedMentor(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedMentor && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMentor.name}</DialogTitle>
                <DialogDescription>{selectedMentor.profession}</DialogDescription>
              </DialogHeader>
              <div className="flex items-center gap-4">
                <img src={selectedMentor.image} alt={selectedMentor.name} className="h-20 w-20 rounded-full object-cover" />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 mt-1">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" /> {selectedMentor.rating}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Users className="h-4 w-4" /> {selectedMentor.mentees} mentees
                    </Badge>
                  </div>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" /> {selectedMentor.priceRange}
                  </Badge>
                  <Button className="mt-2 w-full" onClick={() => handleBook(selectedMentor)}>Book Mentorship</Button>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold mb-2">Reviews</h3>
                <div className="space-y-2">
                  {selectedMentor.reviews.map((review, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground border-l-2 pl-2">{review}</p>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Mentor Features Dialog */}
      <Dialog open={!!showFeatures} onOpenChange={() => setShowFeatures(null)}>
        <DialogContent className="max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{showFeatures?.name} - Features</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowFeatures(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            {showFeatures?.services.map((s, idx) => <li key={idx}>{s}</li>)}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
}
