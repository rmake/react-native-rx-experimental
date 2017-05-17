import Rx from "rxjs";
import createActions from "../actions/todoActions";

const initialState = {
    nextTodoId: 1,
    todos: [],
};

const TodoReducer$ = Rx.Observable.of(() => initialState).merge();

export default TodoReducer$;
