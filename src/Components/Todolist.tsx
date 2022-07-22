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
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, filterName: FilterValuesType) => void
    addTask: (todolistID: string, newTitle: string) => void;
    changeIsDone: (todolistID: string, id: string, value: boolean) => void;
    filter: FilterValuesType;
    todolistID: string;
    deleteTodolist: (todolistID: string) => void;
}

function Todolist(props: PropsType) {

    const [error, setError] = useState<string>('')

    const addTaskHandler = () => {
        if (newTitle.trim().length) {
            props.addTask(props.todolistID, newTitle)
            setNewTitle('');
        } else {
            setError('Title is required')
        }
    }
    const onClickFilterHandler = (FilterName: FilterValuesType) => props.changeFilter(props.todolistID, FilterName);


    const [newTitle, setNewTitle] = useState('');

    const onClickDeleteTask = (id: string) => {
        props.removeTask(props.todolistID, id)
    }
    const onChangeHandler = (id: string, value: boolean ) => {
        props.changeIsDone(props.todolistID, id, value)
    }
    const onClickDeleteTodolist = () => {
        props.deleteTodolist(props.todolistID);
    }

    return <div>
        <h3>{props.title}
        <Button name={'x'} callback={onClickDeleteTodolist}/>
        </h3>
        <Input setError={setError} error={error} callBack={addTaskHandler} title={newTitle} setNewTitle={setNewTitle}/>
        <Button name={'+'} callback={addTaskHandler}/>
        {error && <div className={style.errorMessage}>{error}</div>}

        <ul>
            {
                props.tasks.map(t => {

                    return (
                        <li className={t.isDone? style.isDone : ''} key={t.id}>
                            <input onChange={ (event) => onChangeHandler(t.id, event.currentTarget.checked)} type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button name={'x'} callback={() => onClickDeleteTask(t.id)}/>

                        </li>
                    )

                })
            }
        </ul>
        <div>
            <Button style={props.filter === 'all'? style.activeFilter: '' } name={'All'} callback={() => onClickFilterHandler('all')}/>
            <Button style={props.filter === 'active'? style.activeFilter: '' } name={'Active'} callback={() => onClickFilterHandler('active')}/>
            <Button style={props.filter === 'completed'? style.activeFilter: '' } name={'Completed'} callback={() => onClickFilterHandler('completed')}/>


        </div>
    </div>
}


export default Todolist;