
import { createState } from "./rxState";
import Rx from "rxjs";

describe("RxState", () => {

    it("createState creates reactive state using scoped reducer", () => {
        const add$ = new Rx.Subject();
        //const counterReducer$ = add$.map(payload => state => state + payload);
        const counterReducer$ = add$.map(payload => [payload, state => state + payload] );
        const rootReducer$ = Rx.Observable.zip(counterReducer$.map(counter => [["counter"], counter]));
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

});
