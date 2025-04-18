// src/components/Task/Task.tsx
import { Trash } from "phosphor-react";
import styles from "./task.module.css";

export function Task({ checked, title, id, onComplete, onDelete }: any) {
  const handleCompleteTask = () => {
    onComplete(id);  // Marca a tarefa como concluída
  };

  const handleDeleteTask = () => {
    onDelete(id);  // Deleta a tarefa
  };

  return (
    <div className={styles.task}>
      <div>
        <input
          type="checkbox"
          id={`task-${id}`} 
          name="task"
          checked={checked}
          onChange={handleCompleteTask}  // Ao mudar o checkbox, chama handleCompleteTask
        />
        <label htmlFor={`task-${id}`}>{title}</label>
      </div>
      <button type="button" onClick={handleDeleteTask}>
        <Trash size={24} />
      </button>
    </div>
  );
}
