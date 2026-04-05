'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { email, password });
      toast.success('Account created! Please log in.');
      router.push('/login');
    } catch {
      toast.error('Registration failed. Try a different email or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md p-8 bg-slate-800 rounded-2xl shadow-xl border border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
        <h2 className="text-3xl font-bold mb-2 text-white">Create Account</h2>
        <p className="text-slate-400 mb-8">Get securely started with managing tasks.</p>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required 
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-500 hover:bg-blue-400 text-slate-900 font-bold rounded-xl transition shadow-lg shadow-blue-500/20 mt-4">
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-slate-400 text-sm">
          Already have an account? <Link href="/login" className="text-blue-400 hover:text-blue-300 transition">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
