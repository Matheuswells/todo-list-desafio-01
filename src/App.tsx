import styles from './App.module.css'
import './global.css'
import { Header } from './components/Header'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import { useState } from 'react'
import { EditModal } from './components/EditModal'

interface Todo {
  id: number
  text: string
  isChecked: boolean
  order: number
}

const todos = [
  { 
      id: 1, 
      text: 'Crie uma nova tarefa',
      isChecked: false,
      order: 1
  },
  { 
      id: 2, 
      text: 'Edite uma tarefa clicando sobre o texto',
      isChecked: false,
      order: 2
  },
  { 
      id: 3, 
      text: 'Mova uma tarefa arrastando-a para cima ou para baixo e a soltando através do botão pontilhado a esquerda',
      isChecked: false,
      order: 3
  },
  { 
      id: 4, 
      text: 'Marque uma tarefa como concluída clicando no botão de check',
      isChecked: true,
      order: 4
  },
  { 
      id: 5, 
      text: 'Delete uma tarefa clicando no botão de lixeira',
      isChecked: false,
      order: 5
  },
  { 
      id: 6, 
      text: 'Role os cards para baixo para visualizar todas as tarefas',
      isChecked: false,
      order: 6
  },
  { 
      id: 7, 
      text: 'Você pode usar o Enter para criar uma nova tarefa',
      isChecked: false,
      order: 7
  },
  { 
    id: 8, 
    text: 'No Modal de editar tarefa, você pode usar o Enter para salvar as alterações enquanto o campo de texto estiver selecionado',
    isChecked: false,
    order: 8
  },
  { 
    id: 9, 
    text: 'No Modal de editar tarefa, você pode usar o Esc para cancelar as alterações enquanto o campo de texto estiver selecionado',
    isChecked: false,
    order: 9
  },
  { 
    id: 10, 
    text: 'Outra tarefa',
    isChecked: false,
    order: 10
  },
  { 
    id: 11, 
    text: 'Outra tarefa',
    isChecked: false,
    order: 11
  },
  { 
    id: 12, 
    text: 'Outra tarefa',
    isChecked: false,
    order: 12
},
  { 
    id: 13, 
    text: 'Outra tarefa',
    isChecked: false,
    order: 13
  },
  { 
    id: 14, 
    text: 'Outra tarefa',
    isChecked: false,
    order: 14
  },
  { 
    id: 15, 
    text: 'Outra tarefa',
    isChecked: false,
    order: 15
  },
  { 
    id: 16, 
    text: 'Outra tarefa',
    isChecked: false,
    order: 16
  },

]

function App() {

  const [tasks, setTasks] = useState(todos)
  
  function AddTask(text: string){
    //create new task on top of the list
    const newTask = {
      id: tasks.length + 1,
      text,
      isChecked: false,
      order: 1
    }
    const tasksWithNewOrder = tasks.map(task => {
      return {
        ...task,
        order: task.order + 1
      }
    })
    const newTasks = [newTask, ...tasksWithNewOrder]

    setTasks(newTasks)
    
  }

  function changeTaskStatus(id: number, status: boolean){
    const newTasks = tasks.map(task => {
      if(task.id === id){
        return {
          ...task,
          isChecked: status
        }
      }
      return task
    })
    setTasks(newTasks)
  }

  function handleChangeTaskText(id: number, text: string){
    const newTasks = tasks.map(task => {
      if(task.id === id){
        return {
          ...task,
          text
        }
      }
      return task
    })
    setTasks(newTasks)
  }

  function deleteTask(id: number){
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  }

  function changeTaskPosition(newTasks: Array<Todo>){
    const array = newTasks.slice()
    setTasks(array)
  }

  return (
    
   <div className={styles.main}>
      <Header />
      <TodoForm handleAddTask={AddTask} />
      <TodoList 
        tasks={tasks} 
        deleteTask={deleteTask} 
        changeTaskStatus={changeTaskStatus} 
        changeTaskText={handleChangeTaskText}
        isEmpty={tasks.length === 0}
        changeTaskPosition={changeTaskPosition}
        />  
   </div>
  )
}

export default App
