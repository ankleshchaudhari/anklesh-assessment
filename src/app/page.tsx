'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { taskService } from '@/services/taskService';
import TaskForm from '@/components/TaskForm';
import FilterBar from '@/components/FilterBar';
import TaskList from '@/components/TaskList';
import { FiLogOut } from 'react-icons/fi';

export default function Dashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Debounce search state
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadTasks = useCallback(async (pageNum: number, isLoadingMore = false) => {
    setIsLoading(true);
    try {
      const response = await taskService.getTasks(pageNum, 10, statusFilter, debouncedSearch);
      
      if (isLoadingMore) {
        setTasks(prev => [...prev, ...response.data]);
      } else {
        setTasks(response.data);
      }
      
      setHasMore(pageNum < response.meta.totalPages);
    } catch (err: any) {
      if (err?.response?.status === 401) {
        localStorage.removeItem('accessToken');
        router.push('/login');
      } else {
        toast.error('Failed to load tasks');
      }
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, debouncedSearch, router]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/login');
    } else {
      setPage(1);
      loadTasks(1);
    }
  }, [loadTasks, router]);

  const handleCreateTask = async (title: string, description?: string) => {
    try {
      const newTask = await taskService.createTask(title, description);
      setTasks([newTask, ...tasks]);
      toast.success('Task added');
    } catch {
      toast.error('Failed to create task');
    }
  };

  const handleToggleTask = async (id: string) => {
    // Optimistic update
    const currentTask = tasks.find(t => t.id === id);
    if (!currentTask) return;
    
    setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t));
    
    try {
      await taskService.toggleTaskStatus(id);
    } catch {
      // Revert optimistic update
      setTasks(tasks.map(t => t.id === id ? { ...t, status: currentTask.status } : t));
      toast.error('Could not toggle task');
    }
  };

  const handleEditTask = async (id: string, title: string) => {
    try {
       await taskService.updateTask(id, title);
       setTasks(tasks.map(t => t.id === id ? { ...t, title } : t));
       toast.success('Task updated');
    } catch {
       toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
      toast.success('Task deleted');
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadTasks(nextPage, true);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/login');
  };

  return (
    <main className="max-w-3xl mx-auto p-6 pt-16">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          My Tasks
        </h1>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 transition rounded-lg text-sm font-medium">
          <FiLogOut className='text-gray-400'/> <span className='text-gray-400'>Log out</span>
        </button>
      </div>

      <TaskForm onAdd={handleCreateTask} />
      
      <FilterBar 
        search={searchQuery}
        setSearch={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <TaskList 
        tasks={tasks}
        isLoading={isLoading}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
      />
    </main>
  );
}