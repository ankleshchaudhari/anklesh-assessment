import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: any[];
  isLoading: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => Promise<void>;
  onLoadMore: () => void;
  hasMore: boolean;
}

export default function TaskList({ tasks, isLoading, onToggle, onDelete, onEdit, onLoadMore, hasMore }: TaskListProps) {
  if (isLoading && tasks.length === 0) {
    return (
      <div className="space-y-3 mt-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse flex items-center p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl h-16">
            <div className="w-6 h-6 rounded-full bg-slate-700/50 mr-4"></div>
            <div className="h-4 bg-slate-700/50 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center p-12 border-2 border-dashed border-slate-700/50 rounded-2xl text-slate-500 mt-4">
        No tasks found.
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </div>
      
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onLoadMore}
            disabled={isLoading}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 border border-slate-700 rounded-full text-sm font-medium transition"
          >
            {isLoading ? 'Loading...' : 'Load More Results'}
          </button>
        </div>
      )}
    </div>
  );
}
