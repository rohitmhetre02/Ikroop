import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Bell, Check, X, Users, Calendar, MessageSquare, Briefcase, Settings } from "lucide-react";

interface Notification {
  id: string;
  type: 'event' | 'connection' | 'message' | 'job' | 'system';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  avatar?: string;
  actionable?: boolean;
}

export function NotificationsView() {
  const [notifications, setNotifications] = useState<Notification[]>([
  {
    id: '1',
    type: 'event',
    title: 'New Event Invitation',
    message: "You've been invited to the Annual Alumni Meet on December 10th at IIT Delhi",
    time: '2 hours ago',
    isRead: false,
    actionable: true
  },
  {
    id: '2',
    type: 'connection',
    title: 'New Connection Request',
    message: 'Rohit Verma wants to connect with you',
    time: '4 hours ago',
    isRead: false,
    avatar: 'RV',
    actionable: true
  },
  {
    id: '3',
    type: 'message',
    title: 'New Message',
    message: 'Priya Nair sent you a message regarding the Bengaluru Tech Meetup',
    time: '6 hours ago',
    isRead: true,
    avatar: 'PN'
  },
  {
    id: '4',
    type: 'job',
    title: 'Job Opportunity',
    message: 'New Software Engineer position at TCS matches your profile',
    time: '1 day ago',
    isRead: false,
    actionable: true
  },
  {
    id: '5',
    type: 'system',
    title: 'Profile Update',
    message: 'Your profile has been successfully updated',
    time: '2 days ago',
    isRead: true
  },
  {
    id: '6',
    type: 'event',
    title: 'Event Reminder',
    message: 'Tech Career Fair is tomorrow at 10:00 AM in Mumbai',
    time: '3 days ago',
    isRead: true
  }
]);


  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'event': return Calendar;
      case 'connection': return Users;
      case 'message': return MessageSquare;
      case 'job': return Briefcase;
      case 'system': return Settings;
      default: return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'event': return 'bg-blue-100 text-blue-800';
      case 'connection': return 'bg-green-100 text-green-800';
      case 'message': return 'bg-purple-100 text-purple-800';
      case 'job': return 'bg-orange-100 text-orange-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const unreadNotifications = notifications.filter(n => !n.isRead);
  const readNotifications = notifications.filter(n => n.isRead);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="h-6 w-6" />
          <div>
            <h1>Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">
            All ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="read">
            Read ({readNotifications.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {notifications.map((notification) => {
            const Icon = getIcon(notification.type);
            return (
              <Card key={notification.id} className={`transition-all ${!notification.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50/50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {notification.avatar ? (
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{notification.avatar}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="p-2 bg-muted rounded-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          <Badge className={getTypeColor(notification.type)}>
                            {notification.type}
                          </Badge>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {!notification.isRead && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {notification.actionable && (
                    <div className="flex gap-2 mt-3">
                      <Button size="sm">Accept</Button>
                      <Button size="sm" variant="outline">Decline</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {unreadNotifications.map((notification) => {
            const Icon = getIcon(notification.type);
            return (
              <Card key={notification.id} className="border-l-4 border-l-blue-500 bg-blue-50/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {notification.avatar ? (
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{notification.avatar}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="p-2 bg-muted rounded-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          <Badge className={getTypeColor(notification.type)}>
                            {notification.type}
                          </Badge>
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {notification.actionable && (
                    <div className="flex gap-2 mt-3">
                      <Button size="sm">Accept</Button>
                      <Button size="sm" variant="outline">Decline</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
          {unreadNotifications.length === 0 && (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No unread notifications</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="read" className="space-y-4">
          {readNotifications.map((notification) => {
            const Icon = getIcon(notification.type);
            return (
              <Card key={notification.id} className="opacity-75">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {notification.avatar ? (
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{notification.avatar}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="p-2 bg-muted rounded-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          <Badge className={getTypeColor(notification.type)}>
                            {notification.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
}