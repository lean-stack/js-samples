
const $btn = document.getElementById('btn-new');
const $txt = document.getElementById('new-todo');
const $lst = document.getElementById('todos');

$btn.addEventListener('click', () => {

    var li = `<li>${$txt.value}</li>`;
    $lst.insertAdjacentHTML('beforeend', li);
    $txt.value = '';
});

navigator.serviceWorker.register('service-worker.js').then(function(reg) {
    // registration worked
    console.log('Registration succeeded. Scope is ' + reg.scope);
  });
