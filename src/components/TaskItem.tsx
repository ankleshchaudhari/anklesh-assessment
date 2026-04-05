import { FiCheckCircle, FiCircle, FiTrash2, FiEdit2, FiX, FiCheck } from 'react-icons/fi';
import { useState } from 'react';

interface TaskItemProps {
  task: any;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => Promise<void>;
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleEditSubmit = async () => {
    if (editTitle.trim() !== '' && editTitle !== task.title) {
      await onEdit(task.id, editTitle);
    } else {
      setEditTitle(task.title);
    }
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl hover:border-slate-600 transition group hover:-translate-y-0.5">
      <div className="flex items-center gap-4 flex-1 overflow-hidden pr-4">
        <button onClick={() => onToggle(task.id)} className="flex-shrink-0 mt-0.5 text-slate-400 hover:text-teal-400 transition cursor-pointer">
          {task.status === 'completed' ? (
            <FiCheckCircle className="text-teal-400" size={24} />
          ) : (
            <FiCircle className="text-slate-500 hover:text-teal-400 transition" size={24} />
          )}
        </button>

        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <input 
              autoFocus
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit()}
              className="flex-1 bg-slate-900 border border-slate-600 px-3 py-1 rounded focus:outline-none focus:border-teal-500"
            />
            <button onClick={handleEditSubmit} className="text-teal-400 p-1 hover:bg-slate-700 rounded"><FiCheck /></button>
            <button onClick={() => setIsEditing(false)} className="text-slate-400 p-1 hover:bg-slate-700 rounded"><FiX /></button>
          </div>
        ) : (
          <span 
            className={`text-lg truncate transition ${task.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-200'}`}
          >
            {task.title}
          </span>
        )}
      </div>

      {!isEditing && (
        <div className="flex gap-2">
          <button onClick={() => setIsEditing(true)} className="text-slate-500 hover:text-blue-400 transition p-2 bg-slate-800/80 rounded-lg shrink-0 opacity-0 group-hover:opacity-100">
            <FiEdit2 size={18} />
          </button>
          <button onClick={() => onDelete(task.id)} className="text-slate-500 hover:text-red-400 transition p-2 bg-slate-800/80 rounded-lg shrink-0 opacity-0 group-hover:opacity-100">
            <FiTrash2 size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
