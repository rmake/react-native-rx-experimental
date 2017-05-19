import { loadTodos, saveTodos } from "../actions";

const stateLocalStorage = store => next => action => {

    var previousState = store.getState();

    next(action);

    var currentState = store.getState();

    if (action.type == "CHECK_INITIAL_TODOS") {
        store.dispatch(loadTodos());
    }
    else if (action.type != "LOAD_TODOS_SUCCESS" &&
        previousState.todos !== currentState.todos) {
        store.dispatch(saveTodos(currentState.todos));
    }

};

export default stateLocalStorage;
