import {v1} from "uuid";
import {
    addTaskAC,
    changeStatusTaskAC, editTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "../redux/tasksReducer";
import {addTodolistAC, deleteTodolistAC} from "../redux/todolistsReducer";
import {TasksType} from "../App";

let todolistID: string;
let startState: TasksType;

beforeEach( () => {
    todolistID = v1();
    startState = {
        [todolistID]: [
            { taskID: '1', title: "HTML&CSS", isDone: true },
            { taskID: '2', title: "JS", isDone: true },
            { taskID: '3', title: "ReactJS", isDone: false },
            { taskID: '4', title: "Rest API", isDone: false },
            { taskID: '5', title: "GraphQL", isDone: true },
        ]
    }
})

test('delete task in Todolist', () => {
    const endState = tasksReducer(startState, removeTaskAC(todolistID, '5'))
    expect(endState[todolistID].length).toBe(4)
    expect(endState).not.toBe(startState)
})

test('change checkbox status ' , () => {
    const endState = tasksReducer(startState, changeStatusTaskAC(todolistID, '5', false ))
    expect(endState[todolistID][4].isDone).toBe(false);
    expect(endState[todolistID][1].isDone).toBe( endState[todolistID][1].isDone);
})

test('add new task', () => {
    const endState = tasksReducer(startState, addTaskAC(todolistID, 'newTask'))
    expect(endState[todolistID].length).toBe(6);
    expect(endState[todolistID][0].title).toBe('newTask');

})

test('changed task span to other title', () => {
    const endState = tasksReducer(startState, editTaskTitleAC(todolistID, '5', 'newInput'))
    expect(endState[todolistID][4].title).toBe('newInput')
    expect(endState[todolistID][1].title).toBe('JS')
})

test('Added empty tasks for todolist', () => {
    const endState = tasksReducer(startState, addTodolistAC('title'))
    const keys = Object.keys(endState)
    expect(keys.length).toBe(2)

})

test('property with todolist was deleted', () => {
    const endState = tasksReducer(startState, deleteTodolistAC(todolistID))
    const keys = Object.keys(endState);
    expect(keys.length).toBe(0);
    expect(endState[todolistID]).toBeUndefined()
})