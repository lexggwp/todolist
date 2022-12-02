import React from 'react';
import {FilterValuesType, TaskType} from '../App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from "@mui/icons-material";



type PropsType = {
    todolistTitle: string
    tasks: Array<TaskType>
    deleteTask: (todolistID: string, taskID: string) => void
    changeTodolistFilter: (todolistID: string, filterName: FilterValuesType) => void
    addTask: (todolistID: string, newTitle: string) => void;
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void;
    filter: FilterValuesType;
    todolistID: string;
    deleteTodolist: (todolistID: string) => void;
    changeTaskTitle: (todolistId: string, taskID: string, inputValue: string) => void;
    changeTodolistTitle: (todolistId: string, title: string) => void;
}

function Todolist(props: PropsType) {

    const changeTodolistFilterHandler = (FilterName: FilterValuesType) => props.changeTodolistFilter(props.todolistID, FilterName);
    const deleteTaskHandler = (taskID: string) => {
        props.deleteTask(props.todolistID, taskID)
    }
    const changeTaskStatusHandler = (taskID: string, value: boolean) => {
        props.changeTaskStatus(props.todolistID, taskID, value)
    }

    const deleteTodolistHandler = () => {
        props.deleteTodolist(props.todolistID);
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistID, title)
    }
    const editTitle = (newTitle: string, taskID: string) => {
        props.changeTaskTitle(props.todolistID, taskID, newTitle)
    }
    const changeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(props.todolistID, title)
    }
    return <div>
        <h3>
            <EditableSpan inputValue={props.todolistTitle} editTitle={changeTodolistTitleHandler}/>
            <IconButton onClick={deleteTodolistHandler}><Delete/></IconButton>
        </h3>
        <AddItemForm addItem={addTaskHandler}/>
        <ul>
            {
                props.tasks.map(el => {

                    return (
                        <li  key={el.taskID}>
                            <Checkbox color="success" onChange={(event) => changeTaskStatusHandler(el.taskID, event.currentTarget.checked)}
                                      checked={el.isDone} />
                            <EditableSpan editTitle={ () => editTitle(props.todolistID, el.taskID)} inputValue={el.title}/>
                            <IconButton onClick={() => deleteTaskHandler(el.taskID)}><Delete/></IconButton>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "contained": "outlined"}
                    onClick={() => changeTodolistFilterHandler('all')}>All</Button>
            <Button variant={props.filter === 'active' ? "contained": "outlined"}
                    onClick={() => changeTodolistFilterHandler('active')}>Active</Button>
            <Button variant={props.filter === 'completed' ? "contained": "outlined"}
                    onClick={() => changeTodolistFilterHandler('completed')}>Completed</Button>
        </div>
    </div>
}

export default Todolist;