export function newProjectTask() {
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
            })

        document.querySelector('.mainProjectBox').appendChild(singleTask);

            projectTitle.value = '';
            projectDetails.value = '';
    })

    body.appendChild(newProjectTaskBox);
}