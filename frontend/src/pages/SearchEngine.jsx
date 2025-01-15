import React, { useState, useEffect, useRef } from 'react';
import { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Alert, AlertDescription } from '../components/ui/Alert';
import { MessageCircle, Search, Settings, Loader2, Key } from 'lucide-react';
import { Bot, User } from 'lucide-react';  // Add icons for robot and user


const API_URL = 'http://localhost:8000/api';

const SearchEngine = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi, I'm a chatbot who can search the ArXiv, Wikipedia and Web for education related assistant. Please submit your Groq API key to start chatting." }
  ]);
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isKeyValidated, setIsKeyValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const validateApiKey = async () => {
    if (!apiKey.trim()) {
      setError('Please enter an API key');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/validate-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: apiKey,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid API key');
      }

      setIsKeyValidated(true);
      setMessages([
        { role: 'assistant', content: "Great! Your API key has been validated. How can I help you today?" }
      ]);
      setError('');
    } catch (err) {
      setError('Failed to validate API key. Please check your key and try again.', err);
      setIsKeyValidated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !isKeyValidated) return;

    const newMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [newMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          api_key:apiKey
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (err) {
      setError('Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const MessageBubble = ({ message }) => (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-center gap-3`}>
        {/* User or Bot Icon */}
        {message.role === 'user' ? (
          <User className="w-6 h-6 text-blue-500" />
        ) : (
          <Bot className="w-6 h-6 text-gray-500" />
        )}
        
        {/* Message Bubble with Box Style */}
        <div className={`max-w-3/4 p-4 rounded-lg border ${
          message.role === 'user' 
            ? 'bg-blue-50 border-blue-500 text-blue-900 ml-12' 
            : 'bg-gray-50 border-gray-300 text-gray-900 mr-12'
        }`}>
          {message.content}
        </div>
      </div>
    </div>
  );
  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-4 border-r">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings size={20} />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter Groq API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={isKeyValidated}
              className="m-0 mb-2"
            />
            <Button 
              onClick={validateApiKey} 
              disabled={isKeyValidated || isLoading}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Key className="w-4 h-4 mr-2" />
              )}
              {isKeyValidated ? 'API Key Validated' : 'Submit API Key'}
            </Button>
            {isKeyValidated && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsKeyValidated(false);
                  setApiKey('');
                }}
                className="w-full"
              >
                Reset API Key
              </Button>
            )}
          </div>
        </CardContent>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b bg-white">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Search className="w-6 h-6" />
                Educational Content Search from Arxiv, WikiPedia and Web
          </h1>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          )}
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What is machine learning?"
              className="flex-1"
              disabled={!isKeyValidated}
            />
            <Button type="submit" disabled={!isKeyValidated || isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <MessageCircle className="w-4 h-4" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchEngine;