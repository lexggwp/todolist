import React from 'react';
import {FilterValuesType} from '../App';
import Button from "./Button";
import style from "./Todolist.module.css";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";


type TaskType = {
    id: string
    inputValue: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, filterName: FilterValuesType) => void
    addTask: (todolistID: string, newTitle: string) => void;
    changeIsDone: (todolistID: string, id: string, value: boolean) => void;
    filter: FilterValuesType;
    todolistID: string;
    deleteTodolist: (todolistID: string) => void;
    changeTaskInputValue: (todolistId: string, taskId: string, inputValue: string) => void;
}

function Todolist(props: PropsType) {

    // const [error, setError] = useState<string>('')
    // const [inputValue, setInputValue] = useState('');

    // const addTaskHandler = () => {
    //     if (inputValue.trim().length) {
    //         props.addTask(props.todolistID, inputValue)
    //         setInputValue('');
    //     } else {
    //         setError('Title is required')
    //     }
    // }
    const onClickFilterHandler = (FilterName: FilterValuesType) => props.changeFilter(props.todolistID, FilterName);


    const onClickDeleteTask = (id: string) => {
        props.removeTask(props.todolistID, id)
    }
    const onChangeHandler = (id: string, value: boolean) => {
        props.changeIsDone(props.todolistID, id, value)
    }
    const onClickDeleteTodolist = () => {
        props.deleteTodolist(props.todolistID);
    }
    const addTaskHandler = (inputValue: string) => {
        props.addTask(props.todolistID, inputValue)

    }




    return <div>
        <h3>{props.title}
            <Button name={'x'} callback={onClickDeleteTodolist}/>
        </h3>
        {/*<Input setError={setError} error={error} onEnter={addTaskHandler} title={inputValue} setNewTitle={setInputValue}/>*/}
        {/*<Button name={'+'} callback={addTaskHandler}/>*/}
        {/*{error && <div className={style.errorMessage}>{error}</div>}*/}
        <AddItemForm addItem={addTaskHandler}/>

        <ul>
            {
                props.tasks.map(t => {
                    const changeTaskInputValueHandler = (inputValue: string) => {
                        props.changeTaskInputValue(props.todolistID, t.id, inputValue)
                    }
                    return (
                        <li className={t.isDone ? style.isDone : ''} key={t.id}>
                            <input onChange={(event) => onChangeHandler(t.id, event.currentTarget.checked)}
                                   type="checkbox" checked={t.isDone}/>
                            <EditableSpan changeTaskInputValue={changeTaskInputValueHandler} inputValue={t.inputValue}/>
                            <Button name={'x'} callback={() => onClickDeleteTask(t.id)}/>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <Button style={props.filter === 'all' ? style.activeFilter : ''} name={'All'}
                    callback={() => onClickFilterHandler('all')}/>
            <Button style={props.filter === 'active' ? style.activeFilter : ''} name={'Active'}
                    callback={() => onClickFilterHandler('active')}/>
            <Button style={props.filter === 'completed' ? style.activeFilter : ''} name={'Completed'}
                    callback={() => onClickFilterHandler('completed')}/>
        </div>
    </div>
}

export default Todolist;