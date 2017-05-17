// referenced from https://github.com/MichalZalecki/connect-rxjs-to-react
// Copyright (c) MichalZalecki
// Released under the MIT license

import Rx from "rxjs";

export const createState = (reducer$, initialState$ = Rx.Observable.of({})) => {
    return initialState$.merge(reducer$)
        .scan((state, [scope, reducer]) => ({
            ...state, [scope]: reducer(state[scope])
        }))
        .publishReplay(1)
        .refCount();
}
