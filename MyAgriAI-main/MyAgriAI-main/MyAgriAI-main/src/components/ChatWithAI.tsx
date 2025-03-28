
import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { generateGeminiResponse } from '@/services/geminiService';
import { useToast } from "@/hooks/use-toast";
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  imageUrl?: string;
}

interface ChatWithAIProps {
  initialQuestion?: string;
}

export default function ChatWithAI({ initialQuestion }: ChatWithAIProps) {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: t('chat.welcomeMessage'),
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const location = useLocation();
  const { toast } = useToast();
  
  // Handle initial question from props (passed from CropAnalysis)
  useEffect(() => {
    if (initialQuestion) {
      setInput(initialQuestion);
      // Optional: automatically send the question
      handleSend(initialQuestion);
    }
  }, [initialQuestion]);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSend = async (overrideInput?: string) => {
    const messageToSend = overrideInput || input;
    if (!messageToSend.trim() && !selectedImage) return;
    
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: messageToSend,
      timestamp: new Date(),
      imageUrl: imagePreview || undefined
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      // Get AI response from Gemini
      const response = await generateGeminiResponse({
        prompt: messageToSend || "Analyze this farming image and provide insights.",
        image: selectedImage
      });
      
      // Add AI response
      const newAiMessage: Message = {
        role: 'ai',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAiMessage]);
      
      // Clear the image after sending
      setSelectedImage(null);
      setImagePreview(null);
    } catch (error) {
      toast({
        title: t('chat.error'),
        description: t('chat.errorDesc'),
        variant: "destructive"
      });
      console.error("Error getting AI response:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: t('chat.fileTooLarge'),
          description: t('chat.fileTooLargeDesc'),
          variant: "destructive"
        });
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: t('chat.invalidFileType'),
          description: t('chat.invalidFileTypeDesc'),
          variant: "destructive"
        });
        return;
      }
      
      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      toast({
        title: t('chat.imageSelected'),
        description: t('chat.imageSelectedDesc'),
      });
    }
  };
  
  const removeSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <Card className="w-full max-w-4xl h-[80vh] flex flex-col glass-morphism">
      <CardHeader className="space-y-1">
        <div className="subtle-chip">{t('chat.subtitle')}</div>
        <CardTitle className="text-2xl">{t('chat.title')}</CardTitle>
        <CardDescription>{t('chat.description')}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto pr-2">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div 
              key={i}
              className={cn(
                "flex gap-3 max-w-[85%]",
                message.role === 'user' ? "ml-auto" : ""
              )}
            >
              {message.role === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              
              <div 
                className={cn(
                  "rounded-2xl p-4",
                  message.role === 'user' 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary"
                )}
              >
                {message.imageUrl && (
                  <div className="mb-3">
                    <img 
                      src={message.imageUrl} 
                      alt="Uploaded" 
                      className="max-h-64 rounded-lg object-contain"
                    />
                  </div>
                )}
                <div className="text-sm mb-1 whitespace-pre-wrap">{message.content}</div>
                <div className={cn(
                  "text-xs",
                  message.role === 'user' 
                    ? "text-primary-foreground/70" 
                    : "text-muted-foreground"
                )}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
              
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="rounded-2xl p-4 bg-secondary">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        {imagePreview && (
          <div className="mb-3 relative inline-block">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="h-16 rounded-lg object-contain"
            />
            <Button 
              variant="destructive" 
              size="icon" 
              className="h-6 w-6 absolute top-0 right-0 -mt-2 -mr-2 rounded-full"
              onClick={removeSelectedImage}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
        <div className="flex w-full gap-2 items-center">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleImageClick}
            disabled={loading}
            className="flex-shrink-0"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          <Input
            placeholder={t('chat.placeholder')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className="flex-grow"
          />
          <Button onClick={() => handleSend()} disabled={(!input.trim() && !selectedImage) || loading} size="icon" className="flex-shrink-0">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
