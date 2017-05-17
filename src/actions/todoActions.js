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
]);
