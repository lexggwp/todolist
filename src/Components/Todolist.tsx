import React, {useState} from 'react';
import {FilterValuesType} from '../App';
import Button from "./Button";
import Input from "./Input";
import style from "./Todolist.module.css";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filterName: FilterValuesType) => void
    addTask: (newTitle: string) => void;
    changeIsDone: (id: string, value: boolean) => void;


}

function Todolist(props: PropsType) {

    const [error, setError] = useState<string>('')

    const addTaskHandler = () => {
        if (newTitle.trim().length) {
            props.addTask(newTitle)
            setNewTitle('');
        } else {
            setError('Title is required')
        }
    }
    const onClickFilterHandler = (FilterName: FilterValuesType) => props.changeFilter(FilterName);


    const [newTitle, setNewTitle] = useState('');

    const onClickDeleteTask = (id: string) => {
        props.removeTask(id)
    }
    const onChangeHandler = (tID: string, value: boolean ) => {
        props.changeIsDone(tID, value)
    }

    return <div>
        <h3>{props.title}</h3>
        <Input setError={setError} error={error} callBack={addTaskHandler} title={newTitle} setNewTitle={setNewTitle}/>
        <Button name={'+'} callback={addTaskHandler}/>
        {error && <div className={style.errorMessage}>{error}</div>}

        <ul>
            {
                props.tasks.map(t => {

                    return (
                        <li className={t.isDone? style.isDone : ''} key={t.id}>
                            <input onChange={ (event: React.ChangeEvent<HTMLInputElement>) => onChangeHandler(t.id, event.currentTarget.checked)} type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button name={'x'} callback={() => onClickDeleteTask(t.id)}/>

                        </li>
                    )

                })
            }
        </ul>
        <div>
            <Button name={'All'} callback={() => onClickFilterHandler('all')}/>
            <Button name={'Active'} callback={() => onClickFilterHandler('active')}/>
            <Button name={'Completed'} callback={() => onClickFilterHandler('completed')}/>


        </div>
    </div>
}


export default Todolist;