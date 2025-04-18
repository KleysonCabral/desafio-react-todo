import { PlusCircle, ClipboardText } from "phosphor-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./app.module.css";
import { Header } from "./components/Header";
import { Task } from "./components/Task";

type TaskType = {
  id: string;
  title: string;
  isCompleted: boolean;
};

const initialData: TaskType[] = [
  {
    id: uuidv4(),
    title: "Tarefa 1",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Tarefa 2",
    isCompleted: false,
  },
];

export function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    setTasks(initialData);
  }, []);

  const totalCompleted = tasks.filter(task => task.isCompleted).length;

  const handleNewTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleCreateTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTask.trim() !== "") {
      const newTaskObj: TaskType = {
        id: uuidv4(),
        title: newTask,
        isCompleted: false,
      };

      setTasks(prev => [...prev, newTaskObj]);
      setNewTask("");
    }
  };

  const toggleCompleteTask = (id: string) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updated);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <form className={styles.newText} onSubmit={handleCreateTask}>
          <input
            type="text"
            placeholder="Adicione uma tarefa"
            value={newTask}
            onChange={handleNewTaskChange}
            required
          />
          <button type="submit">
            Criar
            <PlusCircle size={20} />
          </button>
        </form>

        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <div>
              <strong>Tarefas criadas</strong>
              <span>{tasks.length}</span>
            </div>

            <div>
              <strong>Concluídas</strong>
              <span>{totalCompleted} de {tasks.length}</span>
            </div>
          </div>

          <div className={styles.contentBox}>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Task
                  key={task.id}
                  id={task.id}
                  checked={task.isCompleted}
                  title={task.title}
                  onComplete={toggleCompleteTask}
                  onDelete={deleteTask}
                />
              ))
            ) : (
              <div className={styles.empty}>
                <ClipboardText size={56} />
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <small>Crie tarefas e organize seus itens a fazer</small>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
