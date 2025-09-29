import type { ReactNode } from 'react';
import styles from './progress.module.scss'

type TProgressTag = {
    children: ReactNode;
    progressNumber: number;
}

export const Progress = ({children, progressNumber}: TProgressTag) => {
    return(
    <div className={styles.progressBlock}>
        <div className={styles.progress}>
        <span>{children}:  {progressNumber}</span>
        </div>
    </div>
    )
}