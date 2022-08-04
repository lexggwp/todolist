import React from 'react';
import {FilterValuesType} from '../App';
import style from "./Todolist.module.css";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from '@mui/material';
import {Delete} from "@mui/icons-material";


type TaskType = {
    id: string
    inputValue: string
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
    changeTaskInputValue: (todolistId: string, taskId: string, inputValue: string) => void;
    changeTodolistTitle: (todolistId: string, title: string) => void;
}

function Todolist(props: PropsType) {

    const onClickFilterHandler = (FilterName: FilterValuesType) => props.changeFilter(props.todolistID, FilterName);
    const onClickDeleteTask = (id: string) => {
        props.removeTask(props.todolistID, id)
    }

    const onChangeHandler = (id: string, value: boolean) => {
        props.changeIsDone(props.todolistID, id, value)
    }

    const onClickDeleteTodolist = () => {
        props.deleteTodolist(props.todolistID);
    }

    const addTaskHandler = (inputValue: string) => {
        props.addTask(props.todolistID, inputValue)
    }

    const changeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(props.todolistID, title)
    }
    return <div>
        <h3>
            <EditableSpan inputValue={props.title} changeTaskInputValue={changeTodolistTitleHandler}/>
            <IconButton onClick={onClickDeleteTodolist}><Delete/></IconButton>
        </h3>
        <AddItemForm addItem={addTaskHandler}/>
        <ul>
            {
                props.tasks.map(t => {
                    const changeTaskInputValueHandler = (inputValue: string) => {
                        props.changeTaskInputValue(props.todolistID, t.id, inputValue)
                    }
                    return (
                        <li className={t.isDone ? style.isDone : ''} key={t.id}>
                            <input onChange={(event) => onChangeHandler(t.id, event.currentTarget.checked)}
                                   type="checkbox" checked={t.isDone}/>
                            <EditableSpan changeTaskInputValue={changeTaskInputValueHandler} inputValue={t.inputValue}/>
                            <IconButton onClick={() => onClickDeleteTask(t.id)}><Delete/></IconButton>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "contained": "outlined"}
                    onClick={() => onClickFilterHandler('all')}>All</Button>
            <Button variant={props.filter === 'active' ? "contained": "outlined"}
                    onClick={() => onClickFilterHandler('active')}>Active</Button>
            <Button variant={props.filter === 'completed' ? "contained": "outlined"}
                    onClick={() => onClickFilterHandler('completed')}>Completed</Button>
        </div>
    </div>
}

export default Todolist;