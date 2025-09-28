import { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { AlumniPortalSidebar } from "./components/AlumniPortalSidebar";
import { AlumniDashboard } from "./components/AlumniDashboard";
import { AlumniDirectory } from "./components/AlumniDirectory";
import { EventManagement } from "./components/EventManagement";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { ChatBotAssistant } from "./components/ChatBotAssistant";
// Make sure the import matches the component name

function AppContent() {
  const [activeView, setActiveView] = useState("dashboard");

  const handleItemClick = (itemId: string) => {
    if (itemId === "logout") {
      setActiveView("dashboard");
    } else {
      setActiveView(itemId);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <AlumniDashboard />;
      case "directory":
        return <AlumniDirectory />;
      case "events":
        return <EventManagement />;
      case "analytics":
        return <AnalyticsDashboard />;
      default:
        return <AlumniDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background relative">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <AlumniPortalSidebar 
          activeItem={activeView} 
          onItemClick={handleItemClick} 
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>

      {/* ChatBot Floating */}
      <ChatBotAssistant />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
