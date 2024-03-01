import './Task.css';
import { Task, TaskComponent } from "./Task";
interface Props {
  tasks: Task[],
  updateTask: (t:Task) => void,
  deleteTask: (t:Task) => void,
}

export function TaskList({tasks, updateTask, deleteTask}: Props) {
  const handleDelete = (t: Task) => {
    deleteTask(t);
  }

  const handleComplete = (t: Task) => {
    updateTask(t);
  }

  tasks = [...tasks].sort((t1, t2) => {
    if (t1.isCompleted === t2.isCompleted) {
      return t1.expiryDate - t2.expiryDate;
    } else {
      return t1.isCompleted ? 1 : -1;
    }
  });

  return (
    <div className='task-list'>
      {tasks.map(t => <TaskComponent key={t.id} task={t} handleDelete={handleDelete} handleComplete={handleComplete} />)}
    </div>
  )
}
