// IMPORTING CSS FILES
import "./style.css";
import "./newTaskStyle.css";
import "./newProjectTask.css";

let currentProjectContainer = null;

//SAVE ALL DATA TO LOCALSTORAGE
function saveToLocalStorage() {
    let homeTasks = [];
    document.querySelectorAll('.homeContainer .singleTodo').forEach(function(el){
        let task = {
            title: el.querySelector('.todoHeading').textContent,
            date: el.querySelector('.dateTodo').textContent,
            priority: el.style.borderLeft,
            details: el.dataset.details || ''
        };
        homeTasks.push(task);
    });

    let todayTasks = [];
    document.querySelectorAll('.todayContainer .singleTodo').forEach(function(el){
        let task = {
            title: el.querySelector('.todoHeading').textContent,
            date: el.querySelector('.dateTodo').textContent,
            priority: el.style.borderLeft,
            details: el.dataset.details || ''
        };
        todayTasks.push(task);
    });

    let upcomingTasks = [];
    document.querySelectorAll('.upcomingContainer .singleTodo').forEach(function(el){
        let task = {
            title: el.querySelector('.todoHeading').textContent,
            date: el.querySelector('.dateTodo').textContent,
            priority: el.style.borderLeft,
            details: el.dataset.details || ''
        };
        upcomingTasks.push(task);
    });

    let notes = [];
    document.querySelectorAll('.notesContainer .singleNote').forEach(function(el){
        let note = {
            title: el.querySelector('h3').textContent,
            details: el.querySelector('p').textContent
        };
        notes.push(note);
    });

    let projects = [];
    projectContainers.forEach(function(container, index){
        let projectBtn = document.querySelectorAll('.project')[index];
        if(projectBtn){
            let proj = { name: projectBtn.textContent, tasks: [] };
            container.querySelectorAll('.singleTask').forEach(function(task){
                proj.tasks.push({
                    title: task.querySelector('.taskHeading').textContent,
                    details: task.querySelector('.taskParagraph').textContent
                });
            });
            projects.push(proj);
        }
    });

    let data = {
        homeTasks: homeTasks,
        todayTasks: todayTasks,
        upcomingTasks: upcomingTasks,
        notes: notes,
        projects: projects
    };

    localStorage.setItem('todoAppData', JSON.stringify(data));
}
// LOAD ALL DATA FROM LOCALSTORAGE
function loadFromLocalStorage() {
    let data = JSON.parse(localStorage.getItem('todoAppData'));

    //IF NO DATA EXISTS, CREATE DEFAULT PROJECTS
    if (!data) {
        createNewProject("Study");
        createNewProject("Gym");
        saveToLocalStorage();
        return;
    }

    data.homeTasks.forEach(function(todo){
        addTodoFromStorage(todo, 'homeContainer');
    });

    data.todayTasks.forEach(function(todo){
        addTodoFromStorage(todo, 'todayContainer');
    });

    data.upcomingTasks.forEach(function(todo){
        addTodoFromStorage(todo, 'upcomingContainer');
    });

    data.notes.forEach(function(note){
        addNoteFromStorage(note);
    });

    data.projects.forEach(function(project){
        createNewProject(project.name);
        let container = projectContainers[projectContainers.length - 1];
        project.tasks.forEach(function(task){
            addProjectTaskFromStorage(task, container);
        });
    });
}
//ADD A TASK FROM LOCALSTORAGE TO A SPECIFIC CONTAINER
function addTodoFromStorage(todo, containerClass) {
    let container = document.querySelector('.' + containerClass);

    let singleTodo = document.createElement('div');
    singleTodo.className = 'singleTodo';

    let textTodo = document.createElement('div');
    textTodo.className = 'textTodo';

    let todoHeading = document.createElement('h3');
    todoHeading.className = 'todoHeading';
    todoHeading.textContent = todo.title;
    textTodo.appendChild(todoHeading);

    singleTodo.appendChild(textTodo);

    let dateTodo = document.createElement('p');
    dateTodo.textContent = todo.date;
    dateTodo.className = 'dateTodo';
    singleTodo.appendChild(dateTodo);

    let btnTodo = document.createElement('div');
    btnTodo.className = 'btnTodo';

    let detailsTodo = document.createElement('button');
    detailsTodo.textContent = 'DETAILS';
    detailsTodo.className = 'detailsTodo';
    btnTodo.appendChild(detailsTodo);

    let todoDelete = document.createElement('button');
    todoDelete.textContent = 'X';
    todoDelete.className = 'todoDelete';
    btnTodo.appendChild(todoDelete);

    singleTodo.appendChild(btnTodo);

    singleTodo.style.borderLeft = todo.priority || '3px solid black';

    detailsTodo.addEventListener("click", function(){
        let detailsBox = document.createElement('div');
        detailsBox.className = 'detailsBox';

        let detailsHeading = document.createElement('div');
        detailsHeading.className = 'detailsHeading';

        let detailsTitle = document.createElement('h3');
        detailsTitle.textContent = todo.title;
        detailsHeading.appendChild(detailsTitle);

        let detailsExit = document.createElement('button');
        detailsExit.className = 'detailsExit';
        detailsExit.textContent = 'X';
        detailsHeading.appendChild(detailsExit);

        detailsBox.appendChild(detailsHeading);

        let detailsMain = document.createElement('p');
        detailsMain.className = 'detailsMain';
        detailsMain.textContent = todo.details;
        detailsBox.appendChild(detailsMain);

        document.querySelector('.mainBox').appendChild(detailsBox);

        detailsExit.addEventListener("click", function(){
            detailsBox.remove();
        });
    });

    todoDelete.addEventListener("click", function(){
        singleTodo.remove();
        saveToLocalStorage();
    });

    container.appendChild(singleTodo);
}
//ADD NOTE FROM STORAGE
function addNoteFromStorage(note) {
    let notesContainer = document.querySelector('.notesContainer');

    let singleNote = document.createElement('div');
    singleNote.className = 'singleNote';

    let textNote = document.createElement('div');
    textNote.className = 'textNote';

    let noteHeading = document.createElement('h3');
    noteHeading.textContent = note.title;

    let noteParagraph = document.createElement('p');
    noteParagraph.textContent = note.details;

    textNote.appendChild(noteHeading);
    textNote.appendChild(noteParagraph);
    singleNote.appendChild(textNote);

    let noteDelete = document.createElement('button');
    noteDelete.textContent = 'X';
    noteDelete.className = 'noteDelete';
    singleNote.appendChild(noteDelete);

    noteDelete.addEventListener("click", function(){
        singleNote.remove();
        saveToLocalStorage();
    });

    notesContainer.appendChild(singleNote);
}
//ADD PROJECT TASK FROM STORAGE
function addProjectTaskFromStorage(task, projectContainer) {
    let singleTask = document.createElement('div');
    singleTask.className = 'singleTask';

    let textTask = document.createElement('div');
    textTask.className = 'textTask';

    let taskHeading = document.createElement('h3');
    taskHeading.className = 'taskHeading';
    taskHeading.textContent = task.title;

    let taskParagraph = document.createElement('p');
    taskParagraph.className = 'taskParagraph';
    taskParagraph.textContent = task.details;

    textTask.appendChild(taskHeading);
    textTask.appendChild(taskParagraph);
    singleTask.appendChild(textTask);

    let taskDelete = document.createElement('button');
    taskDelete.textContent = 'X';
    taskDelete.className = 'taskDelete';
    singleTask.appendChild(taskDelete);

    taskDelete.addEventListener("click", function(){
        singleTask.remove();
        saveToLocalStorage();
    });

    projectContainer.querySelector('.mainProjectBox').appendChild(singleTask);
}

//CREATE SIDE MENU AND BUTTONS
let todoBox = document.querySelector(".todoBox");

let sidebox = document.createElement("div");
sidebox.className = "sidebox";

let logo = document.createElement("div");
logo.className = "logo";

let logoText = document.createElement("p");
logoText.textContent = "// TO-DO";

let logoImg = document.createElement("div");
logoImg.className = "logoImg";

logo.appendChild(logoText);
logo.appendChild(logoImg);

let nav = document.createElement("nav");
nav.className = "buttons";

//FUNCTION TO CREATE NAVIGATION BUTTONS
function createNavBtn (className, id, icon, textContent){
    let navBtn = document.createElement("button");
    navBtn.className = "navBtn " + className; 
    navBtn.id = id;

    let btnIcon = document.createElement('div');
    btnIcon.className = icon;
    navBtn.appendChild(btnIcon);

    let text = document.createElement('p');
    text.textContent = textContent;
    navBtn.appendChild(text);

    nav.appendChild(navBtn);
    return navBtn;
}
//CREATE MAIN NAVIGATION BUTTONS
let homeBtn = createNavBtn("home", "home", "homeIcon", "HOME");
let todayBtn = createNavBtn("today", "today", "todayIcon", "TODAY");
let upcomingBtn = createNavBtn("upcoming", "upcoming", "upcomingIcon", "UPCOMING");

//PROJECT SECTION
let projectsDiv = document.createElement("div");
projectsDiv.className = "projects";
let projectsText = document.createElement("p");
projectsText.textContent = "PROJECTS";
projectsDiv.appendChild(projectsText);
nav.appendChild(projectsDiv);

let notesBtn = createNavBtn("notes", "notes", "notesIcon", "NOTES");

let addTask = document.createElement("button");
addTask.id = "addTask";
addTask.textContent = "+";

sidebox.appendChild(logo);
sidebox.appendChild(nav);
sidebox.appendChild(addTask);

let mainBox = document.createElement("main");
mainBox.className = "mainBox";

todoBox.appendChild(sidebox);
todoBox.appendChild(mainBox);

document.body.appendChild(todoBox);

addTask.addEventListener("click", function () {
  mainBox.querySelectorAll(".newTaskBox").forEach((el) => el.remove());
  newTask();
});

//CREATE MAIN CONTENT CONTAINERS
function newContainer(classContainer, display, conTitle){
    let container = document.createElement('div');
    container.className = classContainer;
    container.style.display = display;
    let containerTitle = document.createElement('h3');
    containerTitle.textContent = conTitle;
    container.appendChild(containerTitle);
    mainBox.appendChild(container);
    return container;
}

let notesContainer = newContainer('notesContainer', 'none', 'NOTES');
let homeContainer = newContainer('homeContainer', 'flex', 'HOME');
homeContainer.style.display = "flex";
homeBtn.style.position = "relative";
homeBtn.style.boxShadow = "5px 0px 0px rgb(243, 158, 132)";
homeBtn.style.right = "5px";
let todayContainer = newContainer('todayContainer', 'none', 'TODAY');
let upcomingContainer = newContainer('upcomingContainer', 'none', 'UPCOMING');

let projectContainers = [];

//FUNCTION TO CREATE NEW PROJECT
function createNewProject(projectName) {
  let newProject = document.createElement("button");
  newProject.textContent = projectName;
  newProject.className = "project";
  projectsDiv.appendChild(newProject);

  let projectContainer = document.createElement("div");
  projectContainer.className = "projectContainer";
  projectContainer.style.display = "none";

  let projectTitle = document.createElement("h2");
  projectContainer.appendChild(projectTitle);

  let btnDeleteProject = document.createElement("button");
  btnDeleteProject.className = "btnDeleteProject";
  btnDeleteProject.textContent = "X";
  btnDeleteProject.addEventListener("click", function () {
    newProject.remove();
    projectContainer.remove();
    projectContainers = projectContainers.filter((c) => c !== projectContainer);
    saveToLocalStorage();
});
  projectContainer.appendChild(btnDeleteProject);

  let mainProjectBox = document.createElement("div");
  mainProjectBox.className = "mainProjectBox";
  projectContainer.appendChild(mainProjectBox);

  let addTaskProject = document.createElement("button");
  addTaskProject.className = "addTaskProject";
  addTaskProject.textContent = "ADD TASK";
  addTaskProject.addEventListener("click", function () {
    mainBox.querySelectorAll(".newTaskBox").forEach((el) => el.remove());
    currentProjectContainer = projectContainer;
    newProjectTask();
  });
  projectContainer.appendChild(addTaskProject);

  mainBox.appendChild(projectContainer);
  projectContainers.push(projectContainer);

  saveToLocalStorage();

  newProject.addEventListener("click", function () {
    mainBox.querySelectorAll(".newTaskBox").forEach((el) => el.style.display = "none");
    projectContainers.forEach((c) => (c.style.display = "none"));
    projectContainer.style.display = "flex";
    notesContainer.style.display = "none";
    todayContainer.style.display = "none";
    homeContainer.style.display = "none";
    upcomingContainer.style.display = "none";
    upcomingBtn.style.position = "";
    homeBtn.style.boxShadow = "";
    homeBtn.style.position = "";
    todayBtn.style.boxShadow = "";
    todayBtn.style.position = "";
    upcomingBtn.style.boxShadow = "";
    notesBtn.style.position = "";
    notesBtn.style.boxShadow = "";
    projectTitle.textContent = this.textContent;
  });
}

notesBtn.addEventListener("click", function () {
  mainBox.querySelectorAll(".newTaskBox").forEach((el) => (el.style.display = "none"));
  projectContainers.forEach((c) => (c.style.display = "none"));
  notesContainer.style.display = "flex";
  homeContainer.style.display = "none";
  todayContainer.style.display = "none";
  upcomingContainer.style.display = "none";
  notesBtn.style.position = "relative";
  notesBtn.style.boxShadow = "5px 0px 0px rgb(243, 158, 132)";
  notesBtn.style.right = "5px";
  upcomingBtn.style.position = "";
  upcomingBtn.style.boxShadow = "";
  upcomingBtn.style.right = "";
  homeBtn.style.position = "";
  homeBtn.style.boxShadow = "";
  homeBtn.style.right = "";
  todayBtn.style.position = "";
  todayBtn.style.boxShadow = "";
  todayBtn.style.right = "";
});

homeBtn.addEventListener("click", function () {
  mainBox.querySelectorAll(".newTaskBox").forEach((el) => (el.style.display = "none"));
  projectContainers.forEach((c) => (c.style.display = "none"));
  homeContainer.style.display = "flex";
  todayContainer.style.display = "none";
  notesContainer.style.display = "none";
  upcomingContainer.style.display = "none";
  homeBtn.style.position = "relative";
  homeBtn.style.boxShadow = "5px 0px 0px rgb(243, 158, 132)";
  homeBtn.style.right = "5px";
  upcomingBtn.style.position = "";
  upcomingBtn.style.boxShadow = "";
  upcomingBtn.style.right = "";
  todayBtn.style.position = "";
  todayBtn.style.boxShadow = "";
  todayBtn.style.right = "";
  notesBtn.style.position = "";
  notesBtn.style.boxShadow = "";
  notesBtn.style.right = "";
});

todayBtn.addEventListener("click", function () {
  mainBox.querySelectorAll(".newTaskBox").forEach((el) => (el.style.display = "none"));
  projectContainers.forEach((c) => (c.style.display = "none"));
  todayContainer.style.display = "flex";
  notesContainer.style.display = "none";
  upcomingContainer.style.display = "none";
  homeContainer.style.display = "none";
  todayBtn.style.position = "relative";
  todayBtn.style.boxShadow = "5px 0px 0px rgb(243, 158, 132)";
  todayBtn.style.right = "5px";
  upcomingBtn.style.position = "";
  upcomingBtn.style.boxShadow = "";
  upcomingBtn.style.right = "";
  homeBtn.style.position = "";
  homeBtn.style.boxShadow = "";
  homeBtn.style.right = "";
  notesBtn.style.position = "";
  notesBtn.style.boxShadow = "";
  notesBtn.style.right = "";
});

upcomingBtn.addEventListener("click", function () {
  mainBox.querySelectorAll(".newTaskBox").forEach((el) => (el.style.display = "none"));
  projectContainers.forEach((c) => (c.style.display = "none"));
  upcomingContainer.style.display = "flex";
  notesContainer.style.display = "none";
  todayContainer.style.display = "none";
  homeContainer.style.display = "none";
  upcomingBtn.style.position = "relative";
  upcomingBtn.style.boxShadow = "5px 0px 0px rgb(243, 158, 132)";
  upcomingBtn.style.right = "5px";
  homeBtn.style.position = "";
  homeBtn.style.boxShadow = "";
  homeBtn.style.right = "";
  todayBtn.style.position = "";
  todayBtn.style.boxShadow = "";
  todayBtn.style.right = "";
  notesBtn.style.position = "";
  notesBtn.style.boxShadow = "";
  notesBtn.style.right = "";
});
//NEW TASK POPUP 
function newTask(){
    let body = document.querySelector('body');

    let newTaskBox = document.createElement('div');
    newTaskBox.className = 'newTaskBox';

    let newTaskHeader = document.createElement('header');
    newTaskHeader.className = 'newTaskHeader';
    let headerText = document.createElement('p');
    headerText.textContent = 'CREATE A NEW ...';
    headerText.className = 'headerText';
    newTaskHeader.appendChild(headerText);
    let headerExit = document.createElement('button');
    headerExit.textContent = 'X';
    headerExit.className = 'headerExit';
    newTaskHeader.appendChild(headerExit);
    newTaskBox.appendChild(newTaskHeader);

    let newTaskSide = document.createElement('aside');
    newTaskSide.className = 'newTaskSide';
    let newTodo = document.createElement('button');
    newTodo.textContent = 'To Do...';
    newTodo.className = 'btnTask';
    newTaskSide.appendChild(newTodo);
    let newProject = document.createElement('button');
    newProject.textContent = 'Project...';
    newProject.className = 'btnTask';
    newTaskSide.appendChild(newProject);
    let newNote = document.createElement('button');
    newNote.textContent = 'Note...';
    newNote.className = 'btnTask';
    newTaskSide.appendChild(newNote);

    newTaskBox.appendChild(newTaskSide);

    let newTaskMain = document.createElement("main");
    newTaskMain.className = "taskMain";
    newTaskBox.appendChild(newTaskMain);


    headerExit.addEventListener("click", function(){
        newTaskBox.style.display = 'none';
    })

    newTodo.addEventListener("click", function(){

        newTaskMain.textContent= '';
        
        let todoBox = document.createElement('div');
        todoBox.className = 'todo';
        let todoMain = document.createElement('main');
        todoMain.className = 'todoMain';

        let todoTitle = document.createElement('input');
        todoTitle.type = 'text';
        todoTitle.id = 'todoTitle';
        todoTitle.name = 'todoTitle';
        todoTitle.maxLength = '15';
        todoTitle.placeholder = 'Title: ...';
        todoMain.appendChild(todoTitle);

        let todoDetails = document.createElement('input');
        todoDetails.type = 'text';
        todoDetails.id = 'todoDetails';
        todoDetails.name = 'todoDetails';
        todoDetails.maxLength = '65';
        todoDetails.placeholder = 'Details: ...';
        todoMain.appendChild(todoDetails);

        let todoFooter = document.createElement('footer');
        todoFooter.className = 'todoFooter';

        let todoDate = document.createElement('input');
        todoDate.type = 'date';
        todoDate.id = 'todoDate';
        todoDate.name = 'todoDate';
        todoFooter.appendChild(todoDate);

        let priority = document.createElement('div');
        priority.className = 'priority';

        let lowPriority = document.createElement('input');
        lowPriority.type = 'radio';
        lowPriority.name = 'priority';
        lowPriority.id = 'low';
        lowPriority.value = 'low';
        let lowText = document.createElement('label');
        lowText.for = 'low';
        lowText.textContent = 'LOW';

        let mediumPriority = document.createElement('input');
        mediumPriority.type = 'radio';
        mediumPriority.name = 'priority';
        mediumPriority.id = 'medium';
        mediumPriority.value = 'medium';
        let mediumText = document.createElement('label');
        mediumText.for = 'medium';
        mediumText.textContent = 'MEDIUM';

        let highPriority = document.createElement('input');
        highPriority.type = 'radio';
        highPriority.name = 'priority';
        highPriority.id = 'high';
        highPriority.value = 'high';
        let highText = document.createElement('label');
        highText.for = 'high';
        highText.textContent = 'HIGH';

        priority.appendChild(lowPriority);
        priority.appendChild(lowText);
        priority.appendChild(mediumPriority);
        priority.appendChild(mediumText);
        priority.appendChild(highPriority);
        priority.appendChild(highText);

        todoFooter.appendChild(priority);

        let addTodo = document.createElement('button');
        addTodo.className = 'btnAdd';
        addTodo.textContent = 'ADD';
        todoFooter.appendChild(addTodo);

        todoBox.appendChild(todoFooter);
        todoBox.appendChild(todoMain);
        newTaskMain.appendChild(todoBox);

        addTodo.addEventListener("click", function(){
            let title = todoTitle.value;
            let details = todoDetails.value;
            let date = todoDate.value;
            let today = new Date().toISOString().split("T")[0];

            let singleTodo = document.createElement('div');
            singleTodo.className = 'singleTodo';
            let textTodo = document.createElement('div');
            textTodo.className = 'textTodo';
            let todoHeading = document.createElement('h3');
            todoHeading.className = 'todoHeading';
            todoHeading.textContent = title;
            
            textTodo.appendChild(todoHeading);
            singleTodo.appendChild(textTodo);

            let dateTodo = document.createElement('p');
            dateTodo.textContent = date;
            dateTodo.className = 'dateTodo';
            singleTodo.appendChild(dateTodo);

            let btnTodo = document.createElement('div');
            btnTodo.className = 'btnTodo';

            let detailsTodo = document.createElement('button');
            detailsTodo.textContent = 'DETAILS';
            detailsTodo.className = 'detailsTodo';
            btnTodo.appendChild(detailsTodo);

            detailsTodo.addEventListener("click", function(){
                
                let detailsBox = document.createElement('div');
                detailsBox.className = 'detailsBox';
                let detailsHeading = document.createElement('div');
                detailsHeading.className = 'detailsHeading';
                let detailsTitle = document.createElement('h3');
                detailsTitle.textContent = title;
                detailsHeading.appendChild(detailsTitle);
                let detailsExit = document.createElement('button');
                detailsExit.className = 'detailsExit';
                detailsExit.textContent = 'X'
                detailsHeading.appendChild(detailsExit);
                detailsBox.appendChild(detailsHeading);
                let detailsMain = document.createElement('p');
                detailsMain.className = 'detailsMain';
                detailsMain.textContent = details;
                detailsBox.appendChild(detailsMain);
                mainBox.appendChild(detailsBox);


                detailsExit.addEventListener("click", function(){
                    detailsBox.style.display = 'none';
                })
            });

            
            let todoDelete = document.createElement('button');
            todoDelete.textContent = 'X';
            todoDelete.className = 'todoDelete';
            btnTodo.appendChild(todoDelete);

            singleTodo.appendChild(btnTodo);

            let selected = document.querySelector('input[name="priority"]:checked');

            if(selected){
                if(selected.value === 'low'){
                    singleTodo.style.borderLeft = '3px solid rgb(172, 255, 130)';
                } else if(selected.value === 'medium'){
                    singleTodo.style.borderLeft = '3px solid rgb(255, 188, 99)';
                } else if(selected.value === 'high'){
                    singleTodo.style.borderLeft = '3px solid rgb(255, 122, 99)';
                } else {
                    singleTodo.style.borderLeft = '3px solid black';
                }
            }

            let clone = singleTodo.cloneNode(true);

            let cloneDetails = clone.querySelector('.detailsTodo');
                cloneDetails.addEventListener("click", function() {
                    let detailsBox = document.createElement('div');
                    detailsBox.className = 'detailsBox';

                    let detailsHeading = document.createElement('div');
                    detailsHeading.className = 'detailsHeading';

                    let detailsTitle = document.createElement('h3');
                    detailsTitle.textContent = title;
                    detailsHeading.appendChild(detailsTitle);

                    let detailsExit = document.createElement('button');
                    detailsExit.className = 'detailsExit';
                    detailsExit.textContent = 'X';
                    detailsHeading.appendChild(detailsExit);

                    detailsBox.appendChild(detailsHeading);

                    let detailsMain = document.createElement('p');
                    detailsMain.className = 'detailsMain';
                    detailsMain.textContent = details;
                    detailsBox.appendChild(detailsMain);

                    mainBox.appendChild(detailsBox);

                    detailsExit.addEventListener("click", function() {
                        detailsBox.style.display = 'none';
                    });
                });

            if(date === today) {
                document.querySelector('.todayContainer').appendChild(singleTodo);
                document.querySelector('.homeContainer').appendChild(clone);
            } else {
                document.querySelector('.upcomingContainer').appendChild(singleTodo);
                document.querySelector('.homeContainer').appendChild(clone);
            }

            todoTitle.value = '';
            todoDetails.value = '';
            todoDate.value = '';
            
            todoDelete.addEventListener("click", function(){
                singleTodo.remove();
                clone.remove();
                saveToLocalStorage()
            })

            let cloneDelete = clone.querySelector('.todoDelete');
            cloneDelete.addEventListener("click", function(){
                clone.remove();
                singleTodo.remove();
                saveToLocalStorage()
            });
            saveToLocalStorage();
        })
    });

    newProject.addEventListener("click", function(){
        newTaskMain.textContent= '';

        let projectBox = document.createElement('div');
        projectBox.className = 'projectBox';
        let projectTitle = document.createElement('input');
        projectTitle.type = 'text';
        projectTitle.id = 'projectTitle';
        projectTitle.name = 'projectTitle';
        projectTitle.placeholder = 'Title: ...';
        projectBox.appendChild(projectTitle);
        
        let addProject = document.createElement('button');
        addProject.className = 'btnProAdd';
        addProject.textContent = 'ADD';
        projectBox.appendChild(addProject);

        addProject.addEventListener("click", function(){
        createNewProject(projectTitle.value);
        saveToLocalStorage();
        })

        newTaskMain.appendChild(projectBox);
    })

    newNote.addEventListener("click", function(){
        newTaskMain.textContent= '';

        let noteBox = document.createElement('div');
        noteBox.className = 'noteBox';
        let noteTitle = document.createElement('input');
        noteTitle.type = 'text';
        noteTitle.id = 'noteTitle';
        noteTitle.name = 'noteTitle';
        noteTitle.placeholder = 'Title: ...';
        noteTitle.maxLength = '15';
        noteBox.appendChild(noteTitle);
        let noteDetails = document.createElement('input');
        noteDetails.type = 'text';
        noteDetails.id = 'noteDetails';
        noteDetails.name = 'noteDetails';
        noteDetails.placeholder = 'Details: ...';
        noteDetails.maxLength = '65';
        noteBox.appendChild(noteDetails);

        let addNote = document.createElement('button');
        addNote.className = 'btnNoteAdd';
        addNote.textContent = 'ADD';
        noteBox.appendChild(addNote);

        newTaskMain.appendChild(noteBox);

        addNote.addEventListener("click", function(){
            let title = noteTitle.value;
            let details = noteDetails.value;

            let singleNote = document.createElement('div');
            singleNote.className = 'singleNote';

            let textNote = document.createElement('div');
            textNote.className = 'textNote';
            let noteHeading = document.createElement('h3');
            noteHeading.textContent = title;
            textNote.appendChild(noteHeading);

            let noteParagraph = document.createElement('p');
            noteParagraph.textContent = details;
            textNote.appendChild(noteParagraph);
            singleNote.appendChild(textNote);

            let noteDelete = document.createElement('button');
            noteDelete.textContent = 'X';
            noteDelete.className = 'noteDelete';
            singleNote.appendChild(noteDelete);

            noteDelete.addEventListener("click", function(){
                singleNote.remove();
                saveToLocalStorage();
            })

            document.querySelector('.notesContainer').appendChild(singleNote);

            noteTitle.value = '';
            noteDetails.value = '';

            saveToLocalStorage();
        })
    })
    
    body.appendChild(newTaskBox);
}
//NEW TASK INSIDE PROJECT
function newProjectTask() {
    let body = document.querySelector('body');

    let newProjectTaskBox = document.createElement('div');
    newProjectTaskBox.className = 'newProjectTaskBox';

    let headerProject = document.createElement('div');
    headerProject.className = 'headerProject';
    let headerProjectText = document.createElement('h3');
    headerProjectText.textContent = 'NEW TASK ...';
    headerProjectText.className = 'headerProjectText';
    headerProject.appendChild(headerProjectText);
    let headerExit = document.createElement('button');
    headerExit.textContent = 'X';
    headerExit.className = 'headerExit';
    headerProject.appendChild(headerExit);

    newProjectTaskBox.appendChild(headerProject);

    headerExit.addEventListener("click", function(){
        newProjectTaskBox.style.display = 'none';
    })

    let mainProject = document.createElement('div');
    mainProject.className = 'mainProject';
    let projectTitle = document.createElement('input');
    projectTitle.className = 'inputProject';
    projectTitle.type = 'text';
    projectTitle.id = 'inputProjectTitle';
    projectTitle.name = 'projectTitle';
    projectTitle.placeholder = 'Title: ...';
    let projectDetails = document.createElement('input');
    projectDetails.className = 'inputProject';
    projectDetails.type = 'text';
    projectDetails.id = 'inputProjectDetails';
    projectDetails.name = 'projectDetails';
    projectDetails.placeholder = 'Details: ...';
    mainProject.appendChild(projectTitle);
    mainProject.appendChild(projectDetails);
    newProjectTaskBox.appendChild(mainProject);

    let btnAddTaskProject = document.createElement('button');
    btnAddTaskProject.textContent = 'ADD';
    btnAddTaskProject.className = 'btnAddTaskProject';
    newProjectTaskBox.appendChild(btnAddTaskProject);

    btnAddTaskProject.addEventListener("click", function(){
        let title = projectTitle.value;
        let details = projectDetails.value;

            let singleTask = document.createElement('div');
            singleTask.className = 'singleTask';
            let textTask = document.createElement('div');
            textTask.className = 'textTask';
            let taskHeading = document.createElement('h3');
            taskHeading.className = 'taskHeading';
            taskHeading.textContent = title;
            
            textTask.appendChild(taskHeading);

            let taskParagraph = document.createElement('p');
            taskParagraph.textContent = details;
            taskParagraph.className = 'taskParagraph';
            textTask.appendChild(taskParagraph);
            singleTask.appendChild(textTask);

            let taskDelete = document.createElement('button');
            taskDelete.textContent = 'X';
            taskDelete.className = 'taskDelete';
            singleTask.appendChild(taskDelete);

            taskDelete.addEventListener("click", function(){
                singleTask.remove();
                saveToLocalStorage();
            })

            if (currentProjectContainer) {
            currentProjectContainer.querySelector('.mainProjectBox').appendChild(singleTask);
            }

            projectTitle.value = '';
            projectDetails.value = '';

            saveToLocalStorage()
    })

    body.appendChild(newProjectTaskBox);
}
//LOAD DATA FROM LOCALSTORAGE
loadFromLocalStorage();