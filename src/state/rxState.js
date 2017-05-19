// referenced from https://github.com/MichalZalecki/connect-rxjs-to-react
// Copyright (c) MichalZalecki
// Released under the MIT license

import Rx from "rxjs";

export const createAction = (name, messageCallback) => {
    var subject$ = new Rx.Subject();
    return {
        send: (...args) => {
            let message = messageCallback.apply(null, args);
            message.type = name;
            subject$.next(message);
        },
        handler: (callback) => {
            return subject$.map(payload => {
                return [
                    payload,
                    callback(payload),
                ]
            });
        },
        name,
        subject$,
    };
};

export const createActions = (actions) => {
    return actions.reduce((acc, {name, message}) => ({ ...acc, [name]: createAction(name, message) }), {})
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

export const createState = (reducer$, middlewares = [], initialState$ = Rx.Observable.of({})) => {

    middlewares = middlewares.slice();
    middlewares.reverse();

    let state$ = initialState$.merge(reducer$)
        .scan((state, pair) => {

            let [path, binder] = pair;
            let [payload, reducer] = binder;
            let dispatch = _payload => {
                let { divide, merge } = createSelector(state, path);
                state = merge(reducer(divide(state)));
            };
            let getState = () => {
                return state;
            }

            if (payload) {
                middlewares.forEach(middleware => {
                    dispatch = middleware(getState)(dispatch);
                });
            }

            dispatch(payload);

            return state;
        })
        .publishReplay(1)
        .refCount();
    state$.subscribe((x) => { });
    return state$;
}
