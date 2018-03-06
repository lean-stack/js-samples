
const apiUrl = 'https://api.github.com/users/lean-stack/repos?per_page=10';


/*
const loadRepositories = () => {

    return new Promise((resolve) => {
        fetch(apiUrl)
        .then( (response) => {

            return response.json();
        })
        .then( (data) => {

            resolve(data.length);

        });
    }); 
};

loadRepositories().then(anzahl => { count = anzahl; console.log(count); });
*/

let repos = [];

const loadRepositories = async () => {
        const response = await fetch(apiUrl);
        const data = await response.json();

        repos = data;

        return repos;
};

const loadData = async (url) => {
    
    const response = await fetch(url);
    const data = await response.json();
    return data;

};


const $ul = document.getElementById('repos');
const $details = document.getElementById('details');

function renderUI () {

    $ul.innerHTML = '';
    for (const repo of repos) {
        const li = `<li><a data-id="${repo.id}" href="#">${repo.name}</a></li>`;
        $ul.insertAdjacentHTML('beforeend', li);
    }
 }

$ul.addEventListener('click', async (ev) => {
    
    if (ev.target.matches('[data-id]')) {
        var id = ev.target.getAttribute('data-id');

        const repo = repos.find( r => r.id == id);

        const commits = await loadData(repo.url + '/commits');
        const issues = await loadData(repo.url + '/issues');

        const html = `Commits: ${commits.length}<br>Issues: ${issues.length}`;
        $details.innerHTML = html;
    }
});

 // Main
 renderUI();
 loadRepositories().then(renderUI);
