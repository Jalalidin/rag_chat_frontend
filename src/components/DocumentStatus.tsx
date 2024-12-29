import { CheckCircle, AlertCircle, Clock, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

type DocumentStatus = 'queued' | 'processing' | 'completed' | 'failed';

interface DocumentStatusProps {
  status: DocumentStatus;
  errorMessage?: string | null;
}

export default function DocumentStatus({ status, errorMessage }: DocumentStatusProps) {
  const statusConfig = {
    queued: {
      icon: Clock,
      text: 'Queued',
      className: 'text-gray-500',
    },
    processing: {
      icon: Loader2,
      text: 'Processing',
      className: 'text-blue-500',
    },
    completed: {
      icon: CheckCircle,
      text: 'Completed',
      className: 'text-green-500',
    },
    failed: {
      icon: AlertCircle,
      text: 'Failed',
      className: 'text-red-500',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex items-center">
      <Icon className={cn('h-5 w-5 mr-2', config.className)} />
      <span className={cn('text-sm', config.className)}>
        {config.text}
        {status === 'failed' && errorMessage && (
          <span className="ml-2 text-xs text-red-600">{errorMessage}</span>
        )}
      </span>
    </div>
  );
}