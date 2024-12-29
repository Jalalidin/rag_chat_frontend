import { useState } from 'react';

interface LLMConfigFormProps {
  onSubmit: (data: {
    model_name: string;
    model_type: string;
    api_key?: string;
    base_url?: string;
  }) => void;
}

export default function LLMConfigForm({ onSubmit }: LLMConfigFormProps) {
  const [modelName, setModelName] = useState('');
  const [modelType, setModelType] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      model_name: modelName,
      model_type: modelType,
      api_key: apiKey || undefined,
      base_url: baseUrl || undefined,
    });
    setModelName('');
    setModelType('');
    setApiKey('');
    setBaseUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="modelName" className="block text-sm font-medium text-gray-700">
          Model Name
        </label>
        <input
          id="modelName"
          type="text"
          required
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="e.g., gpt-4-turbo"
        />
      </div>

      <div>
        <label htmlFor="modelType" className="block text-sm font-medium text-gray-700">
          Model Type
        </label>
        <select
          id="modelType"
          required
          value={modelType}
          onChange={(e) => setModelType(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select a type</option>
          <option value="openai">OpenAI</option>
          <option value="gemini">Gemini</option>
          <option value="mistral">Mistral</option>
        </select>
      </div>

      <div>
        <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
          API Key
        </label>
        <input
          id="apiKey"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Optional"
        />
      </div>

      <div>
        <label htmlFor="baseUrl" className="block text-sm font-medium text-gray-700">
          Base URL
        </label>
        <input
          id="baseUrl"
          type="text"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Optional"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Create Configuration
      </button>
    </form>
  );
}