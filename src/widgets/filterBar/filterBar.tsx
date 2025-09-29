import { Progress } from "../../shared/ui/progressTag/progress";
import styles from './filterBar.module.scss'
import { Button } from "../../shared/ui/button/button";

const variableButton = [
    { value: 'all', label: 'Все' },
    { value: 'active', label: 'Активные' },
    { value: 'done', label: 'Выполненные' },
  ];

type FilterBarProps = {
    selectedButton: string;
    onSelectButton: (mag: string) => void;
    totalTasks: number;
    doneTasks: number;
}

export const FilterBar = ({
    selectedButton,
    onSelectButton,
    totalTasks,
    doneTasks
}: FilterBarProps) => {
    return (
      <div className={styles.container}>
        <div className={styles.progressBar}>
        <Progress progressNumber={totalTasks - doneTasks}>
        Осталось задач
        </Progress>
        <Progress progressNumber={doneTasks}>
        Выполнено
        </Progress>
        </div>
        <div className={styles.buttonBlock}>
        {variableButton.map((btn) => (
            <Button 
            key={btn.value} 
            color={selectedButton === btn.value ? 'shaded' : 'primary'}
            onClick={() => onSelectButton(btn.value)}
            >
                {btn.label}</Button>
            ))}
        </div>
      </div>
    );
  };