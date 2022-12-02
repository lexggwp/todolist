import {v1} from "uuid";
import {
    addTaskAC,
    changeStatusTaskAC,
    changeTaskInputValueAC,
    removeTaskAC,
    tasksReducer
} from "../reducers/tasksReducer";
import {addTodolistAC} from "../reducers/todolistsReducer";

test('delete task in current Todolist', () => {
    const todolistID1 = 'todolistID1'
    const startState = {
        [todolistID1]: [
            { taskID: v1(), title: "HTML&CSS", isDone: true },
            { taskID: v1(), title: "JS", isDone: true },
            { taskID: v1(), title: "ReactJS", isDone: false },
            { taskID: v1(), title: "Rest API", isDone: false },
            { taskID: '5', title: "GraphQL", isDone: false },
        ]
    };
    const endState = tasksReducer(startState, removeTaskAC(todolistID1, '5'))

    expect(endState[todolistID1].length).toBe(4)
    expect(endState).not.toBe(startState)
})

test('change checkbox status task' , () => {
    const todolistID = 'todolistID1';
    const taskID = v1();
    const startState = {
        [todolistID]: [
            { taskID: taskID, title: "HTML&CSS", isDone: true },
            { taskID: v1(), title: "JS", isDone: true },
            { taskID: v1(), title: "ReactJS", isDone: false },
            { taskID: v1(), title: "Rest API", isDone: false },
            { taskID: v1(), title: "GraphQL", isDone: false },
        ]
    };
    const endState = tasksReducer(startState, changeStatusTaskAC(todolistID, taskID, false ))

    expect(endState[todolistID][0].isDone).toBe(false);
    expect(endState[todolistID][1].isDone).toBe( endState[todolistID][1].isDone);
})

test('added new task', () => {
    const todolistID = 'todolistID1';
    const taskID = v1();
    const title = 'newTask'

    const startState = {
        [todolistID]: [
            { taskID: taskID, title: "HTML&CSS", isDone: true },
            { taskID: v1(), title: "JS", isDone: true },
            { taskID: v1(), title: "ReactJS", isDone: false },
            { taskID: v1(), title: "Rest API", isDone: false },
            { taskID: v1(), title: "GraphQL", isDone: false },
        ]
    };

    const endState = tasksReducer(startState, addTaskAC(todolistID, title))

    expect(endState[todolistID].length).toBe(6);
    expect(endState[todolistID][0].title).toBe(title);

})

test('changed task span to other name', () => {
    const todolistID = 'todolistID1';
    const taskID = v1();
    const newTitle = 'newTask'

    const startState = {
        [todolistID]: [
            { taskID: taskID, title: "HTML&CSS", isDone: true },
            { taskID: v1(), title: "JS", isDone: true },
            { taskID: v1(), title: "ReactJS", isDone: false },
            { taskID: v1(), title: "Rest API", isDone: false },
            { taskID: v1(), title: "GraphQL", isDone: false },
        ]
    };
    const endState = tasksReducer(startState, changeTaskInputValueAC(todolistID, taskID, newTitle))

    expect(endState[todolistID][0].title).toBe(newTitle)
    expect(endState[todolistID][0].title).not.toBe(startState[todolistID][0].title)
    expect(endState[todolistID][1].title).toBe('JS')
})

test('Added empty tasks for todolist', () => {

    const startState = {
        ['todolist1']: [
            { taskID: v1(), title: "HTML&CSS", isDone: true },
            { taskID: v1(), title: "JS", isDone: true },
            { taskID: v1(), title: "ReactJS", isDone: false },
            { taskID: v1(), title: "Rest API", isDone: false },
            { taskID: v1(), title: "GraphQL", isDone: false },
        ]
    };

    const endState = tasksReducer(startState, addTodolistAC('title'))
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)

})