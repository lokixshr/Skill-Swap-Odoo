import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, getDocs, where, setDoc, doc, limit } from "firebase/firestore";
import { Loader2, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const getChatId = (uid1: string, uid2: string) => [uid1, uid2].sort().join("_");

// Bot responses
const botResponses = [
  "That's interesting! Tell me more about that.",
  "I'd love to help you with that!",
  "Great question! Let me think about that.",
  "Thanks for sharing! I'm here to help.",
  "That sounds exciting! How can I assist you?",
  "I'm always happy to chat and help out!",
  "What a great topic! I'd be happy to discuss this further.",
  "Thanks for reaching out! I'm here to support you.",
  "That's fascinating! I'd love to learn more.",
  "I appreciate you sharing this with me!"
];

const getRandomBotResponse = () => {
  return botResponses[Math.floor(Math.random() * botResponses.length)];
};

const Messages = () => {
  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  // Load conversations list
  useEffect(() => {
    if (!currentUser) return;
    
    const loadConversations = async () => {
      try {
        // Get all chats where current user is involved
        const chatsQuery = query(
          collection(db, "chats"),
          where("participants", "array-contains", currentUser.uid)
        );
        
        const chatsSnapshot = await getDocs(chatsQuery);
        const conversationsData = [];
        
        for (const chatDoc of chatsSnapshot.docs) {
          const chatData = chatDoc.data();
          const otherUserId = chatData.participants.find((id: string) => id !== currentUser.uid);
          
          if (otherUserId) {
            // Get user data
            const userDoc = await getDocs(query(collection(db, "users"), where("uid", "==", otherUserId)));
            const userData = userDoc.docs[0]?.data() || { name: "Unknown User" };
            
            // Get last message
            const messagesQuery = query(
              collection(db, "chats", chatDoc.id, "messages"),
              orderBy("createdAt", "desc"),
              limit(1)
            );
            const lastMessageSnapshot = await getDocs(messagesQuery);
            const lastMessage = lastMessageSnapshot.docs[0]?.data();
            
            conversationsData.push({
              chatId: chatDoc.id,
              userId: otherUserId,
              userName: userData.name || "Unknown User",
              lastMessage: lastMessage?.text || "No messages yet",
              lastMessageTime: lastMessage?.createdAt?.toDate?.() || new Date(),
              avatar: userData.avatar || `https://ui-avatars.com/api/?name=${userData.name}&background=random`
            });
          }
        }
        
        setConversations(conversationsData.sort((a, b) => b.lastMessageTime - a.lastMessageTime));
      } catch (error) {
        console.error("Error loading conversations:", error);
      }
    };
    
    loadConversations();
  }, [currentUser]);

  // Load messages for specific conversation
  useEffect(() => {
    if (!currentUser || !userId) return;
    setLoading(true);
    
    const chatId = getChatId(currentUser.uid, userId);
    const q = query(collection(db, "chats", chatId, "messages"), orderBy("createdAt"));
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    });
    return () => unsub();
  }, [currentUser, userId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !currentUser || !userId) return;
    
    const chatId = getChatId(currentUser.uid, userId);
    
    // Send user message
    await addDoc(collection(db, "chats", chatId, "messages"), {
      text: input,
      sender: currentUser.uid,
      receiver: userId,
      createdAt: serverTimestamp(),
    });
    
    // Create or update chat document
    await setDoc(doc(db, "chats", chatId), {
      participants: [currentUser.uid, userId],
      lastMessage: input,
      lastMessageTime: serverTimestamp(),
    }, { merge: true });
    
    setInput("");
    
    // Bot auto-reply after 1-3 seconds
    setTimeout(async () => {
      const botResponse = getRandomBotResponse();
      await addDoc(collection(db, "chats", chatId, "messages"), {
        text: botResponse,
        sender: "bot",
        receiver: currentUser.uid,
        createdAt: serverTimestamp(),
      });
    }, Math.random() * 2000 + 1000);
  };

  const startNewConversation = async (targetUserId: string) => {
    if (!currentUser) return;
    
    const chatId = getChatId(currentUser.uid, targetUserId);
    
    // Create chat document
    await setDoc(doc(db, "chats", chatId), {
      participants: [currentUser.uid, targetUserId],
      createdAt: serverTimestamp(),
    }, { merge: true });
    
    // Send initial bot message
    setTimeout(async () => {
      await addDoc(collection(db, "chats", chatId, "messages"), {
        text: "Hello! I'm your SkillSwap assistant. How can I help you today?",
        sender: "bot",
        receiver: currentUser.uid,
        createdAt: serverTimestamp(),
      });
    }, 1000);
  };

  const handleStartBotChat = async () => {
    await startNewConversation("bot");
    navigate("/messages/bot");
  };

  if (!currentUser) return <div className="flex items-center justify-center min-h-screen">Sign in to chat.</div>;

  // Show conversations list if no specific user is selected
  if (!userId) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Messages</h1>
          <p className="text-lg text-muted-foreground">
            Chat with other users and get help from our AI assistant
          </p>
        </div>

        <div className="grid gap-4">
          {conversations.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No conversations yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start chatting with other users or our AI assistant
                </p>
                <Button onClick={handleStartBotChat}>
                  Start Chat with AI Assistant
                </Button>
              </CardContent>
            </Card>
          ) : (
            conversations.map((conversation) => (
              <Link key={conversation.chatId} to={`/messages/${conversation.userId}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>{conversation.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{conversation.userName}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {conversation.lastMessageTime.toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    );
  }

  // Show specific conversation
  if (loading) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>;

  return (
    <div className="flex flex-col h-screen bg-muted">
      <div className="w-full max-w-4xl mx-auto bg-background rounded-lg shadow-card flex flex-col h-full">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Chat</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.length === 0 && (
            <div className="text-muted-foreground text-center py-8">
              No messages yet. Start the conversation!
            </div>
          )}
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === currentUser.uid ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-4 py-2 rounded-lg max-w-xs ${msg.sender === currentUser.uid ? 'bg-primary text-primary-foreground' : msg.sender === 'bot' ? 'bg-green-100 text-green-900' : 'bg-muted text-foreground'}`}>
                {msg.text}
                <div className="text-xs text-muted-foreground mt-1 text-right">
                  {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleString() : ''}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={sendMessage} className="p-4 border-t flex gap-2">
          <Input
            className="flex-1"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Messages; 