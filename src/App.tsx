import React, {useReducer} from 'react';
import './App.css';
import Todolist, { TaskType } from "./Components/Todolist";
import {v1} from "uuid";
import AddItemForm from "./Components/AddItemForm";
import ButtonAppBar from "./Components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTaskAC,
    addTodolistHelperAC,
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
export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}


export type TasksType = {
    [key: string]: TaskType[]
}

function App() {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, todolistsDispatch] = useReducer(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]);
    const [tasks, tasksDispatch] = useReducer(tasksReducer,{
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

    //tasks Dispatch
    function removeTask(todolistID: string, id: string) {
        tasksDispatch(removeTaskAC(todolistID, id))
    }
    function changeStatusTask(todolistID: string, id: string, value: boolean) {
        tasksDispatch(changeStatusTaskAC(todolistID, id, value))
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
            delete tasks[todolistID]
        // можно ли добавить этот делит в reducer
    }
    function addTodolist(todolistTitle: string) {
        let newTodolist: TodolistsType =  {id: v1(), title: todolistTitle, filter: 'all'};
        todolistsDispatch(addTodolistAC(newTodolist))
        tasksDispatch(addTodolistHelperAC(newTodolist.id))
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
                        // почему не можем фильтровать напрямую tasks?
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
