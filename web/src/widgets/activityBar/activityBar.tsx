import { useState } from "react";
import { Button } from "../../shared/ui/button/button";
import styles from './activityBar.module.scss';
import { useDispatch, useSelector } from "../../store";
import {
  fetchActivity,
  toggleActivity,
  deleteActivity,
  updateActivity,
} from "../../slice/activitySlice";
import { TodoItem } from "../../shared/ui/todoItem/todoItem";

export const ActivityBar = () => {
  const dispatch = useDispatch();
  const { items: activities, loading, error } = useSelector(state => state.activity);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.activityBar}>
        <Button color="primary" onClick={() => dispatch(fetchActivity())}>
          {loading ? 'Загрузка...' : 'Получить рандом активность'}
        </Button>
        {error && <span className={styles.error}>{error}</span>}
      </div>

      <div className={styles.activitiesContainer}>
        {activities.map(activity => (
          <div key={activity.key} className={styles.activityBlock}>
            <TodoItem
              task={activity.activity}
              completed={activity.completed}
              isEditing={editingTaskId === activity.key}
              onToggle={() => dispatch(toggleActivity(activity.key))}
              onEdit={() => setEditingTaskId(activity.key)}
              onDelete={() => dispatch(deleteActivity(activity.key))}
              onSave={(newText: string) => {
                dispatch(updateActivity({ key: activity.key, activity: newText }));
                setEditingTaskId(null);
              }}
              onCancel={() => setEditingTaskId(null)}
            />
            <span className={styles.type}>{activity.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
