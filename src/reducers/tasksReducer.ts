import { v1 } from "uuid";
import {TasksType} from "../App";

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type ChangeStatusTaskACType = ReturnType<typeof changeStatusTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskInputValueACType = ReturnType<typeof changeTaskInputValueAC>




type ActionType = RemoveTaskACType | ChangeStatusTaskACType | addTaskACType | ChangeTaskInputValueACType

export const tasksReducer = (state: TasksType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistID]: state[action.todolistID].filter( el => el.id !== action.id)};
        case 'CHANGE-STATUS-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].map( el => el.id === action.id ? {...el, isDone: action.value}: el )}
        case "ADD-TASK":
            let newTask = {id: v1(), inputValue: action.title, isDone: false}
            return {...state, [action.todolistID]: [newTask, ...state[action.todolistID]]}
        case "CHANGE-TASK-INPUT":
            return {...state, [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {...el, inputValue: action.newInputText} : el)}
        default:
            return state
    }
}


export const removeTaskAC = (todolistID: string, id: string) =>
    ({type: 'REMOVE-TASK', todolistID, id} as const);
export const changeStatusTaskAC = (todolistID: string, id: string, value: boolean) =>
    ({type: 'CHANGE-STATUS-TASK', todolistID, id, value} as const);
export const addTaskAC = (todolistID: string, title: string) =>
    ({type: 'ADD-TASK', todolistID, title} as const);
export const changeTaskInputValueAC = (todolistId: string, taskId: string, newInputText: string) =>
    ({type: 'CHANGE-TASK-INPUT', todolistId, taskId, newInputText} as const)