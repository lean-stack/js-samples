
var factory = function factory() {
    var subscribers = new Map();

    var subscribe = function subscribe(eventname, fn) {
        if (!subscribers.has(eventname)) subscribers.set(eventname, new Set());
        var eventSubscriptions = subscribers.get(eventname);
        eventSubscriptions.add(fn);

        return function () {
            return eventSubscriptions.delete(fn);
        };
    };

    var publish = function publish(eventname, payload) {
        if (subscribers.has(eventname)) {
            subscribers.get(eventname).forEach(function (fn) {
                setTimeout(fn(payload), 0);
            });
        }
    };

    return Object.freeze({ subscribe: subscribe, publish: publish });
};

export default factory();