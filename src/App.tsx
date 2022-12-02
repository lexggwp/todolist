import React, {useReducer} from 'react';
import './App.css';
import Todolist from "./Components/Todolist";
import {v1} from "uuid";
import AddItemForm from "./Components/AddItemForm";
import ButtonAppBar from "./Materil-UI/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTaskAC,
    changeStatusTaskAC,
    changeTaskInputValueAC,
    removeTaskAC,
    tasksReducer
} from "./reducers/tasksReducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    todolistsReducer
} from "./reducers/todolistsReducer";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType;
}

export type TaskType = {
    taskID: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [key: string]: TaskType[]
}

function App() {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, todolistsDispatch] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]);
    const [tasks, tasksDispatch] = useReducer(tasksReducer, {
        [todolistID1]: [
            {taskID: v1(), title: "HTML&CSS", isDone: true},
            {taskID: v1(), title: "JS", isDone: true},
            {taskID: v1(), title: "ReactJS", isDone: false},
        ],
        [todolistID2]: [
            {taskID: v1(), title: "HTML&CSS", isDone: true},
            {taskID: v1(), title: "JS", isDone: true},
        ]
    })

    //tasks Dispatch
    function removeTask(todolistID: string, taskID: string) {
        tasksDispatch(removeTaskAC(todolistID, taskID))
    }

    function changeStatusTask(todolistID: string, taskID: string, value: boolean) {
        tasksDispatch(changeStatusTaskAC(todolistID, taskID, value))
    }

    function addTask(todolistID: string, title: string) {
        tasksDispatch(addTaskAC(todolistID, title))
    }

    function changeTaskInput(todolistId: string, taskId: string, newInputText: string) {
        tasksDispatch(changeTaskInputValueAC(todolistId, taskId, newInputText))
    }


    //todolists Dispatch
    function changeTodolistFilter(todolistID: string, value: FilterValuesType) {
        todolistsDispatch(changeTodolistFilterAC(todolistID, value))
    }

    function deleteTodolist(todolistID: string) {
        todolistsDispatch(deleteTodolistAC(todolistID));
        tasksDispatch(deleteTodolistAC(todolistID))
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title);
        todolistsDispatch(action)
        tasksDispatch(action)
    }

    function changeTodolistTitle(todolistId: string, title: string) {
        todolistsDispatch(changeTodolistTitleAC(todolistId, title))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(el => {
                        let filteredTasks = tasks[el.id];
                        if (el.filter === "active") {
                            filteredTasks = tasks[el.id].filter(t => !t.isDone);
                        }
                        if (el.filter === "completed") {
                            filteredTasks = tasks[el.id].filter(t => t.isDone);
                        }

                        return (
                            <Grid key={el.id} item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={el.id}
                                        todolistID={el.id}
                                        filter={el.filter}
                                        changeTaskStatus={changeStatusTask}
                                        todolistTitle={el.title}
                                        tasks={filteredTasks}
                                        deleteTask={removeTask}
                                        changeTodolistFilter={changeTodolistFilter}
                                        addTask={addTask}
                                        deleteTodolist={deleteTodolist}
                                        changeTaskTitle={changeTaskInput}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
