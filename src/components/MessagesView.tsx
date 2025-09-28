import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Search, MessageSquare, Send, User, Clock } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  senderPosition?: string;
  senderCompany?: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  participantPosition?: string;
  participantCompany?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
}

export function MessagesView() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock conversations data
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      participantId: '1',
      participantName: 'John Doe',
      participantAvatar: '',
      participantPosition: 'Software Engineer',
      participantCompany: 'Google',
      lastMessage: 'Thanks for connecting! Would love to discuss career opportunities.',
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      unreadCount: 2,
      messages: [
        {
          id: '1',
          senderId: '1',
          senderName: 'John Doe',
          content: 'Hi! Thanks for accepting my connection request.',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          isRead: true
        },
        {
          id: '2',
          senderId: 'me',
          senderName: 'You',
          content: 'Great to connect with you too!',
          timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
          isRead: true
        },
        {
          id: '3',
          senderId: '1',
          senderName: 'John Doe',
          content: 'Thanks for connecting! Would love to discuss career opportunities.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          isRead: false
        }
      ]
    },
    {
      id: '2',
      participantId: '2',
      participantName: 'Jane Smith',
      participantAvatar: '',
      participantPosition: 'Marketing Manager',
      participantCompany: 'HubSpot',
      lastMessage: 'The networking event was great! Let\'s stay in touch.',
      lastMessageTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      unreadCount: 0,
      messages: [
        {
          id: '4',
          senderId: '2',
          senderName: 'Jane Smith',
          content: 'Nice meeting you at the alumni event!',
          timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000),
          isRead: true
        },
        {
          id: '5',
          senderId: 'me',
          senderName: 'You',
          content: 'Likewise! Your presentation was very insightful.',
          timestamp: new Date(Date.now() - 24.5 * 60 * 60 * 1000),
          isRead: true
        },
        {
          id: '6',
          senderId: '2',
          senderName: 'Jane Smith',
          content: 'The networking event was great! Let\'s stay in touch.',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          isRead: true
        }
      ]
    },
    {
      id: '3',
      participantId: '3',
      participantName: 'Mike Johnson',
      participantAvatar: '',
      participantPosition: 'Investment Analyst',
      participantCompany: 'Goldman Sachs',
      lastMessage: 'I can help you with the finance industry insights you requested.',
      lastMessageTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      unreadCount: 1,
      messages: [
        {
          id: '7',
          senderId: '3',
          senderName: 'Mike Johnson',
          content: 'I can help you with the finance industry insights you requested.',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          isRead: false
        }
      ]
    }
  ]);

  const filteredConversations = conversations.filter(conv =>
    conv.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.participantCompany?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUnreadMessages = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // In a real app, this would send the message to the backend
    console.log('Sending message:', newMessage);
    setNewMessage("");
  };

  const handleViewProfile = (participant: any) => {
    setSelectedProfile({
      name: participant.participantName,
      position: participant.participantPosition,
      company: participant.participantCompany,
      avatar: participant.participantAvatar
    });
    setShowProfile(true);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Messages</h1>
          <p className="text-muted-foreground">
            {totalUnreadMessages > 0 
              ? `You have ${totalUnreadMessages} unread message${totalUnreadMessages > 1 ? 's' : ''}`
              : 'All messages are read'
            }
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Conversations
              </CardTitle>
              <div className="relative">
               
                <Input
                  placeholder=" Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                /> 
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                <div className="space-y-1 p-4">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedConversation?.id === conversation.id
                          ? 'bg-accent'
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.participantAvatar} />
                          <AvatarFallback>
                            {conversation.participantName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium truncate">{conversation.participantName}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">
                                {formatTime(conversation.lastMessageTime)}
                              </span>
                              {conversation.unreadCount > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  {conversation.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {conversation.participantPosition} at {conversation.participantCompany}
                          </p>
                          <p className="text-sm text-muted-foreground truncate mt-1">
                            {conversation.lastMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            {selectedConversation ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedConversation.participantAvatar} />
                        <AvatarFallback>
                          {selectedConversation.participantName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{selectedConversation.participantName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedConversation.participantPosition} at {selectedConversation.participantCompany}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewProfile(selectedConversation)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <ScrollArea className="h-[350px] p-4">
                    <div className="space-y-4">
                      {selectedConversation.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] p-3 rounded-lg ${
                              message.senderId === 'me'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="h-3 w-3 opacity-70" />
                              <span className="text-xs opacity-70">
                                {formatTime(message.timestamp)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="border-t p-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>

      {/* Profile Dialog */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alumni Profile</DialogTitle>
            <DialogDescription>
              Profile information for this alumni
            </DialogDescription>
          </DialogHeader>
          
          {selectedProfile && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedProfile.avatar} />
                  <AvatarFallback className="text-lg">
                    {selectedProfile.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedProfile.name}</h3>
                  <p className="text-muted-foreground">{selectedProfile.position}</p>
                  <p className="text-sm text-muted-foreground">{selectedProfile.company}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <User className="h-4 w-4 mr-2" />
                  View Full Profile
                </Button>
                <Button variant="outline" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Continue Chat
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}