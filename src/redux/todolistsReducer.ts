import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export type DeleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type ActionType = ChangeTodolistFilterACType | DeleteTodolistACType |
    AddTodolistACType | ChangeTodolistTitleACType;

let initialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionType): TodolistType[] => {
    switch (action.type) {
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.todolistID === action.todolistID ? {...el, filter: action.filterName} : el)
        case "DELETE-TODOLIST":
            return state.filter(el => el.todolistID !== action.todolistID)
        case "ADD-TODOLIST":
            let newTodolist: TodolistType = {todolistID: action.todolistID, title: action.title, filter: 'all'};
            return [newTodolist, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.todolistID === action.todolistID ? {...el, title: action.title} : el)
        default:
            return state
    }
}


export const changeTodolistFilterAC = (todolistID: string, filterName: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', todolistID, filterName} as const)
export const changeTodolistTitleAC = (todolistID: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', todolistID, title} as const)
export const deleteTodolistAC = (todolistID: string) =>
    ({type: 'DELETE-TODOLIST', todolistID} as const)
export const addTodolistAC = (title: string) =>
    ({type: 'ADD-TODOLIST', todolistID: v1(), title} as const)
