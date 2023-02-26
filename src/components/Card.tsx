import styles from './Card.module.css'
import { CheckCircle, Trash, Circle, DotsSixVertical } from 'phosphor-react'
import { useState } from 'react'
import { EditModal } from './EditModal'

interface CardProps {
    id: number
    text: string
    isChecked: boolean
    changeTaskStatus: (id: number, status: boolean) => void
    changeTaskText: (id: number, text: string) => void
    deleteTask: (id: number) => void,
    onDragStart: (e: any, id: number) => void,
    onDragEnter: (e: any, id: number) => void,
    onDragEnd: (e: any) => void,

}


export function Card(props: CardProps){
    const  {text, isChecked, changeTaskStatus, id, deleteTask, changeTaskText, onDragStart, onDragEnd, onDragEnter} = props
   
    const [isOpen, setIsOpen] = useState(false)

    function handleChecked(){
        setIsOpen(false)
        changeTaskStatus(id , !isChecked)
    }

    function handleOpenModal(id: number){
        setIsOpen(true)
    }

    function handleCloseModal(){
        setIsOpen(false)
    }

    function handleCancel(){
        handleCloseModal()
    }

    function handleSave(id: number, text: string, isChecked: boolean){
        changeTaskText(id, text)
        handleCloseModal()
    }
    function handleDragStart(e: any){
        onDragStart(e, id)
    }

    function handleDragEnter(e: any){
        onDragEnter(e, id)
    }

    function handleDragEnd(e: any){
        onDragEnd(e)
    }

    return (
        <div>
            {
            isChecked?
            <div className={styles.cardContainerChecked} draggable onDragStart={handleDragStart} onDragEnter={handleDragEnter} onDragEnd={handleDragEnd} >
                <div className={styles.dragContainer}>
                        <DotsSixVertical size={24} weight="fill" />
                </div>
                <CheckCircle
                    size={24}
                    weight="fill"
                    className={styles.checkButtonChecked}
                    onClick={()=>{handleChecked()}}
                />
                <p className={styles.checkedText}  onClick={()=>{handleOpenModal(id)}}>
                    {text}
                </p>
                <span>
                    <Trash size={18}  className={styles.deleteButton} onClick={()=> {deleteTask(id)}}/>
                </span>
                <EditModal 
                    isOpen={isOpen} 
                    toEdit={{
                            id: id,
                            text: text,
                            isChecked: isChecked
                        }}
                        handleCancel={handleCancel}
                        handleSave={handleSave}
                />
        </div>
            :
            <div className={styles.cardContainer} draggable onDragStart={handleDragStart} onDragEnter={handleDragEnter} onDragEnd={handleDragEnd}>
                    <div className={styles.dragContainer}>
                        <DotsSixVertical size={24} weight="fill" />
                    </div>
                    <Circle size={24}
                        className={styles.checkButton}
                        onClick={()=>{ handleChecked()}}
                    />
                    <p  className={styles.text} onClick={()=>{handleOpenModal(id)}} >
                      {text}
                    </p>
                <span>
                    <Trash size={18}  className={styles.deleteButton}  onClick={()=> {deleteTask(id)}} />
                </span>
                <EditModal 
                    isOpen={isOpen} 
                    toEdit={{
                            id: id,
                            text: text,
                            isChecked: isChecked
                            }}
                    handleCancel={handleCancel}
                    handleSave={handleSave}
                />
                
            </div>
        }
        </div>
        
     
    )
}
