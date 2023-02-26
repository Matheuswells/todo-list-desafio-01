

import styles from './TodoForm.module.css'
import { PlusCircle } from 'phosphor-react'
import { useState } from 'react'

interface TodoFormProps {
    handleAddTask: (text: string) => void
}


export function TodoForm(props: TodoFormProps){
    const { handleAddTask } = props
    const [text, setText] = useState('')
    const [valid, setValid] = useState(false)

    function createTask(){
        if(valid){
            handleAddTask(text.substring(0, 200))
        }
        setText('')
        setValid(false)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTask()
        }
      };

    function handleChangeText(event: React.ChangeEvent<HTMLInputElement>){  
        const isAllSpaces = event.target.value.split('').every(char => char === ' ')
        if(event.target.value !== ' ' && event.target.value.length <= 200 && !isAllSpaces ){
            setValid(true)
            setText(event.target.value.substring(0, 200))
        }else{
            setValid(false)
            setText('')
        }
    }

    return(
        <div className={styles.formContainer} onKeyDown={handleKeyDown}>
            <div>
                <input type="text" placeholder='Adicione uma nova tarefa' value={text} onChange={handleChangeText} required maxLength={200} />
                <button onClick={createTask}>
                    Criar
                    <PlusCircle size={24}  />
                </button>
            </div>
        </div>
    )
}