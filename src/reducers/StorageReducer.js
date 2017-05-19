import Rx from "rxjs";
import todoActions from "../actions/todoActions";

const initialState = {
    starting: true,
    loading: false,
    saving: false,
};

const StorageReducer$ = Rx.Observable.of([null, () => initialState]).merge(
    todoActions.checkInitialTodos.handler(payload => state => {
        return {
            ...state,
            starting: false,
        }
    }),
    todoActions.loadTodos.handler(payload => state => {
        return {
            ...state,
            loading: true,
        }
    }),
    todoActions.loadTodosSuccess.handler(payload => state => {
        return {
            ...state,
            loading: false,
        }
    }),
    todoActions.loadTodosNoData.handler(payload => state => {
        return {
            ...state,
            loading: false,
        }
    }),
    todoActions.loadTodosFailed.handler(payload => state => {
        return {
            ...state,
            loading: false,
        }
    }),
    todoActions.saveTodos.handler(payload => state => {
        return {
            ...state,
            saving: true,
        }
    }),
    todoActions.saveTodosSuccess.handler(payload => state => {
        return {
            ...state,
            saving: false,
        }
    }),
    todoActions.saveTodosFailed.handler(payload => state => {
        return {
            ...state,
            saving: false,
        }
    }),
);

export default StorageReducer$;
