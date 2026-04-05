import { FiSearch } from 'react-icons/fi';

interface FilterBarProps {
  search: string;
  setSearch: (s: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
}

export default function FilterBar({ search, setSearch, statusFilter, setStatusFilter }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <div className="relative w-full sm:w-64">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..." 
          className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition placeholder:text-gray-400"
        />
      </div>

      <div className="flex space-x-2 bg-slate-800 p-1 rounded-lg w-full sm:w-auto">
        {['all', 'pending', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-sm font-medium transition ${
              statusFilter === status 
                ? 'bg-teal-500 text-slate-900 shadow-sm' 
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
