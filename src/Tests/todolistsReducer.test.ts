import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    todolistsReducer
} from "../redux/todolistsReducer";
import {TodolistType} from "../App";

let todolistID1: string;
let todolistID2: string;
let startState: TodolistType[];


beforeEach(() => {
    todolistID1 = v1();
    todolistID2 = v1();

    startState = [
        {todolistID: todolistID1, title: 'What to learn', filter: 'all'},
        {todolistID: todolistID2, title: 'What to buy', filter: 'all'}
    ]

})

test('Changed todolist filter', () => {
    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistID1, 'completed' ))
    expect(endState[0].filter).toBe('completed')
    expect(endState[1].filter).toBe('all')
})

test('Delete Todolist', () => {
    const endState = todolistsReducer(startState, deleteTodolistAC(todolistID1))
    expect(endState.length).toBe(1);
    expect(startState.length).toBe(2);
})

test('Added new Todolist', () => {
    const endState = todolistsReducer(startState, addTodolistAC('newTitleTodolist'))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('newTitleTodolist')
})

test('Changed title of todolist' , () => {
    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistID1,'newTitle' ))
    expect(endState[0].title).toBe('newTitle')
    expect(endState[1].title).toBe(startState[1].title)
})
