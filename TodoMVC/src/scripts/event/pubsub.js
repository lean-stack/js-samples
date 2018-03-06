// See https://gist.github.com/learncodeacademy/777349747d8382bfb722

const factory = () => {
    const subscribers = new Map();

    console.log("EventBus Factory");
    
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
