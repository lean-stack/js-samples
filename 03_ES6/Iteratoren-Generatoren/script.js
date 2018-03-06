
const liste = {
    length: 3,
    values: [ "Tom", "Fred", "Max"],
    [Symbol.iterator]: makeIterator
}

function makeIterator() {
    let ix = 0;
    return {
        next: () => { 
            return ix < this.values.length ? 
           { value: this.values[ix++], done: false } :
           { done: true } 
    }};
}

// Generator
function * makeIt1() {
    yield 1;
    yield 2;
}

function * makeIt2() {
    for( const v of liste.values) {
        yield v;
    }
    yield 'Last';
}

function * makeIt() {
    yield * liste.values;
}

for( const v of liste) {
    console.log(v);
}
