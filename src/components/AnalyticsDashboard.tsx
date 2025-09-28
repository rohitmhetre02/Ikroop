import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from "recharts";
import { TrendingUp, TrendingDown, Users, MapPin, Briefcase, GraduationCap, Download } from "lucide-react";
import { useAnalytics } from "../hooks/useAnalytics";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

export function AnalyticsDashboard() {
  const { data: analyticsData, loading } = useAnalytics();

  if (loading || !analyticsData) {
    return (
      <div className="space-y-6">
        <div>
          <h1>Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Loading analytics data...
          </p>
        </div>
      </div>
    );
  }

  // Safety checks for data properties
  const safeAnalyticsData = {
    totalAlumni: analyticsData.totalAlumni || 0,
    activeAlumni: analyticsData.activeAlumni || 0,
    totalEvents: analyticsData.totalEvents || 0,
    avgAttendanceRate: analyticsData.avgAttendanceRate || 0,
    monthlyEngagement: analyticsData.monthlyEngagement || [],
    industryDistribution: analyticsData.industryDistribution || [],
    graduationYearDistribution: analyticsData.graduationYearDistribution || [],
    geographicDistribution: analyticsData.geographicDistribution || [],
    eventAttendanceRates: analyticsData.eventAttendanceRates || []
  };

  const keyMetrics = [
    {
      title: "Total Alumni",
      value: safeAnalyticsData.totalAlumni.toLocaleString(),
      change: "+5.2%",
      changeType: "increase",
      icon: Users
    },
    {
      title: "Active Rate",
      value: safeAnalyticsData.totalAlumni > 0 
        ? `${((safeAnalyticsData.activeAlumni / safeAnalyticsData.totalAlumni) * 100).toFixed(1)}%`
        : "0%",
      change: "+3.1%",
      changeType: "increase",
      icon: TrendingUp
    },
    {
      title: "Event Attendance",
      value: `${safeAnalyticsData.avgAttendanceRate}%`,
      change: "-2.4%",
      changeType: "decrease",
      icon: GraduationCap
    },
    {
      title: "Total Events",
      value: safeAnalyticsData.totalEvents.toString(),
      change: "+1.8%",
      changeType: "increase",
      icon: Briefcase
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into alumni engagement and network performance.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric) => {
          const Icon = metric.icon;
          const isIncrease = metric.changeType === "increase";
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  {isIncrease ? (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={isIncrease ? "text-green-500" : "text-red-500"}>
                    {metric.change}
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="engagement" className="space-y-6">
        <TabsList>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Engagement Trends</CardTitle>
                <CardDescription>
                  Track registrations, events, and connections over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={safeAnalyticsData.monthlyEngagement}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="registrations"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="connections"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alumni by Graduation Year</CardTitle>
                <CardDescription>
                  Distribution of alumni across graduation years
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={safeAnalyticsData.graduationYearDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Industry Distribution</CardTitle>
                <CardDescription>
                  Alumni distribution across different industries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={safeAnalyticsData.industryDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {safeAnalyticsData.industryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Industries</CardTitle>
                <CardDescription>
                  Most popular career paths among alumni
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {safeAnalyticsData.industryDistribution.slice(0, 6).map((industry, index) => (
                    <div key={industry.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm font-medium">{industry.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">
                          {industry.value}
                        </span>
                        <Badge variant="secondary">{industry.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Attendance Rates</CardTitle>
                <CardDescription>
                  Attendance rates for recent events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={safeAnalyticsData.eventAttendanceRates} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="event" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="rate" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Event Performance</CardTitle>
                <CardDescription>
                  Detailed breakdown of event metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {safeAnalyticsData.eventAttendanceRates.map((event) => (
                    <div key={event.event} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{event.event}</span>
                        <Badge variant="outline">{event.rate}%</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{event.attendees}/{event.capacity} attendees</span>
                        <span>Capacity: {((event.attendees / event.capacity) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>
                  Alumni locations by state/region
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={safeAnalyticsData.geographicDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="location" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Locations</CardTitle>
                <CardDescription>
                  Most popular alumni destinations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {safeAnalyticsData.geographicDistribution.slice(0, 6).map((location, index) => (
                    <div key={location.location} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{location.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">
                          {location.count}
                        </span>
                        <Badge variant="secondary">{location.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}