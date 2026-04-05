import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

interface TaskFormProps {
  onAdd: (title: string, description?: string) => Promise<void>;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onAdd(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-8 w-full">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm placeholder:text-slate-500"
      />
      <button type="submit" disabled={!title.trim()} className="px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20">
        <FiPlus size={20} /> Add
      </button>
    </form>
  );
}
