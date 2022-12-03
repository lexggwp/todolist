import React from 'react';
import './App.css';
import Todolist from "./Components/Todolist";
import AddItemForm from "./Components/AddItemForm";
import ButtonAppBar from "./Materil-UI/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {addTodolistAC} from "./redux/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./redux/store";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    todolistID: string,
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

    const dispatch = useDispatch()
    const todolists = useSelector<RootReducerType, TodolistType[]>(state => state.todolists)


    function addTodolist(title: string) {
        dispatch(addTodolistAC(title))
    }


    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{paddingTop: '20px', paddingBottom: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(el => {
                        return (
                            <Grid key={el.todolistID} item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        todolists={el}
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
