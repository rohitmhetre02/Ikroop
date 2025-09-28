import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { LayoutDashboard, Users, Calendar, ChartBar as BarChart3, MessageSquare, Settings, Bell, User, LogIn, GraduationCap, Briefcase } from "lucide-react";
import { SignInDialog } from "./SignInDialog";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  active?: boolean;
}

const mainNavItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    active: true
  },
  {
    id: "directory",
    label: "Alumni Directory",
    icon: Users
  },
  {
    id: "events",
    label: "Events",
    icon: Calendar,
    badge: "3"
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3
  },
  {
    id: "messages",
    label: "Messages",
    icon: MessageSquare,
    badge: "3"
  }
];

const quickAccessItems: SidebarItem[] = [
  {
    id: "career",
    label: "Career Center", 
    icon: Briefcase
  },
  {
    id: "mentorship",
    label: "Mentorship",
    icon: GraduationCap
  }
];

interface AlumniPortalSidebarProps {
  activeItem: string;
  onItemClick: (itemId: string) => void;
}

export function AlumniPortalSidebar({ activeItem, onItemClick }: AlumniPortalSidebarProps) {
  const [showSignInDialog, setShowSignInDialog] = useState(false);

  return (
    <div className="flex flex-col h-full bg-card border-r">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold">Alumni Portal</h2>
            <p className="text-sm text-muted-foreground">University Network</p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="px-6 pb-4">
        <div className="p-3 bg-muted rounded-lg text-center">
          <p className="text-sm text-muted-foreground mb-2">Demo Mode</p>
          <Button 
            size="sm" 
            onClick={() => setShowSignInDialog(true)}
            className="w-full"
            variant="outline"
          >
            <LogIn className="h-4 w-4 mr-2" />
            Sign In Demo
          </Button>
        </div>
      </div>

      <Separator />

      {/* Main Navigation */}
      <div className="flex-1 px-4 py-4">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 pb-2">
            Main
          </p>
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => onItemClick(item.id)}
              >
                <Icon className="h-4 w-4 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge 
                    variant={isActive ? "secondary" : "default"} 
                    className="ml-auto text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 pb-2">
            Quick Access
          </p>
          {quickAccessItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => onItemClick(item.id)}
              >
                <Icon className="h-4 w-4 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge 
                    variant={isActive ? "secondary" : "default"} 
                    className="ml-auto text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Bottom Actions */}
      <div className="p-4 space-y-1">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => onItemClick("notifications")}
        >
          <Bell className="h-4 w-4 mr-3" />
          Notifications
          <Badge variant="destructive" className="ml-auto text-xs">
            5
          </Badge>
        </Button>
        
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => onItemClick("profile")}
        >
          <User className="h-4 w-4 mr-3" />
          Profile
        </Button>
        
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => onItemClick("settings")}
        >
          <Settings className="h-4 w-4 mr-3" />
          Settings
        </Button>
      </div>

      <SignInDialog 
        open={showSignInDialog} 
        onOpenChange={setShowSignInDialog} 
      />
    </div>
  );
}