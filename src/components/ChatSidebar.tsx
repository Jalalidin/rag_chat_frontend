import { useQuery, useMutation } from '@tanstack/react-query';
import { Plus, MessageCircle } from 'lucide-react';
import { chats } from '../lib/api';
import { formatDate } from '../lib/utils';
import { Button } from './ui';

interface ChatSidebarProps {
  onSelectChat: (chatId: number) => void;
  selectedChatId: number | null;
}

export default function ChatSidebar({ onSelectChat, selectedChatId }: ChatSidebarProps) {
  const { data: chatTree, refetch } = useQuery({
    queryKey: ['chat-tree'],
    queryFn: chats.getTree,
  });

  const createChat = useMutation({
    mutationFn: () => chats.create('New Chat'),
    onSuccess: (newChat) => {
      refetch();
      onSelectChat(newChat.id);
    },
  });

  return (
    <div className="w-64 border-r border-[var(--border)] bg-[var(--background)] p-4">
      <Button
        onClick={() => createChat.mutate()}
        variant="primary"
        className="w-full"
      >
        <Plus className="h-5 w-5 mr-2" />
        New Chat
      </Button>

      <div className="mt-4 space-y-2">
        {chatTree?.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
              selectedChatId === chat.id
                ? 'bg-[var(--muted)] text-[var(--foreground)]'
                : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]'
            }`}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            <div className="flex-1 truncate text-left">
              <div className="font-medium">{chat.title}</div>
              <div className="text-xs text-[var(--muted-foreground)]">
                {formatDate(chat.updated_at)}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}