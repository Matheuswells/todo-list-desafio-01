import styles from './EditModal.module.css'
import { XCircle, FloppyDisk } from 'phosphor-react'
import { useState } from 'react';

interface EditModalProps {
    isOpen: boolean;
    toEdit: {
        id: number;
        text: string;
        isChecked: boolean;
    };
    handleCancel: () => void;
    handleSave: (id: number, text: string, isChecked: boolean) => void;
}


export function EditModal(props: EditModalProps){
    const { isOpen, toEdit, handleCancel, handleSave } = props;
    const [textToEdit, setTextToEdit] = useState(toEdit.text)
    const [valid, setValid] = useState(false)

    function handleTextChange(event: React.ChangeEvent<HTMLTextAreaElement>){
        const isAllSpaces = event.target.value.split('').every(char => char === ' ')
        if(event.target.value !== ' ' && event.target.value.length <= 200 && !isAllSpaces ){
            setValid(true)
            setTextToEdit(event.target.value.substring(0, 200))
        }else{
            setValid(false)
            setTextToEdit(toEdit.text)
        }
        setTextToEdit(event.target.value)
    }

    function handleSaveTask(){
        if(valid){
            handleSave(toEdit.id, textToEdit, toEdit.isChecked)
        } else {
            setTextToEdit(toEdit.text)
            setValid(true)
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(event.key)
        if (event.key === 'Enter') {
            handleSaveTask()
        } else if (event.key === 'Escape') {
            setTextToEdit(toEdit.text)
            handleCancel()
        }
      };

    return (
        <div className={isOpen? styles.modalBackground: styles.modalBackgroundHidden} onKeyDown={handleKeyDown}>
            <div className={styles.modalContainer}>
                <div className={styles.headerModal}>
                    <strong>Editar</strong>
                    <textarea value={textToEdit} onChange={handleTextChange} required maxLength={200} rows={2} wrap="hard" cols={100} />
                </div>
                <div className={styles.buttonsContainer}>
                    <button className={styles.cancel} onClick={()=>{setTextToEdit(toEdit.text); handleCancel()}}>
                         Cancelar
                         <XCircle size={24}/>   
                    </button>
                    <button className={styles.save}  onClick={handleSaveTask}>
                        Salvar 
                        <FloppyDisk size={24}/> 
                    </button>
                </div>
            </div>
        </div>
    )
}