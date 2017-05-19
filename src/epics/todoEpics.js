import todoActions from "../actions/todoActions";
import { AsyncStorage } from "react-native";

export const loadTodos = todoActions.loadTodos.handler(payload => {
    return AsyncStorage.getItem("todo").
        then((data) => {
            if (data) {
                return todoActions.loadTodosSuccess.send(JSON.parse(data));
            }
            else {
                return todoActions.loadTodosNoData.send();
            }
        }).
        catch((error) => {
            return todoActions.loadTodosFailed.send(error);
        });
}).subscribe();

export const saveTodos = todoActions.saveTodos.handler(payload => {
    return AsyncStorage.setItem("todo", JSON.stringify(payload.todos)).then(() => {
        return todoActions.saveTodosSuccess.send();
    }).catch(error => {
        return todoActions.saveTodosFailed.send(error);
    });
}).subscribe();

export default {
    loadTodos,
    saveTodos,
};
