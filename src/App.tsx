import React, {useReducer, useState} from 'react';
import './App.css';
import Todolist, { TaskType } from "./Components/Todolist";
import {v1} from "uuid";
import AddItemForm from "./Components/AddItemForm";
import ButtonAppBar from "./Components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTaskAC,
    changeStatusTaskAC,
    changeTaskInputValueAC,
    removeTaskAC,
    tasksReducer
} from "./reducers/tasksReducer";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}


export type TasksType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]);

    let [tasks, tasksDispatch] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), inputValue: "HTML&CSS", isDone: true},
            {id: v1(), inputValue: "JS", isDone: true},
            {id: v1(), inputValue: "ReactJS", isDone: false},
            {id: v1(), inputValue: "Rest API", isDone: false},
            {id: v1(), inputValue: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), inputValue: "HTML&CSS", isDone: true},
            {id: v1(), inputValue: "JS", isDone: true},
            {id: v1(), inputValue: "ReactJS", isDone: false},
            {id: v1(), inputValue: "Rest API", isDone: false},
            {id: v1(), inputValue: "GraphQL", isDone: false},
        ]
    } )



    function removeTask(todolistID: string, id: string) {
        tasksDispatch(removeTaskAC(todolistID, id))
    }

    function changeStatusTask(todolistID: string, id: string, value: boolean) {
        tasksDispatch(changeStatusTaskAC(todolistID, id, value))
    }

    function addTask(todolistID: string, title: string) {
        tasksDispatch(addTaskAC(todolistID, title))
    }

    function changeTodolistFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }

    function deleteTodolist(todolistID: string) {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID];
    }

    function addTodolist(todolistTitle: string) {
        // const newTodolist: TodolistsType = {id: v1(), title: todolistTitle, filter: 'all'};
        // setTodolists([newTodolist, ...todolists])
        // setTasks({...tasks, [newTodolist.id]: []})
    }

    function changeTaskInput(todolistId: string, taskId: string, newInputText: string) {
        tasksDispatch(changeTaskInputValueAC(todolistId, taskId, newInputText))
    }

    function changeTodolistTitle(todolistId: string, title: string) {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: title} : el));
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
                        let tasksForTodolist = tasks[el.id];
                        if (el.filter === "active") {
                            tasksForTodolist = tasks[el.id].filter( t => !t.isDone);
                        }
                        if (el.filter === "completed") {
                            tasksForTodolist = tasks[el.id].filter( t => t.isDone);
                        }

                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={el.id}
                                        todolistID={el.id}
                                        filter={el.filter}
                                        changeIsDone={changeStatusTask}
                                        title={el.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeTodolistFilter}
                                        addTask={addTask}
                                        deleteTodolist={deleteTodolist}
                                        changeTaskInputValue={changeTaskInput}
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
