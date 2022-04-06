const input = document.querySelector('.form .input');
const addBtn = document.querySelector('.form .add');
const tasksDiv = document.querySelector('.tasks');

let tasksArray = [];

// check if localStorage has tasks
if (localStorage.getItem('tasks')) {
	tasksArray = JSON.parse(localStorage.getItem('tasks'));
}

// hide tasksDiv if there are no tasks
renderTaskDiv();

addBtn.addEventListener('click', () => {
	// console.log('clicked');
	if (input.value !== '') {
		addTasksToArray(input.value);
		input.value = '';
	}
});

addTasksToArray = (t) => {
	const task = {
		id: Date.now(), //generate unique id
		description: t,
		completed: false,
	};
	tasksArray.push(task);
	// console.log(tasksArray);
	localStorage.setItem('tasks', JSON.stringify(tasksArray));
	renderTaskDiv();
};

tasksDiv.addEventListener('click', (e) => {
	// delete task
	if (e.target.classList.contains('delete')) {
		// console.log('delete clicked');
		const id = e.target.parentElement.getAttribute('data-id');
		for (let i = 0; i < tasksArray.length; i++) {
			if (tasksArray[i].id == id) {
				tasksArray.splice(i, 1);
			}
		}
		localStorage.setItem('tasks', JSON.stringify(tasksArray));
		renderTaskDiv();
	}
	// update task status
	if (e.target.parentElement.classList.contains('task')) {
		const id = e.target.parentElement.getAttribute('data-id');
		for (let i = 0; i < tasksArray.length; i++) {
			if (tasksArray[i].id == id) {
				e.target.classList.toggle('finished');
				tasksArray[i].completed == false
					? (tasksArray[i].completed = true)
					: (tasksArray[i].completed = false);
				localStorage.setItem('tasks', JSON.stringify(tasksArray));
			}
		}
	}
});

// appear/disappear tasks in the page
function renderTasks() {
	tasksDiv.innerHTML = '';
	tasksArray.forEach((task) => {
		const taskDiv = document.createElement('div');
		taskDiv.classList.add('task');
		taskDiv.setAttribute('data-id', task.id);
		taskDiv.innerHTML = `<span class="description">${task.description}</span>
		<input type="submit" value="delete" class="delete">
    `;
		tasksDiv.appendChild(taskDiv);
		if (task.completed) {
			taskDiv
				.querySelector('.description')
				.classList.add('finished');
		}
	});
	const clearBtn = document.createElement('input');
	clearBtn.type = 'submit';
	clearBtn.value = 'clear all tasks';
	clearBtn.classList.add('clear');
	tasksDiv.appendChild(clearBtn);
	clearBtn.addEventListener('click', () => {
		tasksArray = [];
		localStorage.setItem('tasks', JSON.stringify(tasksArray));
		renderTaskDiv();
	});
}

function renderTaskDiv() {
	if (tasksArray.length > 0) {
		tasksDiv.classList.remove('hide');
		renderTasks();
	} else {
		tasksDiv.classList.add('hide');
	}
}
