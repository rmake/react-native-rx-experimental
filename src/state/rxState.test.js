
import { createAction, createState } from "./rxState";
import Rx from "rxjs";

describe("RxState", () => {

    it("createState creates reactive state using scoped reducer", () => {
        const add$ = new Rx.Subject();
        //const counterReducer$ = add$.map(payload => state => state + payload);
        const counterReducer$ = add$.map(payload => [payload, state => state + payload] );
        const rootReducer$ = Rx.Observable.merge(counterReducer$.map(counter => [["counter"], counter]));
        const state$ = createState(rootReducer$, [], Rx.Observable.of({ counter: 10 }));

        add$.next(1);

        state$.toArray().subscribe((results) => {
            expect(results).toEqual([
                { counter: 11 },
                { counter: 13 },
            ])
        });

        add$.next(2);
        add$.complete();

    });

    it("middlewares hook actions", () => {
        const add = createAction("add", (count) => ({count}));
        const counterReducer$ = add.handler(payload => state => state + payload.count );
        const rootReducer$ = Rx.Observable.merge(counterReducer$.map(counter => [["counter"], counter]));
        const middleware = state => next => payload => {
            expect(payload.type).toEqual("add");
            next();
        };
        const state$ = createState(rootReducer$, [middleware], Rx.Observable.of({ counter: 10 }));

        add.send(1);

        state$.toArray().subscribe((results) => {
            expect(results).toEqual([
                { counter: 11 },
                { counter: 13 },
            ])
        });

        add.send(2);
        add.subject$.complete();

    });

});
