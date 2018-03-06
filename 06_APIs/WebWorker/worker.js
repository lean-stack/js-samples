
console.log('Worker is running ...');

const apiUrl = 'https://api.github.com/users/lean-stack/repos?per_page=10';

const actions = {
    loadRepos:  async () => {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    }
}

self.onmessage = function(ev) {
    var msg = ev.data;

    actions[msg.action]().then( (data) => {

        self.postMessage( { action: msg.action + 'Resp', payload: data });

    });
}



