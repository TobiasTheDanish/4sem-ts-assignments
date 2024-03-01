import { useState } from 'react'
import './App.css'
import { Task } from './components/Task'
import { TaskList } from './components/TaskList'
import { AddTask } from './components/AddTask'
import { persist, taskManager, updatePersist } from './lib/persistence'

function App() {
  const [tasks, setTasks] = useState<Task[]>(taskManager.getMemTasks())

  return (
    <main>
      <AddTask setTasks={persist<Task[]>(tasks, setTasks, taskManager.setMemTasks)} />
      <TaskList 
        tasks={tasks} 
        updateTask={updatePersist<Task>(taskManager.updateTask, taskManager.getMemTasks, setTasks)} 
        deleteTask={updatePersist<Task>(taskManager.deleteTask, taskManager.getMemTasks, setTasks)} 
      />
    </main>
  )
}


export default App
