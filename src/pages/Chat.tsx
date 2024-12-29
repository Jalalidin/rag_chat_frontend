import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Send, Plus, MessageCircle } from 'lucide-react';
import { chats } from '../lib/api';
import ChatMessage from '../components/ChatMessage';
import ChatSidebar from '../components/ChatSidebar';
import { Button, Input } from '../components/ui';

interface ChatMessageType {
  id: number;
  message: string;
  response: string | null;
  source_documents?: any[];
  created_at: string;
  user_id: number;
  chat_session_id: number;
}

interface StreamingMessageData {
  content: string;
}

export default function Chat() {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [streamingMessage, setStreamingMessage] = useState('');
  const queryClient = useQueryClient();

  const { data: chatHistory } = useQuery<ChatMessageType[]>({
    queryKey: ['chat-history', selectedChatId],
    queryFn: () => selectedChatId ? chats.getHistory(selectedChatId) : null,
    enabled: !!selectedChatId,
    refetchInterval: 5000,
  });

  const sendMessage = useMutation({
    mutationFn: () => {
      if (!selectedChatId) {
        throw new Error('No chat selected');
      }
      return chats.sendMessage(selectedChatId, message);
    },
    onMutate: () => {
      setMessage('');
    },
    onSuccess: (data) => {
      const reader = data.body?.getReader();
      if (reader) {
        const decoder = new TextDecoder();
        const read = (): Promise<void> => {
          return reader.read().then(({ done, value }) => {
            if (done) {
              setStreamingMessage('');
              queryClient.invalidateQueries({ queryKey: ['chat-history', selectedChatId] });
              return;
            }
            const chunk = decoder.decode(value);
            const json = JSON.parse(chunk) as StreamingMessageData;
            setStreamingMessage((prev) => prev + json.content);
            return read();
          });
        };
        read();
      }
    },
    onError: () => {
      setStreamingMessage('');
    },
  });

  useEffect(() => {
    setStreamingMessage('');
  }, [selectedChatId]);

  return (
    <div className="flex h-screen bg-[var(--background)]">
      <ChatSidebar
        onSelectChat={setSelectedChatId}
        selectedChatId={selectedChatId}
      />

      <div className="flex-1 flex flex-col">
        {!selectedChatId ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <MessageCircle className="mx-auto h-12 w-12 text-[var(--primary)]" />
              <h2 className="text-2xl font-semibold text-[var(--foreground)]">
                Welcome to RAG Chat
              </h2>
              <p className="text-[var(--muted-foreground)]">
                Select a chat or create a new one to get started
              </p>
              <Button
                onClick={() => setSelectedChatId(null)}
                variant="primary"
                className="mx-auto"
              >
                <Plus className="h-5 w-5 mr-2" />
                New Chat
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {chatHistory?.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  showSourceDocuments={true}
                />
              ))}
              {streamingMessage && (
                <div className="chat-message assistant-message">
                  <div className="prose prose-invert max-w-none">
                    {streamingMessage}
                    <span className="ml-1 animate-pulse">▊</span>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-[var(--border)]">
              <form
                onSubmit={(e: React.FormEvent) => {
                  e.preventDefault();
                  sendMessage.mutate();
                }}
                className="relative max-w-3xl mx-auto"
              >
                <Input
                  type="text"
                  value={message}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMessage(e.target.value)
                  }
                  placeholder="Send a message..."
                  className="pr-12"
                  disabled={!!streamingMessage}
                />
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!message.trim() || !!streamingMessage}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}