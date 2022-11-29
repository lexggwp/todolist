import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";


type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export type DeleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>


type ActionType = ChangeTodolistFilterACType | DeleteTodolistACType |
    AddTodolistACType | ChangeTodolistTitleACType;

export const todolistsReducer = (state: TodolistsType[], action: ActionType): TodolistsType[] => {
    switch (action.type) {
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.todolistID ? {...el, filter: action.value}: el )
        case "DELETE-TODOLIST":
            return state.filter(el => el.id !== action.todolistID)
        case "ADD-TODOLIST":
            let newTodolist: TodolistsType = {id: action.todolistID, title: action.todolistTitle, filter: 'all'};
            return [newTodolist, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.todolistID ? {...el, title: action.title} : el)
        default:
            return state
    }
}


export const changeTodolistFilterAC = (todolistID: string, value: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', todolistID, value} as const)
export const changeTodolistTitleAC = (todolistID: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', todolistID, title} as const)
export const deleteTodolistAC = (todolistID: string) =>
    ({type: 'DELETE-TODOLIST', todolistID} as const)
export const addTodolistAC = (todolistTitle: string) =>
    ({type: 'ADD-TODOLIST', todolistID: v1(), todolistTitle} as const)

