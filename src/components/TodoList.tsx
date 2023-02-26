import styles from './TodoList.module.css'
import { Card } from './Card'
import clipboard from '../assets/clipboard.svg'
import { useRef } from 'react'

interface Todo {
    id: number
    text: string
    isChecked: boolean
    order: number
}

interface TodoListProps {
    tasks: Array<Todo>
    deleteTask: (id: number) => void
    changeTaskStatus: (id: number, status: boolean) => void
    changeTaskText: (id: number, text: string) => void
    changeTaskPosition: (tasks: Array<Todo>) => void
    isEmpty: boolean
}

export function TodoList(props: TodoListProps){
    const { tasks, deleteTask, changeTaskStatus, isEmpty, changeTaskText, changeTaskPosition } = props
  
    function formatTasksCompleted(){
        const tasksCompleted = tasks.filter(todo => todo.isChecked).length
        if(tasksCompleted === 0) return '0'
        return `${tasksCompleted} de ${tasks.length}`
    }

    function handleChangeTaskText(id: number, text: string){
       changeTaskText(id, text) 
    }

    const dragItem = useRef();
    const dragOverItem = useRef();
    const dragStart = (e: any, position:any) => {
        dragItem.current = position;
    };

    const dragEnter = (e: any, position: any) => {
        dragOverItem.current = position;
    };

    const drop = () => {
        const dragItemPosition = dragItem.current;
       
        const dragOverItemPosition = dragOverItem.current;
        const newTasks = tasks;
        newTasks.splice(dragOverItemPosition!, 0, newTasks.splice(dragItemPosition!, 1)[0]);
        newTasks.forEach((task, index) => {
            task.order = index + 1
        })
        changeTaskPosition(newTasks);
    };


    return (
        <div className={styles.listContainer}>
            <header>
               <div>
                    <p className={styles.blue}>Tarefas Criadas</p>
                    <span>{tasks.length}</span>
               </div>
               <div>
                    <p className={styles.purple}>Concluídas</p>
                    <span>{formatTasksCompleted()}</span>
               </div>
            </header>
            {
                isEmpty?
                <div className={styles.emptyContainer}>
                    <img src={clipboard} alt="clipboard logo" />
                    <strong>Você ainda não tem tarefas cadastradas</strong>
                    <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
                :
                <div className={styles.cardList}>
                {//list cards by order
                    tasks.sort((a, b) => a.order - b.order).map((task, index) => {
                        return (
                            <Card 
                                key={task.id}
                                id={task.id}
                                text={task.text}
                                isChecked={task.isChecked}
                                changeTaskStatus={(id:number, status: boolean) => changeTaskStatus(task.id, status)}
                                deleteTask={(id: number) => deleteTask(id)}
                                changeTaskText={handleChangeTaskText} 
                                onDragStart={(e) => dragStart(e, index)}
                                onDragEnter={(e) => dragEnter(e, index)}
                                onDragEnd={drop}
                            />
                        ) })
                }
            </div>
            }
           
        </div>
    )
}