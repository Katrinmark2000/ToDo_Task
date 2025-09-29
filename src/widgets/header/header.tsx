import { useState, type ChangeEvent } from 'react';
import { Input } from '../../shared/ui/input/input';
import styles from './header.module.scss'
import { Button } from '../../shared/ui/button/button';

type AppHeaderProps = {
  onAdd: (taskText: string) => void;
};

export const AppHeader = ({onAdd}: AppHeaderProps ) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleAdd = () => {
      if (inputValue.trim() !== '') {
        onAdd(inputValue.trim());
        setInputValue('');
      }
    };
    
    return (
      <header className={styles.header}>
        <Input 
        placeholder='Добавить новую задачу...'
        value={inputValue} 
        onChange={handleChange}/>
        <Button color='shaded' className={styles.button} onClick={handleAdd}>Добавить</Button>
      </header>
    );
  };