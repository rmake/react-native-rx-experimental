import Rx from "rxjs";
import todoActions from "../actions/todoActions";

const initialState = {
    nextTodoId: 1,
    todos: [],
};

export const createTodo = (nextId, text) => ({
    id: nextId,
    text,
    completed: false,
});

export const toggleTodo = (todo, id) => {
    if (todo.id != id) {
        return todo;
    }
    return {
        ...todo,
        completed: !todo.completed,
    };
};

const TodoReducer$ = Rx.Observable.of(() => initialState).merge(
    todoActions.addTodo.subject$.map(payload => state => {
        return ({
            ...state,
            nextTodoId: state.nextTodoId + 1,
            todos: [
                ...state.todos,
                createTodo(state.nextTodoId, payload.text),
            ]
        });
    }),
    todoActions.toggleTodo.subject$.map(payload => state => ({
        ...state,
        todos: state.todos.map((todo) => (toggleTodo(todo, action.id))),
    })),
);

export default TodoReducer$;
