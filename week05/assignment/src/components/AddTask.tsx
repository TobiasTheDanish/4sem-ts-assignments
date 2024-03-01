import { useRef } from "react";
import { Task } from "./Task";
import './AddTask.css';
import { taskFactory } from "../lib/taskFactory";

interface Props {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
}

const msInHour = 3600000;

export function AddTask({setTasks}: Props) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const expireRef = useRef<HTMLInputElement>(null);

  const handleAddClick = () => {
    if (!titleRef.current?.value || !expireRef.current?.value) {
      return;
    }

    const expireHrs = expireRef.current?.value!;
    const expiryDateMs = (Date.now() + parseFloat(expireHrs) * msInHour)

    const task = taskFactory.createTask(titleRef.current?.value!, expiryDateMs, descRef.current?.value);

    setTasks(tasks => [...tasks, task]);
  }

  return (
    <AddTaskRenderer handleAddClick={handleAddClick} titleRef={titleRef} descRef={descRef} expireRef={expireRef} />
  )
};

interface RendererProps {
  handleAddClick: () => void,
  titleRef: React.RefObject<HTMLInputElement>,
  descRef: React.RefObject<HTMLInputElement>,
  expireRef: React.RefObject<HTMLInputElement>,
}

function AddTaskRenderer({handleAddClick, titleRef, descRef, expireRef}: RendererProps) {
  return (
    <div className="add-task-container">
        <div className="label-input-container">
          <label htmlFor="title_input">Title:</label>
          <input id="title_input" ref={titleRef} />
        </div>
        <div className="label-input-container">
          <label htmlFor="desc_input">Description:</label>
          <input id="desc_input" ref={descRef} />
        </div>
        <div className="label-input-container">
          <label htmlFor="expire_input">Expires in: (hours)</label>
          <input id="expire_input" ref={expireRef} />
        </div>
        <button type="submit" onClick={handleAddClick}>Add</button>
    </div>
  )
}
