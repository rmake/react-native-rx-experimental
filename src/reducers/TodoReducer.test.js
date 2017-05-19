import TodoReducer$ from "./TodoReducer";
import todoActions from "../actions/todoActions";

describe("todos", () => {
    it("simple test", () => {
        expect(0).toEqual(0);
    });

    it("addTodo", () => {
        TodoReducer$.take(3).toArray().subscribe((reducers) => {
            let state = reducers.reduce((state, reducer) => reducer[1](state), () => {});
            expect(state).toEqual({
                "nextTodoId": 3,
                "todos":[
                    {
                        "id": 1,
                        "text": "task",
                        "completed": false,
                    },
                    {
                        "id": 2,
                        "text": "new task",
                        "completed": false,
                    },
                ]
            });
        });

        todoActions.addTodo.send("task");
        todoActions.addTodo.send("new task");
    });

    it("toggleTodo", () => {
        TodoReducer$.take(4).toArray().subscribe((reducers) => {
            let state = reducers.reduce((state, reducer) => reducer[1](state), () => {});
            expect(state).toEqual({
                "nextTodoId": 3,
                "todos":[
                    {
                        "id": 1,
                        "text": "task",
                        "completed": true,
                    },
                    {
                        "id": 2,
                        "text": "new task",
                        "completed": false,
                    },
                ]
            });
        });

        todoActions.addTodo.send("task");
        todoActions.addTodo.send("new task");
        todoActions.toggleTodo.send(1);
    });

});
