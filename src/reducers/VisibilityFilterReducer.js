import Rx from "rxjs";
import visibilityFilterActions from "../actions/visibilityFilterActions";

const initialState = {
    filter: "SHOW_ALL",
};

const VisibilityFilterReducer$ = Rx.Observable.of([null, () => initialState]).merge(
    visibilityFilterActions.setVisibilityFilter.handler(payload => state => {
        return {
            ...state,
            filter: payload.filter,
        }
    }),
);

export default VisibilityFilterReducer$;
