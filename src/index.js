import "./style.css";
import "./newTaskStyle.css";
import {newTask} from "./newTask.js";

let todoBox = document.querySelector(".todoBox");

let sidebox = document.createElement('div');
sidebox.className = 'sidebox';

let logo = document.createElement('div');
logo.className = 'logo';

let logoText = document.createElement('p');
logoText.textContent = '// TO-DO';

let logoImg = document.createElement('div');
logoImg.className = 'logoImg';

logo.appendChild(logoText);
logo.appendChild(logoImg);

let nav = document.createElement('nav');
nav.className = 'buttons';

let homeBtn = document.createElement('button');
homeBtn.className = 'navBtn';
homeBtn.id = 'home';
let homeIcon = document.createElement('div');
homeIcon.className = 'homeIcon';
homeBtn.appendChild(homeIcon);
let homeText = document.createElement('p');
homeText.textContent = 'HOME';
homeText.className= 'btnText';
homeBtn.appendChild(homeText);

let todayBtn = document.createElement('button');
todayBtn.className = 'navBtn';
todayBtn.id = 'today';
let todayIcon = document.createElement('div');
todayIcon.className = 'todayIcon';
todayBtn.appendChild(todayIcon);
let todayText = document.createElement('p');
todayText.textContent = 'TODAY';
todayText.className= 'btnText';
todayBtn.appendChild(todayText);

let upcomingBtn = document.createElement('button');
upcomingBtn.className = 'navBtn';
upcomingBtn.id = 'upcoming';
let upcomingIcon = document.createElement('div');
upcomingIcon.className = 'upcomingIcon';
upcomingBtn.appendChild(upcomingIcon);
let upcomingText = document.createElement('p');
upcomingText.textContent = 'UPCOMING';
upcomingText.className= 'btnText';
upcomingBtn.appendChild(upcomingText);

let projectsDiv = document.createElement('div');
projectsDiv.className = 'projects';
let projectsText = document.createElement('p');
projectsText.textContent = 'PROJECTS';
projectsDiv.appendChild(projectsText);

let notesBtn = document.createElement('button');
notesBtn.className = 'navBtn';
notesBtn.id = 'notes';
let notesIcon = document.createElement('div');
notesIcon.className = 'notesIcon';
notesBtn.appendChild(notesIcon);
let notesText = document.createElement('p');
notesText.textContent = 'NOTES';
notesText.className= 'btnText';
notesBtn.appendChild(notesText);

nav.appendChild(homeBtn);
nav.appendChild(todayBtn);
nav.appendChild(upcomingBtn);
nav.appendChild(projectsDiv);
nav.appendChild(notesBtn);

let addTask = document.createElement('button');
addTask.id = 'addTask';
addTask.textContent = '+';

sidebox.appendChild(logo);
sidebox.appendChild(nav);
sidebox.appendChild(addTask);

let mainBox = document.createElement('main');
mainBox.className = 'mainBox';

todoBox.appendChild(sidebox);
todoBox.appendChild(mainBox);

document.body.appendChild(todoBox);

addTask.addEventListener("click", function(){
    mainBox.textContent = '';
    newTask();
})



