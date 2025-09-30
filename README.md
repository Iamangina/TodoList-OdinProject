To-Do Web Application

https://iamangina.github.io/TodoList-OdinProject/

This is a JavaScript To-Do Application that allows users to manage tasks, notes, and projects. The app supports adding, editing, and deleting tasks, notes, and project tasks, and it persists all data using LocalStorage.

//Features

1.Task Management

    -Add tasks with a title, details, due date, and priority (low, medium, high).

    -Tasks are categorized into:

        --Home

        --Today

        --Upcoming

    -View task details in a popup.

    -Delete tasks.

2.Project Management

    -Create multiple projects with unique names.

    -Add tasks to specific projects.

    -Delete projects and their tasks.

    -View project tasks in a dedicated project container.

3.Notes

    -Add notes with a title and description.

    -Delete notes individually.

4.Persistent Storage

    -All tasks, notes, and projects are saved to LocalStorage.

    -Data is automatically loaded on page reload.

5.UI Features

    -Side navigation bar with buttons for Home, Today, Upcoming, Notes, and Projects.

    -Visual priority indicators for tasks (color-coded).

    -Responsive main content area with dynamic containers.

    -Popups for adding new tasks, projects, and notes.

How It Works
1. Initialization

The app creates the main sidebar (sidebox) with navigation buttons and a + button to add new tasks.

Main containers are created dynamically:

-homeContainer

-todayContainer

-upcomingContainer

-notesContainer

-projectContainers (dynamic)

2. Adding Tasks, Notes, and Projects

Clicking the + button opens the newTask() popup.

Users can choose:

-To Do – Add tasks with title, details, date, and priority.

-Project – Create a new project.

-Note – Add notes with title and details.

Tasks can also be added directly to projects using newProjectTask().

3. Displaying Tasks

Tasks for today are displayed in todayContainer, future tasks in upcomingContainer, and all tasks in homeContainer.

Each task has a Details button to view additional information in a popup.

Tasks can be deleted individually, which also updates LocalStorage.

4. Projects

Projects are created dynamically with a corresponding container.

Clicking on a project button displays its tasks.

Tasks inside projects have their own add and delete functionality.

5. Notes

Notes are stored in notesContainer.

Each note has a delete button.

6. LocalStorage

saveToLocalStorage() saves tasks, notes, and projects in JSON format.

loadFromLocalStorage() restores data on page load.

Default projects ("Study" and "Gym") are created if LocalStorage is empty.