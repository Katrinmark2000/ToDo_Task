import styles from './app.module.scss';
import { AppHeader } from '../widgets/header/header';
import { FilterBar } from '../widgets/filterBar/filterBar';
import { useEffect, useState} from 'react';
import { TodoList } from '../widgets/todoList/todoList';
import type {Task} from '../widgets/todoList/todoList'
  
const App = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, task: 'Пример задачки', completed: false },
      { id: 2, task: 'Выполненная задача', completed: true },
    ];
  });

  const [selectedButton, setSelectedButton] = useState('all');
  const onSelectButton = (btn: string) => {
    setSelectedButton(btn);
  };

  const addTask = (taskText: string) => {
    const newTask: Task = {
      id: Date.now(),
      task: taskText,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const filteredTasks = tasks.filter((task) => {
    if (selectedButton === "done") return task.completed;
    if (selectedButton === "active") return !task.completed;
    return true;
  });

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.completed).length;

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Твои дела в порядке 😎</h1>
      <AppHeader onAdd={addTask}/>
      <FilterBar 
      selectedButton={selectedButton} 
      onSelectButton={onSelectButton}
      totalTasks={totalTasks}
      doneTasks={doneTasks}/>
      <TodoList 
      tasks={filteredTasks} 
      setTasks={setTasks}/>
    </div>
  );
};

export default App;