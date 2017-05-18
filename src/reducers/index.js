import Rx from "rxjs";
import TodoReducer$ from "./TodoReducer";

const reducers$ = Rx.Observable.merge(
    TodoReducer$.map(todos => [["todos"], todos]),
);

export default reducers$;
