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

export const removeTodo = (todos, id) => {
    return todos.filter(todo => todo.id != id);
};

const TodoReducer$ = Rx.Observable.of([null, () => initialState]).merge(
    todoActions.addTodo.handler(payload => state => {
        return ({
            ...state,
            nextTodoId: state.nextTodoId + 1,
            todos: [
                ...state.todos,
                createTodo(state.nextTodoId, payload.text),
            ]
        });
    }),
    todoActions.toggleTodo.handler(payload => state => ({
        ...state,
        todos: state.todos.map((todo) => (toggleTodo(todo, payload.id))),
    })),
    todoActions.removeTodo.handler(payload => state => ({
        ...state,
        todos: removeTodo(state.todos, payload.id),
    })),
    todoActions.clearTodo.handler(payload => state => ({
        ...state,
        todos: [],
    })),
    todoActions.loadTodosSuccess.handler(payload => state => payload.todos),
);

export default TodoReducer$;
