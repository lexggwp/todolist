import {v1} from "uuid";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    todolistsReducer
} from "./todolistsReducer";
import {TodolistsType} from "../App";

test('Changed todolist filter', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const newFilter = 'completed';

    const startState: TodolistsType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistID1, newFilter ))
    
    expect(endState[0].filter).toBe(newFilter)
    expect(endState[1].filter).toBe('all')
})

test('Delete Todolist', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();

    const startState: TodolistsType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, deleteTodolistAC(todolistID1))

    expect(endState.length).toBe(1);
    expect(startState.length).toBe(2);
})

// test('Added new Todolist', () => {
//     const todolistID1 = v1();
//     const todolistID2 = v1();
//     const newTodolist: TodolistsType = {id: v1(), title: 'newTitle', filter: 'all'};
//
//     const startState: TodolistsType[] = [
//         {id: todolistID1, title: 'What to learn', filter: 'all'},
//         {id: todolistID2, title: 'What to buy', filter: 'all'}
//     ];
//     const endState = todolistsReducer(startState, addTodolistAC(newTodolist))
//
//     expect(endState.length).toBe(3)
//     expect(endState[0]).toBe(newTodolist)
//     expect(startState).not.toBe(endState)
// })

test('Changed title of todolist' , () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const newTitle = 'newTitle';

    const startState: TodolistsType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistID1,newTitle ))
    expect(endState[0].title).toBe(newTitle)
    expect(endState[1].title).toBe(startState[1].title)
})
