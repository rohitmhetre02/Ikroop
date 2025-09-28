import img from "../../assets/fair.png";

export const mockAlumni = [
  {
    id: '1',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    email: 'arjun.sharma@email.com',
    first_name: 'Arjun',
    last_name: 'Sharma',
    graduation_year: 2018,
    degree: 'Computer Science',
    company: 'Infosys',
    position: 'Software Engineer',
    location: 'Bengaluru, Karnataka',
    bio: 'Passionate about building scalable web applications.',
    // ✅ Added placeholder image
    avatar_url: 'https://i.pravatar.cc/150?img=11',
    industry_id: '1',
    linkedin_url: 'https://linkedin.com/in/arjunsharma',
    is_active: true,
    is_admin: false,
    industry: { id: '1', name: 'Technology', created_at: '2024-01-01T00:00:00Z' },
    skills: [
      { id: '1', name: 'JavaScript', created_at: '2024-01-01T00:00:00Z' },
      { id: '2', name: 'React', created_at: '2024-01-01T00:00:00Z' },
      { id: '3', name: 'Node.js', created_at: '2024-01-01T00:00:00Z' }
    ]
  },
  {
    id: '2',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    email: 'neha.verma@email.com',
    first_name: 'Neha',
    last_name: 'Verma',
    graduation_year: 2019,
    degree: 'Marketing',
    company: 'Tata Consultancy Services',
    position: 'Marketing Manager',
    location: 'Mumbai, Maharashtra',
    bio: 'Helping businesses grow through data-driven marketing strategies.',
    avatar_url: 'https://i.pravatar.cc/150?img=12',
    industry_id: '2',
    linkedin_url: 'https://linkedin.com/in/nehaverma',
    is_active: true,
    is_admin: false,
    industry: { id: '2', name: 'Marketing', created_at: '2024-01-01T00:00:00Z' },
    skills: [
      { id: '4', name: 'Digital Marketing', created_at: '2024-01-01T00:00:00Z' },
      { id: '5', name: 'Analytics', created_at: '2024-01-01T00:00:00Z' }
    ]
  },
  {
    id: '3',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    email: 'rahul.kapoor@email.com',
    first_name: 'Rahul',
    last_name: 'Kapoor',
    graduation_year: 2017,
    degree: 'Finance',
    company: 'HDFC Bank',
    position: 'Investment Analyst',
    location: 'Mumbai, Maharashtra',
    bio: 'Financial analyst with expertise in investment banking.',
    avatar_url: 'https://i.pravatar.cc/150?img=13',
    industry_id: '3',
    linkedin_url: 'https://linkedin.com/in/rahulkapoor',
    is_active: true,
    is_admin: false,
    industry: { id: '3', name: 'Finance', created_at: '2024-01-01T00:00:00Z' },
    skills: [
      { id: '6', name: 'Financial Analysis', created_at: '2024-01-01T00:00:00Z' },
      { id: '7', name: 'Excel', created_at: '2024-01-01T00:00:00Z' }
    ]
  },
  {
    id: '4',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    email: 'sanya.iyer@email.com',
    first_name: 'Sanya',
    last_name: 'Iyer',
    graduation_year: 2020,
    degree: 'Graphic Design',
    company: 'Adobe India',
    position: 'UX Designer',
    location: 'Bengaluru, Karnataka',
    bio: 'Creating beautiful and functional user experiences.',
    avatar_url: 'https://i.pravatar.cc/150?img=14',
    industry_id: '4',
    linkedin_url: 'https://linkedin.com/in/sanyaiyer',
    is_active: true,
    is_admin: false,
    industry: { id: '4', name: 'Design', created_at: '2024-01-01T00:00:00Z' },
    skills: [
      { id: '8', name: 'UI/UX Design', created_at: '2024-01-01T00:00:00Z' },
      { id: '9', name: 'Figma', created_at: '2024-01-01T00:00:00Z' }
    ]
  }
];


export const mockEvents = [
  
  {
    id: '1',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    title: 'Tech Career Fair',
    description: 'Explore exciting career opportunities in technology with leading Indian companies.',
    event_date: '2024-09-25',
    event_time: '10:00',
    location: 'Bengaluru Tech Hub',
    category: 'Professional',
    status: 'published' as const,
    max_capacity: 200,
    registration_fee: 0,
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    organizer_id: '1',
    created_by: '1',
    organizer: mockAlumni[0],
    attendees_count: 156
  },
  {
    id: '2',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    title: 'Alumni Networking Mixer',
    description: 'Casual networking event for alumni in the Delhi NCR region.',
    event_date: '2024-11-08',
    event_time: '19:00',
    location: 'Delhi Conference Center',
    category: 'Social',
    status: 'published' as const,
    max_capacity: 150,
    registration_fee: 25,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    organizer_id: '2',
    created_by: '2',
    organizer: mockAlumni[1],
    attendees_count: 89
  },
  {
    id: '3',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    title: 'Annual Alumni Reunion',
    description: 'Join us for our biggest alumni gathering of the year! Reconnect with classmates, network with professionals, and celebrate our shared experiences.',
    event_date: '2024-10-15',
    event_time: '18:00',
    location: 'IIT Delhi Campus Hall',
    category: 'Reunion',
    status: 'published' as const,
    max_capacity: 500,
    registration_fee: 0,
image: 'https://images.unsplash.com/photo-1596496055830-3c9c2c1ee0c0?auto=format&fit=crop&w=800&q=80',

    organizer_id: '1',
    created_by: '1',
    organizer: mockAlumni[0],
    attendees_count: 234
  },
];


export const mockAnalytics = {
  totalAlumni: 1247,
  activeAlumni: 892,
  totalEvents: 15,
  avgAttendanceRate: 73.5,
  monthlyEngagement: [
    { month: "Jan", registrations: 85, events: 12, connections: 234 },
    { month: "Feb", registrations: 92, events: 15, connections: 289 },
    { month: "Mar", registrations: 78, events: 18, connections: 312 },
    { month: "Apr", registrations: 105, events: 14, connections: 356 },
    { month: "May", registrations: 118, events: 20, connections: 298 },
    { month: "Jun", registrations: 134, events: 16, connections: 387 }
  ],
  industryDistribution: [
    { name: "Technology", value: 35, percentage: 28.1 },
    { name: "Finance", value: 25, percentage: 20.1 },
    { name: "Healthcare", value: 20, percentage: 16.1 },
    { name: "Education", value: 18, percentage: 14.5 },
    { name: "Marketing", value: 15, percentage: 12.1 },
    { name: "Other", value: 11, percentage: 8.8 }
  ],
  graduationYearDistribution: [
    { year: "2023", count: 89 },
    { year: "2022", count: 112 },
    { year: "2021", count: 98 },
    { year: "2020", count: 145 },
    { year: "2019", count: 156 },
    { year: "2018", count: 178 },
    { year: "2017", count: 134 }
  ],
  geographicDistribution: [
    { location: "Bengaluru, Karnataka", count: 156, percentage: 17.5 },
    { location: "Mumbai, Maharashtra", count: 134, percentage: 15.0 },
    { location: "Delhi, NCR", count: 98, percentage: 11.0 },
    { location: "Hyderabad, Telangana", count: 87, percentage: 9.8 },
    { location: "Chennai, Tamil Nadu", count: 76, percentage: 8.5 },
    { location: "Pune, Maharashtra", count: 65, percentage: 7.3 }
  ],
  eventAttendanceRates: [
    { event: "Tech Meetup", attendees: 156, capacity: 200, rate: 78 },
    { event: "Alumni Mixer", attendees: 89, capacity: 150, rate: 59 },
    { event: "Career Fair", attendees: 234, capacity: 300, rate: 78 },
    { event: "Reunion 2023", attendees: 445, capacity: 500, rate: 89 },
    { event: "Workshop Series", attendees: 67, capacity: 100, rate: 67 }
  ]
};



