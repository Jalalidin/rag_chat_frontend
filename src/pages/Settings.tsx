import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { llmConfigs } from '../lib/api';
import LLMConfigForm from '../components/LLMConfigForm';
import { LLMConfig } from '../lib/types';

export default function Settings() {
  const { data: configs, refetch } = useQuery({
    queryKey: ['llm-configs'],
    queryFn: llmConfigs.list,
  });

  const { data: defaultConfig } = useQuery({
    queryKey: ['default-llm-config'],
    queryFn: llmConfigs.getDefault,
  });

  const createConfig = useMutation({
    mutationFn: llmConfigs.create,
    onSuccess: () => {
      toast.success('Configuration created successfully');
      refetch();
    },
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-8">
        Settings
      </h1>

      <div className="bg-[var(--muted)] rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-medium text-[var(--foreground)] mb-4">
          LLM Configuration
        </h2>
        <LLMConfigForm onSubmit={(data) => createConfig.mutate(data)} />
      </div>

      {configs && configs.length > 0 && (
        <div className="mt-8 bg-[var(--muted)] rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-medium text-[var(--foreground)] mb-4">
            Existing Configurations
          </h2>
          <div className="space-y-4">
            {configs.map((config: LLMConfig) => (
              <div
                key={config.id}
                className="border border-[var(--border)] rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium text-[var(--foreground)]">
                    {config.model_name}
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {config.model_type}
                  </p>
                </div>
                {defaultConfig?.id === config.id && (
                  <span className="text-sm text-green-500 font-medium">
                    Default
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}