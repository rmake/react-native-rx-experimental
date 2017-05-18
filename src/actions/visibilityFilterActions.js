import { createActions } from "../state/rxState";

export default createActions([
    {
        name: "setVisibilityFilter",
        message: (filter) => ({ filter }),
    },
]);
