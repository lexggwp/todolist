import React, {useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void;

}

export function Todolist(props: PropsType) {

    const addTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle('');
    }
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const onClickFilter = (FilterName: FilterValuesType) => {
        props.changeFilter(FilterName)
    }


    const [newTitle, setNewTitle] = useState('');

    const onClickDeleteTask = (id: string) => {
        props.removeTask(id)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input onKeyDown={onKeyPressHandler} value={newTitle} onChange={onChangeHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    return  (
                        <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={ () => onClickDeleteTask(t.id)}>x</button>
                    </li>
                    )

                })
            }
        </ul>
        <div>
            <button onClick={() => {
                onClickFilter('all')
            }}>
                All
            </button>
            <button onClick={() => {
                onClickFilter('active')

            }}>
                Active
            </button>
            <button onClick={() => {
                onClickFilter('completed')

            }}>
                Completed
            </button>
        </div>
    </div>
}
