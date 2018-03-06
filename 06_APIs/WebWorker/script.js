

const worker = new Worker('worker.js');

worker.postMessage( { action: 'loadRepos' });

worker.addEventListener('message',function(ev) {

    console.log(ev.data);
});

