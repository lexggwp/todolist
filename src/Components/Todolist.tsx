import React from 'react';
import {FilterValuesType, TaskType, TodolistType} from '../App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from "@mui/icons-material";
import {
    addTaskAC,
    changeStatusTaskAC,
    editTaskTitleAC,
    removeTaskAC
} from "../redux/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC} from "../redux/todolistsReducer";
import {RootReducerType} from "../redux/store";



type TodolistPropsType = {
    todolists: TodolistType
}

function Todolist({todolists}: TodolistPropsType) {
    const {todolistID, title, filter} = todolists


    const dispatch = useDispatch()
    let tasks = useSelector<RootReducerType, TaskType[]>(state => state.tasks[todolistID])

    console.log(tasks)

    if (filter === "active") {
        tasks = tasks.filter(el => !el.isDone);
    }
    if (filter === "completed") {
        tasks = tasks.filter(el => el.isDone);
    }

    const changeTodolistFilterHandler = (filterName: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistID, filterName))
    }
    const deleteTaskHandler = (taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID))
    }
    const changeTaskStatusHandler = (taskID: string, isDone: boolean) => {
        dispatch(changeStatusTaskAC(todolistID, taskID, isDone))
    }
    const deleteTodolistHandler = () => {
        dispatch(deleteTodolistAC(todolistID));
    }
    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }
    const editTaskTitle = (taskID: string, newTitle: string) => {
        dispatch(editTaskTitleAC(todolistID, taskID, newTitle))
    }
    const changeTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleAC(todolistID, title))
    }

    return <div>
        <h3>
            <EditableSpan inputValue={title} editTitle={changeTodolistTitleHandler}/>
            <IconButton onClick={deleteTodolistHandler}><Delete/></IconButton>
        </h3>
        <AddItemForm addItem={addTaskHandler}/>
        <ul>
            {
                tasks.map(el => {

                    return (
                        <li key={el.taskID}>
                            <Checkbox color="success" onChange={(event) => changeTaskStatusHandler(el.taskID, event.currentTarget.checked)}
                                      checked={el.isDone} />
                            <EditableSpan editTitle={ (newTitle) => editTaskTitle(el.taskID, newTitle)} inputValue={el.title}/>
                            <IconButton onClick={() => deleteTaskHandler(el.taskID)}><Delete/></IconButton>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <Button variant={filter === 'all' ? "contained": "outlined"}
                    onClick={() => changeTodolistFilterHandler('all')}>All</Button>
            <Button variant={filter === 'active' ? "contained": "outlined"}
                    onClick={() => changeTodolistFilterHandler('active')}>Active</Button>
            <Button variant={filter === 'completed' ? "contained": "outlined"}
                    onClick={() => changeTodolistFilterHandler('completed')}>Completed</Button>
        </div>
    </div>
}

export default Todolist;