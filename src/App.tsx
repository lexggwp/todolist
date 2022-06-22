import React from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";

function App() {

    const title1: string = "What to learn";
    const title2: string = "What to buy";

    const task1: Array<TaskType> = [
        {id: 1, title: "HTtML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS", isDone: false},
    ]

    const task2: Array<TaskType> = [
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'React', isDone: false},
        {id: 3, title: 'Vue', isDone: false}
    ]
    return (
        <div className="App">
            <Todolist tasks={task1} title={title1}/>
            <Todolist tasks={task2} title={title2}/>
        </div>
    );
}

export default App;
