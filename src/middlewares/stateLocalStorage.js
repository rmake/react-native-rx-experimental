import todoActions from "../actions/todoActions";

const stateLocalStorage = getState => next => payload => {

    var previousState = getState();

    next(payload);

    var currentState = getState();

    if (payload.type == todoActions.checkInitialTodos.name) {
        todoActions.loadTodos.send();
    }
    else if (payload.type != todoActions.loadTodosSuccess &&
        previousState.todos !== currentState.todos) {
        todoActions.saveTodos.send(currentState.todos);
    }

};

export default stateLocalStorage;
