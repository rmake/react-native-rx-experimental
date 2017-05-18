// referenced from https://github.com/MichalZalecki/connect-rxjs-to-react
// Copyright (c) MichalZalecki
// Released under the MIT license

import Rx from "rxjs";

export const createAction = (messageCallback) => {
    var subject$ = new Rx.Subject();
    return {
        send: (...args) => {
            let message = messageCallback.apply(null, args);
            subject$.next(message);
        },
        subject$,
    };
};

export const createActions = (actions) => {
    return actions.reduce((acc, {name, message}) => ({ ...acc, [name]: createAction(message) }), {})
}

export const createSelector = (state, path, merge = state => state) => {
    if (path.length <= 0) {
        return {
            divide: () => state,
            merge: merge,
        };
    }
    return createSelector(state && state[path[0]], path.slice(1),
        subState => ({ ...(state || {}), [path[0]]: subState }));
}

export const createState = (reducer$, initialState$ = Rx.Observable.of({})) => {
    let state$ = initialState$.merge(reducer$)
        .scan((state, [path, reducer]) => {
            var { divide, merge } = createSelector(state, path);
            return merge(reducer(divide(state)));
        })
        .publishReplay(1)
        .refCount();
    state$.subscribe((x) => {});
    return state$;
}
