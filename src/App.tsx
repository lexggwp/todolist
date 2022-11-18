import React, {useState} from 'react';
import './App.css';
import Todolist from "./Components/Todolist";
import {v1} from "uuid";
import AddItemForm from "./Components/AddItemForm";
import ButtonAppBar from "./Components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]);


    let [tasks, setTasks] = useState({
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
    });


    function removeTask(todolistID: string, id: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== id)});
    }

    function changeIsDone(todolistID: string, id: string, value: boolean) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === id ? {...el, isDone: value} : el)})
    }

    function addTask(todolistID: string, title: string) {
        let task = {id: v1(), inputValue: title, isDone: false}
        setTasks({...tasks, [todolistID]: [task, ...tasks[todolistID]]})

    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }

    function deleteTodolist(todolistID: string) {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID];
    }

    function addTodolist(todolistTitle: string) {
        const newTodolist: TodolistsType = {id: v1(), title: todolistTitle, filter: 'all'};
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolist.id]: []})
    }

    function changeTaskInputValue(todolistId: string, taskId: string, inputValue: string) {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, inputValue: inputValue} : el)
        })
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
                            tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                        }
                        if (el.filter === "completed") {
                            tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                        }

                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={el.id}
                                        todolistID={el.id}
                                        filter={el.filter}
                                        changeIsDone={changeIsDone}
                                        title={el.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        deleteTodolist={deleteTodolist}
                                        changeTaskInputValue={changeTaskInputValue}
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
