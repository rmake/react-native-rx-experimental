import Rx from "rxjs";

const logHelper = (logEnabled, callback) => {
    var altConsole = {
        log: (text) => {
            logEnabled && console.log(text);
        }
    }
    callback(altConsole)
}
describe("rx playground", () => {
    it("fromArray", () => {

        logHelper(false, (console) => {
            var a = [1, 2, 3];

            var source = Rx.Observable.from(a);
            var mapped = source.map((x) => {
                consoleLog(`map x ${x}`);
                return x + 10;
            });

            console.log(`pre subscribe`);

            var i = 0;
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
            var a = [1, 2, 3, 4];

            var source = new Rx.Subject();

            var mapped = source.map((x) => {
                console.log(`map x ${x}`);
                return x + 10;
            });

            console.log("pre published");

            var published = mapped.publishReplay(1);

            console.log("post published");

            var refCounted = published.refCount();

            a.forEach((v) => {
                source.next(v);
            });

            var i = 0;
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

});
