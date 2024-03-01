import { Task } from "../components/Task";

export const taskManager = (() => {
	return {
		getMemTasks,
		getNextId,
		setMemTasks,
		updateTask,
		deleteTask,
	};
})();

function getMemTasks(): Task[] {
	const tasks = JSON.parse(localStorage.getItem('tasks') ?? '[]');
	return tasks;
}

function getNextId(): number {
	const currentId = localStorage.getItem('currentId') ?? '0';
	const next = parseInt(currentId) + 1;
	localStorage.setItem('currentId', next.toFixed(0));
	return next;
};

function setMemTasks(tasks: Task[]): void {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(task: Task): void {
	const tasks = getMemTasks();

	const updatedTasks = tasks.map(t => {
		if (t.id == task.id) {
			return {
				...task,
			};
		}
		return t;
	});

	setMemTasks(updatedTasks);
}

function deleteTask(task: Task): void {
	const tasks = getMemTasks();

	const filteredTasks = tasks.filter(t => t.id != task.id);
	setMemTasks(filteredTasks);
}

export function updatePersist<T>(updater: (val:T) => void, fetcher: () => T[], dispatch: React.Dispatch<React.SetStateAction<T[]>>): (val: T) => void {
	return (val: T): void => {
		updater(val);
		dispatch(fetcher())
	}
}

export function persist<T extends Object>(prev: T, dispatch: React.Dispatch<React.SetStateAction<T>>, cb: (val:T) => void): React.Dispatch<React.SetStateAction<T>> {
  return (value: T | ((prev: T) => T)): void => {
    if (typeof value == 'function') {
      const res = value(prev);
      dispatch(res);
      cb(res);
    } else {
      dispatch(value);
      cb(value);
    }
  }
}
