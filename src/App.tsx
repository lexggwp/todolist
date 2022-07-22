import React, {useState} from 'react';
import './App.css';
import Todolist from "./Components/Todolist";
import {v1} from "uuid";

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
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    });


    function removeTask(id: string) {
        // let filteredTasks = tasks.filter(t => t.id !== id);
        // setTasks(filteredTasks);
    }

    function changeIsDone(id: string, value: boolean) {
        // setTasks(tasks.map(el => el.id === id ? {...el, isDone: value} : el))
    }

    function addTask(title: string) {
        // let task = {id: v1(), title: title, isDone: false}
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks)
    }

    // let [filter, setFilter] = useState<FilterValuesType>("all");



    function changeFilter(value: FilterValuesType) {
        // setFilter(value);
    }

    return (
        <div className="App">
            {todolists.map ( el => {
                let tasksForTodolist = tasks[el.id];
                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                }
                return (
                    <Todolist
                        key={el.id}
                        todolistID={el.id}
                        filter={el.filter}
                        changeIsDone={changeIsDone}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}/>
                )
            })}

        </div>
    );
}




export default App;
