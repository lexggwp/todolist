import React, {useState} from 'react';
import {FilterValuesType} from './App';
import Button from "./Components/Button";
import Input from "./Components/Input";

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

}

function Todolist(props: PropsType) {

    const addTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle('');
    }
    const onClickFilterHandler = (FilterName: FilterValuesType) => props.changeFilter(FilterName);

    const [newTitle, setNewTitle] = useState('');

    const onClickDeleteTask = (id: string) => {
        props.removeTask(id)
    }


    return <div>
        <h3>{props.title}</h3>
        <Input callBack={addTaskHandler} title={newTitle} setNewTitle={setNewTitle}/>
        <Button name={'+'} callback={addTaskHandler}/>
        <ul>
            {
                props.tasks.map(t => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
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