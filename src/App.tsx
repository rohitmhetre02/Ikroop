import { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { AlumniPortalSidebar } from "./components/AlumniPortalSidebar";
import { AlumniDashboard } from "./components/AlumniDashboard";
import { AlumniDirectory } from "./components/AlumniDirectory";
import { EventManagement } from "./components/EventManagement";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { ProfileView } from "./components/ProfileView";
import { NotificationsView } from "./components/NotificationsView";
import { SettingsView } from "./components/SettingsView";
import { CareerCenterView } from "./components/CareerCenterView";
import MentorshipView from "./components/MentorshipView";
import { MessagesView } from "./components/MessagesView";
import { ChatBotAssistant } from "./components/ChatBotAssistant";


function AppContent() {
  const [activeView, setActiveView] = useState("dashboard");

  const handleItemClick = (itemId: string) => {
    // Decorative logout logic
    setActiveView(itemId === "logout" ? "dashboard" : itemId);
  };

  const renderContent = () => {
    switch (activeView) {
      case "dashboard": return <AlumniDashboard />;
      case "directory": return <AlumniDirectory />;
      case "events": return <EventManagement />;
      case "analytics": return <AnalyticsDashboard />;
      case "profile": return <ProfileView />;
      case "notifications": return <NotificationsView />;
      case "settings": return <SettingsView />;
      case "career": return <CareerCenterView />;
      case "mentorship": return <MentorshipView />;
      case "messages": return <MessagesView />;
      default: return <AlumniDashboard />;
    }
  };

  return (
    <>
      <div className="flex h-screen bg-background relative">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <AlumniPortalSidebar activeItem={activeView} onItemClick={handleItemClick} />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8 overflow-x-auto">
            {renderContent()}
          </div>
        </div>

        {/* Chat Bot Assistant */}
        <ChatBotAssistant />
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
