import { createActions } from "../state/rxState";

export default createActions([
    {
        name: "addTodo",
        message: (text) => ({ text }),
    },
    {
        name: "toggleTodo",
        message: (id) => ({ id }),
    },
    {
        name: "removeTodo",
        message: (id) => ({ id }),
    },
    {
        name: "clearTodo",
        message: () => ({}),
    },

    {
        name: "checkInitialTodos",
        message: () => ({}),
    },
    {
        name: "loadTodos",
        message: () => ({}),
    },
    {
        name: "loadTodosSuccess",
        message: (todos) => ({todos}),
    },
    {
        name: "loadTodosNoData",
        message: () => ({}),
    },
    {
        name: "loadTodosFailed",
        message: (error) => ({error}),
    },
    {
        name: "saveTodos",
        message: (todos) => ({todos}),
    },
    {
        name: "saveTodosSuccess",
        message: () => ({}),
    },
    {
        name: "saveTodosFailed",
        message: (error) => ({error}),
    },

]);
