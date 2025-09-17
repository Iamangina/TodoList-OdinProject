
export function newTask(){

    let mainBox = document.querySelector('.mainBox');

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
        todoTitle.placeholder = 'Title: ...';
        todoMain.appendChild(todoTitle);

        let todoDetails = document.createElement('input');
        todoDetails.type = 'text';
        todoDetails.id = 'todoDetails';
        todoDetails.name = 'todoDetails';
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

        let add = document.createElement('button');
        add.className = 'btnAdd';
        add.textContent = 'ADD';
        todoFooter.appendChild(add);

        todoBox.appendChild(todoFooter);
        todoBox.appendChild(todoMain);
        newTaskMain.appendChild(todoBox);
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
        
        let add = document.createElement('button');
        add.className = 'btnProAdd';
        add.textContent = 'ADD';
        projectBox.appendChild(add);

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
        noteBox.appendChild(noteTitle);
        let noteDetails = document.createElement('input');
        noteDetails.type = 'text';
        noteDetails.id = 'noteTitle';
        noteDetails.name = 'noteDetails';
        noteDetails.placeholder = 'Details: ...';
        noteBox.appendChild(noteDetails);

        let add = document.createElement('button');
        add.className = 'btnNoteAdd';
        add.textContent = 'ADD';
        noteBox.appendChild(add);

        newTaskMain.appendChild(noteBox);
    })
    
    mainBox.appendChild(newTaskBox);
}