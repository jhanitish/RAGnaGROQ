import { Bot, User } from 'lucide-react';

const MessageBubble = ({ message }) => (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        {message.role === 'user' ? (
          <User className="w-6 h-6 text-blue-500" />
        ) : (
          <Bot className="w-6 h-6 text-purple-500" />
        )}
        <div className={`p-4 rounded-lg border whitespace-pre-wrap w-3/4 ${
          message.role === 'user' 
            ? 'bg-blue-50 border-blue-200 text-blue-900' 
            : 'bg-purple-50 border-purple-200 text-purple-900'
        }`}>
          {message.content}
        </div>
      </div>
    </div>
  );

  export default MessageBubble;