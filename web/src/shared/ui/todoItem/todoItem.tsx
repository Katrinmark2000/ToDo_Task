import { useEffect, useRef, useState } from 'react';
import { Button } from '../button/button';
import styles from './todoItem.module.scss'
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { MdDone } from "react-icons/md";
import { Input } from '../input/input';


type TaskItemProps = {
    task: string;
    completed: boolean | undefined;
    onToggle: () => void; 
    onEdit: () => void;
    onDelete: () => void;
    onSave: (newText: string) => void;
    onCancel: () => void;
    isEditing: boolean;
  };

export const TodoItem = ({
    task,
    completed,
    onToggle,
    onEdit,
    onDelete,
    onSave,
    isEditing
}: TaskItemProps) => {
    const [editText, setEditText] = useState(task);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing) {
          setEditText(task);
          inputRef.current?.focus();
        }
      }, [isEditing, task]);

    return (
      <div className={styles.taskBlock}>
      <div className={styles.leftSide}>
        <input 
        type='checkbox'
        checked={completed}
        onChange={onToggle}
        className={styles.checkbox}/>
        {isEditing ? (
            <Input
              ref={inputRef}
              value={editText}
              onChange={e => setEditText(e.target.value)}
            />
          ) : (
            <span
              className={styles.text}
              style={{ textDecoration: completed ? 'line-through' : 'none' }}
            >
              {task}
            </span>
          )}
        </div>
        <div className={styles.rightSide}>
        {isEditing ? (
            <>
              <Button
                onClick={() => {
                  if (editText.trim() !== '') {
                    onSave(editText.trim());
                  }
                }}
                color='primary'
              >
                <MdDone color='green'/>
              </Button>
            </>
          ) : (
            <>
              <Button onClick={onEdit} color={'primary'}>
                <FiEdit3 />
              </Button>
              <Button onClick={onDelete} color={'primary'}>
                <RiDeleteBin4Fill />
              </Button>
            </>
          )}
        </div>
      </div>
  );
};