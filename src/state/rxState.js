// referenced from https://github.com/MichalZalecki/connect-rxjs-to-react
// Copyright (c) MichalZalecki
// Released under the MIT license

import Rx from "rxjs";

export const createAction = (messageCallback, name) => {
    var subject$ = new Rx.Subject();
    return {
        send: (...args) => {
            let message = messageCallback.apply(null, args);
            message.type = name;
            subject$.next(message);
        },
        handler: (callback) => {
            console.log("handler ");
            return subject$.map(payload => {
                console.log("payload ", payload);
                return [
                    payload,
                    callback(payload),
                ]
            });
        },
        subject$,
    };
};

export const createActions = (actions) => {
    return actions.reduce((acc, {name, message}) => ({ ...acc, [name]: createAction(message, name) }), {})
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
        .scan((state, reducers) => {

            let update = () => {
                reducers.forEach(pair => {
                    console.log(pair);
                    let [path, binder] = pair;
                    console.log("binder ", binder);
                    let [payload, reducer] = binder;
                    console.log("payload ", payload);
                    console.log("reducer ", reducer);
                    let { divide, merge } = createSelector(state, path);
                    state = merge(reducer(divide(state)));
                });
            };

            console.log("reducers ", reducers);

            let payload = reducers[0][1][0];

            console.log("___ ", reducers);

            middlewares.forEach(middleware => {
                update = middleware(state$)(update);
            });

            update();

            console.log("post update ", state);

            return state;
        })
        .publishReplay(1)
        .refCount();
    state$.subscribe((x) => { console.log("x ", x); });
    return state$;
}
