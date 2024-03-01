import './Task.css';

export interface Task {
  readonly id: number,
  title: string,
  description?: string,
  isCompleted: boolean,
  expiryDate: number,
}

const msInHour = 3600000;

interface Props {
  task: Task;
  handleDelete: (task: Task) => void;
  handleComplete: (task: Task) => void;
}

export function TaskComponent({task, handleDelete, handleComplete}: Props) {
  const expireTime: number = ((task.expiryDate - Date.now()) / msInHour)

  if (task.isCompleted) {
    return (
    <div className="task-container complete">
      <h3 className="task-title">{task.title}</h3>
      <p className="task-desc">{task.description ? task.description : "no description..."}</p>
      <p className="task-expire">Expires in <span>{expireTime.toFixed(1)}</span> hour{expireTime > 1.99 && "s"}</p>
      <button className='danger btn-md' onClick={() => handleDelete(task)}>Delete</button>
      <button className='btn-md' onClick={() => handleComplete({...task, isCompleted: true})}>Complete</button>
    </div>
    )
  }

  return (
    <div className="task-container">
      <h3 className="task-title">{task.title}</h3>
      <p className="task-desc">{task.description ? task.description : "no description..."}</p>
      <p className="task-expire">Expires in <span>{expireTime.toFixed(1)}</span> hour{expireTime > 1.99 && "s"}</p>
      <button className='danger btn-md' onClick={() => handleDelete(task)}>Delete</button>
      <button className='btn-md' onClick={() => handleComplete({...task, isCompleted: true})}>Complete</button>
    </div>
  );
}
