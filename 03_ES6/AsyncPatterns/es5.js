// https://www.amazeelabs.com/en/blog/History-of-Async


/* 
setTimeout(() => console.log('hi'), 1000);
setTimeout(() => console.log('hi'), 2000);
setTimeout(() => console.log('hi'), 3000);
*/

// Nested callbacks
/*
setTimeout(() => {
    console.log('hi')
    setTimeout(() => {
      console.log('hi')
      setTimeout(() => {
        console.log('hi')
      }, 1000)
    }, 2000)
  }, 3000)
*/

// Promises
const promiseTimeout = delay => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`hi after ${delay}ms`);resolve();
        }, delay);
    });
};
/*
promiseTimeout(1000)
.then( () => { return promiseTimeout(2000) })
.then( () => { return promiseTimeout(3000) });
*/

// Generator
function* gen() {
    var p = yield promiseTimeout(1000);

    yield promiseTimeout(2000);
    yield promiseTimeout(3000);
}

const asyncify = generatorFn => {
    const myIterator = generatorFn();
    // recursive function that continue to feed itself
    // yielded Promises until there are none left
    const runNext = ({ value, done }) => {
        if (done) return;
        value.then(() => runNext(myIterator.next()));
    };
    runNext(myIterator.next());
};

/*
const timer = () => { asyncify(gen); };
  timer();
*/

async function add(a, b) {
    return new Promise((resolve, reject) => {
        if (b > 40) throw new Error('Ups');
        setTimeout(() => {
            // if (b > 40) reject('So hoch kann ich nicht rechnen');

            resolve(a + b);
        }, 1000);
    });
}

async function calculateAdditions() {
    try {
        var firstResult = await add(17, 4);
        var second = await add(firstResult, 8);
        var endResult = await add(second, 47);
        console.log(endResult);
    } catch (error) {
        console.log(error);
    }
}

calculateAdditions();
