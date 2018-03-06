
const $todoCount = document.querySelector('.todo-count');
const $todoList = document.querySelector('.todo-list');
const $main = document.querySelector('.main');
const $footer = document.querySelector('.footer');
const $clearCompleted = document.querySelector('.clear-completed');
const $toggleAll = document.querySelector('.toggle-all');

export default class View {

    constructor(eventbus) {

        eventbus.subscribe('state.change', this.renderUI);

    }

    renderUI(state) {

        // Render list
        const listHtml = state.todos.reduce( (html, todo) => {

            html += `
                <!-- These are here just to show the structure of the list items -->
                <!-- List items should get the class 'editing' when editing and 'completed' when marked as completed -->
                <li data-id="${todo.id}" class="${todo.completed ? 'completed' : ''}">
                    <div class="view">
                        <input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''}>
                        <label>${todo.txt}</label>
                        <button class="destroy"></button>
                    </div>
                    <input class="edit" value="${todo.txt}">
                </li>
            `;

            return html;
        }, '');
        $todoList.innerHTML = listHtml;

        $todoCount.innerHTML = `
            <strong>${state.remainingCount}</strong>
            item${state.remainingCount !== 1 ? 's' :'' } left    
        `;

        if (state.todos.length == 0) {
            $main.classList.add('hidden');
            $footer.classList.add('hidden');
        } else {
            $main.classList.remove('hidden');
            $footer.classList.remove('hidden');
        }

        if (state.hasCompleted) {
            $clearCompleted.classList.remove('hidden');
        } else {
            $clearCompleted.classList.add('hidden');
        }

        $toggleAll.checked = state.allCompleted;
    }

};