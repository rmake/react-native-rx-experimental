// referenced from https://github.com/MichalZalecki/connect-rxjs-to-react
// Copyright (c) MichalZalecki
// Released under the MIT license

import Rx from "rxjs";

export const createAction = (messageCallback) => {
    var subject$ = new Rx.Subject();
    return {
        send: (...args) => {
            messageCallback.apply(null, args);
        },
        subject$,
    };
};

export const createActions = (actions) => {
    return actions.reduce((acc, {name, message}) => ({ ...acc, [name]: createAction(message) }), {})
}

export const createState = (reducer$, initialState$ = Rx.Observable.of({})) => {
    return initialState$.merge(reducer$)
        .scan((state, [scope, reducer]) => ({
            ...state, [scope]: reducer(state[scope])
        }))
        .publishReplay(1)
        .refCount();
}
