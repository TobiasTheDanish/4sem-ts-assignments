import { Task } from "../components/Task"
import { taskManager } from "./persistence";

export const taskFactory = (() => {
  return {
    createTask: (title: string, expiryDate: number, description?: string, ): Task => {
      return {
	id: taskManager.getNextId(),
	title,
	description,
	expiryDate,
	isCompleted: false,
      };
    },
  }
})()
