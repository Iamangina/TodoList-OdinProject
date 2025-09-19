import {createNewProject} from './index.js';
export function newTask(){

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

            /*let todoParagraph = document.createElement('p');
            todoParagraph.textContent = details;
            todoParagraph.className = 'todoParagraph';
            textTodo.appendChild(todoParagraph);*/
            singleTodo.appendChild(textTodo);

            let dateTodo = document.createElement('p');
            dateTodo.textContent = date;
            dateTodo.className = 'dateTodo';
            singleTodo.appendChild(dateTodo);

            let btnTodo = document.createElement('div');
            btnTodo.className = 'btnTodo';

            let editTodo = document.createElement('button');
            editTodo.textContent = 'EDIT';
            editTodo.className = 'editTodo';
            btnTodo.appendChild(editTodo);

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
            })

            let cloneDelete = clone.querySelector('.todoDelete');
            cloneDelete.addEventListener("click", function(){
                clone.remove();
                singleTodo.remove();
            });

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
            })

            document.querySelector('.notesContainer').appendChild(singleNote);

            noteTitle.value = '';
            noteDetails.value = '';
        })
    })
    
    body.appendChild(newTaskBox);
}