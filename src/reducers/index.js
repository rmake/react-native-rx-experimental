import Rx from "rxjs";
import TodoReducer$ from "./TodoReducer";
import VisibilityFilterReducer$ from "./VisibilityFilterReducer";

const reducers$ = Rx.Observable.merge(
    TodoReducer$.map(todos => [["todos"], todos]),
    VisibilityFilterReducer$.map(visibilityFilter => [["visibilityFilter"], visibilityFilter]),
);

export default reducers$;
