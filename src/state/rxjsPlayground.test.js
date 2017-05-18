import Rx from "rxjs";

const logHelper = (logEnabled, callback) => {
    let altConsole = {
        log: (text) => {
            logEnabled && console.log(text);
        }
    }
    callback(altConsole)
}
describe("rx playground", () => {
    it("fromArray", () => {

        logHelper(false, (console) => {
            let a = [1, 2, 3];

            let source = Rx.Observable.from(a);
            let mapped = source.map((x) => {
                consoleLog(`map x ${x}`);
                return x + 10;
            });

            console.log(`pre subscribe`);

            let i = 0;
            mapped.subscribe((x) => {
                console.log(`next ${x}`);
                expect(x).toEqual(a[i] + 10);
                i++;
            }, (err) => {
                console.log(`err ${err}`);
            }, () => {
                console.log(`completed`);
            });
        });

    });

    it("publishReplay", () => {

        logHelper(false, (console) => {
            let a = [1, 2, 3, 4];

            let source = new Rx.Subject();

            let mapped = source.map((x) => {
                console.log(`map x ${x}`);
                return x + 10;
            });

            console.log("pre published");

            let published = mapped.publishReplay(1);

            console.log("post published");

            let refCounted = published.refCount();

            a.forEach((v) => {
                source.next(v);
            });

            let i = 0;
            refCounted.subscribe((x) => {
                console.log(`next ${x}`);
                expect(x).toEqual(a[i] + 10);
                i++;
            }, (err) => {
                console.log(`err ${err}`);
            }, () => {
                console.log(`completed`);
            });

            a.forEach((v) => {
                console.log(`pre next ${v}`);
                source.next(v);
            });

            refCounted.subscribe((x) => {
                console.log(`last next ${x}`);
            }, (err) => {
                console.log(`last err ${err}`);
            }, () => {
                console.log(`last completed`);
            });

            source.complete();


        });

    });

    it("merge", () => {

        logHelper(false, (console) => {
            let state = { v1: 1 };

            let source0 = new Rx.Subject();
            let source1 = new Rx.Subject();

            let map0 = source0.map(h => state => {
                console.log(`state ${JSON.stringify(state)}`);
                console.log(`h ${JSON.stringify(h)}`);
                return ({ ...state, v0: (state.v0 || 0) + h.v * 1});
            });
            let map1 = source1.map(h => state =>
                ({ ...state, v1: (state.v1 || 0) + h.v * 2}));

            let merged = Rx.Observable.of(state).merge(
                map0,
                map1,
            ).scan((state, reducer) => {
                console.log("reduce h");
                console.log("  " + JSON.stringify(reducer(state)));
                return reducer(state);
            });

            merged.subscribe((x) => {
                console.log("merged");
                console.log("  " + JSON.stringify(x));
            });

            map0.next({ v: 1});
            map1.next({ v: 2});

        });

    });

    it("reducer like", () => {

        logHelper(false, (console) => {
            let subject$ = new Rx.Subject();
            let reducer$ = Rx.Observable.of(() => ({name: "test"})).merge(
                subject$.map(payload => state => {
                    console.log("reducer");
                    console.log(JSON.stringify(payload));
                    console.log(JSON.stringify(state));
                    return state;
                }),
            );

            reducer$.subscribe((reducer) => {
                var result = reducer();
                console.log("result");
                console.log(JSON.stringify(result));
            });


            subject$.next({name: "aaa"});

            Rx.Observable.of(() => ({name: "test"})).subscribe((x) => {
                console.log("x");
                console.log(x);
                console.log(JSON.stringify(x()));
            });

        });

    });

});
