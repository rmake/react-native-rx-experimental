import Rx from "rxjs";
import TodoReducer$ from "./TodoReducer";
import VisibilityFilterReducer$ from "./VisibilityFilterReducer";
import StorageReducer$ from "./StorageReducer";

const reducers$ = Rx.Observable.merge(
    TodoReducer$.map(todos => [["todos"], todos]),
    VisibilityFilterReducer$.map(visibilityFilter => [["visibilityFilter"], visibilityFilter]),
    StorageReducer$.map(storage => [["storage"], storage]),
);

export default reducers$;
