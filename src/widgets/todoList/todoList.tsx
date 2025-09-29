import { useState } from 'react';
import styles from './TodoList.module.scss'
import { TodoItem } from '../../shared/ui/todoItem/todoItem';

export type Task = {
  id: number;
  task: string;
  completed: boolean;
};

type TodoListProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export const TodoList = ({ tasks, setTasks }: TodoListProps) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }
  
  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

   const saveTask = (id: number, newText: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, task: newText } : task
      )
    );
    setEditingTaskId(null);
  };

    return (
      <section className={styles.container}>
      <div className={styles.taskBlock}>
        <h3>Все задачи: {tasks.length}</h3>
      </div>
      <div className={styles.taskContainer}>
      {tasks.map(task => (
       <TodoItem
       key={task.id}
       task={task.task}
       completed={task.completed}
       isEditing={editingTaskId === task.id}
       onToggle={() => toggleTask(task.id)}
       onEdit={() => setEditingTaskId(task.id)}
       onDelete={() => deleteTask(task.id)}
       onSave={(newText: string) => saveTask(task.id, newText)}
       onCancel={() => setEditingTaskId(null)}
     />
      ))}
       </div>
      </section>
      );
    };