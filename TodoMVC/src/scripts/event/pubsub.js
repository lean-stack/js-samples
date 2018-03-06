
const factory = () => {
    const subscribers = new Map();

    const subscribe = (eventname, fn) => {
        if (!subscribers.has(eventname)) subscribers.set(eventname, new Set());
        const eventSubscriptions = subscribers.get(eventname);
        eventSubscriptions.add(fn);

        return () => eventSubscriptions.delete(fn);
    };

    const publish = (eventname, payload) => {
        if (subscribers.has(eventname)) {
            subscribers.get(eventname).forEach( (fn) => {
                setTimeout(fn(payload), 0);
            });
        }
    };

    return Object.freeze({subscribe, publish});
};

export default factory();
