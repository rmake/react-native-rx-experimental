
import { createState } from "./RxState";
import Rx from "rxjs";

describe("RxState", () => {

    it("createState creates reactive state using scoped reducer", () => {
        const add$ = new Rx.Subject();
        const counterReducer$ = add$.map(payload => state => state + payload);
        const rootReducer$ = counterReducer$.map(counter => ["counter", counter]);
        const state$ = createState(rootReducer$, Rx.Observable.of({ counter: 10 }));

        add$.next(1);
        state$.toArray().subscribe((results) => {
            expect(results).toEqual([
                { counter: 10 },
                { counter: 12 },
            ])
        });

        add$.next(2);
        add$.complete();

    });

});
