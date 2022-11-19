import {v1} from "uuid";
import {
    addTaskAC,
    addTodolistHelperAC,
    changeStatusTaskAC,
    changeTaskInputValueAC,
    removeTaskAC,
    tasksReducer
} from "./tasksReducer";

test('delete task in current Todolist', () => {
    const todolistID1 = 'todolistID1'
    const startState = {
        [todolistID1]: [
            { id: v1(), inputValue: "HTML&CSS", isDone: true },
            { id: v1(), inputValue: "JS", isDone: true },
            { id: v1(), inputValue: "ReactJS", isDone: false },
            { id: v1(), inputValue: "Rest API", isDone: false },
            { id: '5', inputValue: "GraphQL", isDone: false },
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
            { id: taskID, inputValue: "HTML&CSS", isDone: true },
            { id: v1(), inputValue: "JS", isDone: true },
            { id: v1(), inputValue: "ReactJS", isDone: false },
            { id: v1(), inputValue: "Rest API", isDone: false },
            { id: v1(), inputValue: "GraphQL", isDone: false },
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
            { id: taskID, inputValue: "HTML&CSS", isDone: true },
            { id: v1(), inputValue: "JS", isDone: true },
            { id: v1(), inputValue: "ReactJS", isDone: false },
            { id: v1(), inputValue: "Rest API", isDone: false },
            { id: v1(), inputValue: "GraphQL", isDone: false },
        ]
    };

    const endState = tasksReducer(startState, addTaskAC(todolistID, title))

    expect(endState[todolistID].length).toBe(6);
    expect(endState[todolistID][0].inputValue).toBe(title);

})

test('changed task span to other name', () => {
    const todolistID = 'todolistID1';
    const taskID = v1();
    const newTitle = 'newTask'

    const startState = {
        [todolistID]: [
            { id: taskID, inputValue: "HTML&CSS", isDone: true },
            { id: v1(), inputValue: "JS", isDone: true },
            { id: v1(), inputValue: "ReactJS", isDone: false },
            { id: v1(), inputValue: "Rest API", isDone: false },
            { id: v1(), inputValue: "GraphQL", isDone: false },
        ]
    };
    const endState = tasksReducer(startState, changeTaskInputValueAC(todolistID, taskID, newTitle))

    expect(endState[todolistID][0].inputValue).toBe(newTitle)
    expect(endState[todolistID][0].inputValue).not.toBe(startState[todolistID][0].inputValue)
    expect(endState[todolistID][1].inputValue).toBe('JS')
})

test('Added empty tasks for todolist', () => {

    const todolistID = 'todolistID1';
    const startState = {}

    const endState = tasksReducer(startState, addTodolistHelperAC(todolistID))
    // че с этим тестам делать?
    expect(endState).toBe({
        [todolistID]: []
    })


})