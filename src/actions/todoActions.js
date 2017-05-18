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
]);
