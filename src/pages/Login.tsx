import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { auth } from '../lib/api';
import { Button, Input } from '../components/ui';
import { KeyRound } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { access_token } = await auth.login(username, password);
      localStorage.setItem('token', access_token);
      navigate('/');
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="max-w-md w-full p-6 bg-[var(--muted)] rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <KeyRound className="mx-auto h-12 w-12 text-[var(--primary)]" />
          <h2 className="mt-4 text-3xl font-bold text-[var(--foreground)]">
            Sign in to RAG Chat
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Button type="submit" variant="primary" className="w-full">
            Sign in
          </Button>
          <div className="text-center text-sm text-[var(--muted-foreground)]">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-[var(--primary)] hover:underline"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}