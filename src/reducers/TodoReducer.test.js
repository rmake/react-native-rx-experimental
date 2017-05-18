import TodoReducer$ from "./TodoReducer";
import todoActions from "../actions/todoActions";

describe("todos", () => {
    it("simple test", () => {
        expect(0).toEqual(0);
    });

    it("addTodo", () => {
        let state = null;
        TodoReducer$.take(2).toArray().subscribe((reducers) => {
            reducers.forEach(reducer => state = reducer(state));
            expect(state).toEqual({
                "nextTodoId":2,
                "todos":[{
                    "id":1,
                    "text":"task",
                    "completed":false
                }]
            });
        });

        todoActions.addTodo.send("task");
    });

});
