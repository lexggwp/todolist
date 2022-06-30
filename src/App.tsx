import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
export type FilterValueType = 'all' | 'active' | 'completed';
function App() {



    const title: string = "What to learn";

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS", isDone: true},
        {id: 4, title: "React", isDone: false},
        {id: 5, title: "Redux", isDone: false},

    ])

    const [filter, setFilter] = useState<FilterValueType>('all');

    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(task => task.id !== taskID));
    }

    let tasksForRender;
    switch (filter) {
        case "completed":
            tasksForRender = tasks.filter(t => t.isDone === true)
            break
        case "active":
            tasksForRender = tasks.filter(t => t.isDone === false)
            break
        default:
            tasksForRender = tasks;
    }
    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter);
    }

    return (
        <div className="App">
            <Todolist changeFilter={changeFilter} tasks={tasksForRender} title={title} removeTask={removeTask}/>
        </div>
    );
}

export default App;
