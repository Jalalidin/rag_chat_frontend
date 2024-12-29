import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ThemeProvider from './components/ThemeProvider';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Documents from './pages/Documents';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import RequireAuth from './components/RequireAuth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<RequireAuth />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Chat />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster 
          position="top-right"
          toastOptions={{
            className: 'dark:bg-dark-800 dark:text-white',
            style: {
              background: 'rgb(56, 56, 56)',
              color: '#fff',
            },
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;