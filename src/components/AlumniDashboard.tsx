import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Users, Calendar, TrendingUp, MessageSquare, GraduationCap, Building, LogIn } from "lucide-react";
import { useAnalytics } from "../hooks/useAnalytics";
import { useEvents } from "../hooks/useEvents";
import { useAlumni } from "../hooks/useAlumni";
import { useAuth } from "../contexts/AuthContext";
import { SignInDialog } from "./SignInDialog";
import { ProfileView } from "./ProfileView";

export function AlumniDashboard() {
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const { data: analyticsData, loading: analyticsLoading } = useAnalytics();
  const { events, loading: eventsLoading } = useEvents();
  const { alumni, loading: alumniLoading } = useAlumni();

  const stats = [
    {
      title: "Total Alumni",
      value: analyticsData?.totalAlumni?.toLocaleString() || "0",
      change: "+5.2%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Members",
      value: analyticsData?.activeAlumni?.toLocaleString() || "0",
      change: "+12.1%",
      icon: GraduationCap,
      color: "text-green-600"
    },
    {
      title: "Upcoming Events",
      value: events?.filter(e => e.status === 'published' && new Date(e.event_date) > new Date()).length.toString() || "0",
      change: "+3",
      icon: Calendar,
      color: "text-purple-600"
    },
    {
      title: "Avg Attendance",
      value: `${analyticsData?.avgAttendanceRate || 0}%`,
      change: "+2.1%",
      icon: Building,
      color: "text-orange-600"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "New Registration",
      description: `${alumni?.slice(0,1)[0]?.first_name || 'New member'} joined the network`,
      time: "2 hours ago",
      icon: Users
    },
    {
      id: 2,
      type: "Event Update",
      description: events?.filter(e => e.status === 'published')[0]?.title || "New event available",
      time: "4 hours ago",
      icon: Calendar
    },
    {
      id: 3,
      type: "Job Posting",
      description: "New opportunities posted by Tech Corp",
      time: "6 hours ago",
      icon: Building
    },
    {
      id: 4,
      type: "Discussion",
      description: "Alumni mentorship program discussion thread",
      time: "1 day ago",
      icon: MessageSquare
    }
  ];

  const upcomingEvents = events
    ?.filter(event => 
      event.status === 'published' && 
      new Date(event.event_date) > new Date()
    )
    .slice(0, 3)
    .map(event => ({
      id: event.id,
      title: event.title,
      date: new Date(event.event_date).toLocaleDateString(),
      location: event.location,
      attendees: event.attendees_count || 0,
      status: new Date(event.event_date) > new Date() ? "Open" : "Closed"
    })) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Welcome </h1>
          <p className="text-muted-foreground">
            Welcome to the Alumni Portal. Here's what's happening in your alumni network.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>Generate Report</Button>
          <Button variant="outline" onClick={() => setShowSignInDialog(true)}>
            <LogIn className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Always show content - no authentication required */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Latest updates and activities in your alumni network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              Events and activities planned for the community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={event.status === "Open" ? "default" : "secondary"}>
                      {event.status}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      {event.attendees} attending
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <SignInDialog 
        open={showSignInDialog} 
        onOpenChange={setShowSignInDialog} 
      />
    </div>
  );
}