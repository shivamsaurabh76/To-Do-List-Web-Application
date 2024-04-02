// Check if there are tasks in local storage and load them
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
const tasksList = document.getElementById('tasksList');
const taskInput = document.getElementById('taskInput');

// Function to display tasks
function renderTasks(tasks = savedTasks) {
    // Reference to the task list element in the HTML
    // Clear the existing tasks in the list
    tasksList.innerHTML = '';
    // Iterate through each task and create HTML elements to represent them
    tasks.forEach((task, index) => {
        // Create a list item for the task
        const listItem = document.createElement('li');
        // Apply Bootstrap classes for styling
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        // Create a span element for the task text
        const taskText = document.createElement('span');
        // Apply a class for styling completed tasks (if completed)
        taskText.className = `task-text ${task.completed ? 'completed' : ''}`;
        taskText.innerText = task.text;


        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'btn-group';
        // Create an 'Edit' button
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-warning btn-sm me-2';
        editButton.innerText = 'Edit';
        // Set the 'Edit' button click event to the editTask function with the current index
        editButton.onclick = () => editTask(index);

        // Create a 'Complete' or 'Undo' button based on task completion status
        const completeButton = document.createElement('button');
        completeButton.className = `btn ${task.completed ? 'btn-secondary' : 'btn-success'} btn-sm me-2`;
        completeButton.innerText = task.completed ? 'Undo' : 'Complete';
        // Set the 'Complete'/'Undo' button click event to the markCompleted function with the current index
        completeButton.onclick = () => markCompleted(index);

        // Create a 'Delete' button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.innerText = 'Delete';
        // Set the 'Delete' button click event to the deleteTask function with the current index
        deleteButton.onclick = () => deleteTask(index);


        buttonGroup.appendChild(editButton);
        buttonGroup.appendChild(completeButton);
        buttonGroup.appendChild(deleteButton);
        // Append the created elements to the list item
        listItem.appendChild(taskText);
        listItem.appendChild(buttonGroup);

        // Append the list item to the task list
        tasksList.appendChild(listItem);
    });
}

// Function to add a new task
function addTask() {
    // Get the trimmed value of the task input
    const taskText = taskInput.value.trim();

    // Check if the trimmed task text is empty
    if (taskText === '') {
        // If the task text is empty, return (do nothing)
        return;
    }

    // Create a new task object with the task text and 'completed' set to false
    savedTasks.push({ text: taskText, completed: false });
    // Update the local storage with the modified savedTasks array
    localStorage.setItem('tasks', JSON.stringify(savedTasks));

    // Call the renderTasks function to update the displayed tasks on the page
    renderTasks();

   // Clear the input field after adding the task
    taskInput.value = '';
}

// Function to mark a task as completed
function markCompleted(index) {
    // Toggle the 'completed' property of the task at the specified index
    savedTasks[index].completed = !savedTasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
    renderTasks();
}

// Function to delete a task
function deleteTask(index) {
    // Remove one element at the specified index from the savedTasks array
    savedTasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
    renderTasks();
}

// Function to edit a task
function editTask(index) {
    // Get the task text element associated with the specified index
    const taskTextElement = document.querySelectorAll('.task-text')[index];
    // Prompt the user to edit the task, displaying the current text as the default value
    const newText = prompt('Edit task:', taskTextElement.innerText);

    // Check if the user clicked "Cancel" or entered an empty string
    if (newText !== null && newText !== '') {
        // Update the text of the task in the savedTasks array
        savedTasks[index].text = newText;
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        renderTasks();
    }
}

// Function to filter tasks based on status
function filterTasks(status) {
    let filteredTasks;

    switch (status) {
        case 'all':
            filteredTasks = savedTasks;
            break;
        case 'active':
            filteredTasks = savedTasks.filter(task => !task.completed);
            break;
        case 'completed':
            filteredTasks = savedTasks.filter(task => task.completed);
            break;
        default:
            filteredTasks = savedTasks;
    }

    renderTasks(filteredTasks);
}

// Initial displaying of tasks
renderTasks();
