import { v1 } from "uuid";
import {TasksType} from "../App";
import {AddTodolistACType, DeleteTodolistACType} from "./todolistsReducer";

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type ChangeStatusTaskACType = ReturnType<typeof changeStatusTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskInputValueACType = ReturnType<typeof changeTaskInputValueAC>




type ActionType = RemoveTaskACType | ChangeStatusTaskACType | addTaskACType |
    ChangeTaskInputValueACType | AddTodolistACType | DeleteTodolistACType

export const tasksReducer = (state: TasksType, action: ActionType): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistID]: state[action.todolistID].filter( el => el.taskID !== action.taskID)};
        case 'CHANGE-STATUS-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].map( el => el.taskID === action.taskID ? {...el, isDone: action.value}: el )}
        case "ADD-TASK":
            let newTask = {taskID: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistID]: [newTask, ...state[action.todolistID]]}
        case "CHANGE-TASK-INPUT":
            return {...state, [action.todolistId]: state[action.todolistId].map(el => el.taskID === action.taskID ? {...el, title: action.newInputText} : el)}
        case "ADD-TODOLIST":
            return {...state, [action.todolistID]: []}
        case 'DELETE-TODOLIST':
            let newState = {...state}
            delete newState[action.todolistID]
            return newState
        default:
            return state
    }
}


export const removeTaskAC = (todolistID: string, taskID: string) =>
    ({type: 'REMOVE-TASK', todolistID, taskID} as const);
export const changeStatusTaskAC = (todolistID: string, taskID: string, value: boolean) =>
    ({type: 'CHANGE-STATUS-TASK', todolistID, taskID, value} as const);
export const addTaskAC = (todolistID: string, title: string) =>
    ({type: 'ADD-TASK', todolistID, title} as const);
export const changeTaskInputValueAC = (todolistId: string, taskID: string, newInputText: string) =>
    ({type: 'CHANGE-TASK-INPUT', todolistId, taskID, newInputText} as const)
