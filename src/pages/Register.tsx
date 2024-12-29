import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { auth } from '../lib/api';
import { Button, Input } from '../components/ui';
import { UserPlus } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await auth.register(username, password);
      toast.success('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed. Username might be taken.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="max-w-md w-full p-6 bg-[var(--muted)] rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <UserPlus className="mx-auto h-12 w-12 text-[var(--primary)]" />
          <h2 className="mt-4 text-3xl font-bold text-[var(--foreground)]">
            Create your account
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
            Sign up
          </Button>
          <div className="text-center text-sm text-[var(--muted-foreground)]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[var(--primary)] hover:underline"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}