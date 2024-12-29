import React from 'react';
import ReactMarkdown from 'react-markdown';
import { formatDistanceToNow } from 'date-fns';
import { User, Bot, FileText } from 'lucide-react';

export interface ChatMessageType {
  id: number;
  message: string;
  response: string | null;
  source_documents?: any[];
  created_at: string;
  user_id: number;
  chat_session_id: number;
}

export interface ChatMessageProps {
  message: ChatMessageType;
  showSourceDocuments?: boolean;
}

export default function ChatMessage({ message, showSourceDocuments = false }: ChatMessageProps) {
  return (
    <div className="space-y-4">
      {/* User Message */}
      <div className="chat-message user-message">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center">
            <User className="w-5 h-5 text-[var(--primary-foreground)]" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="font-medium">You</div>
              <div className="text-sm text-[var(--muted-foreground)]">
                {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
              </div>
            </div>
            <div className="prose prose-invert max-w-none">
              {message.message}
            </div>
          </div>
        </div>
      </div>

      {/* AI Response */}
      {message.response && (
        <div className="chat-message assistant-message">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-[var(--primary-foreground)]" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="font-medium">AI Assistant</div>
              </div>
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>{message.response}</ReactMarkdown>
              </div>

              {/* Source Documents */}
              {showSourceDocuments && message.source_documents && message.source_documents.length > 0 && (
                <div className="mt-4 border-t border-[var(--border)] pt-4">
                  <div className="text-sm font-medium text-[var(--muted-foreground)] mb-2">Sources:</div>
                  <div className="space-y-2">
                    {message.source_documents.map((doc, index) => (
                      <div 
                        key={index} 
                        className="flex items-center space-x-2 text-sm p-2 rounded-md bg-[var(--background)] border border-[var(--border)]"
                      >
                        <FileText className="w-4 h-4 text-[var(--muted-foreground)]" />
                        <span className="text-[var(--foreground)]">{doc.title || doc.filename}</span>
                        {doc.page && (
                          <span className="text-[var(--muted-foreground)]">Page {doc.page}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}