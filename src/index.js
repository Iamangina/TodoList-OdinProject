import "./style.css";
import "./newTaskStyle.css";
import "./newProjectTask.css";
import { newTask } from "./newTask.js";
import { newProjectTask } from "./newProjectTask.js";

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

let homeBtn = document.createElement("button");
homeBtn.className = "navBtn";
homeBtn.id = "home";
let homeIcon = document.createElement("div");
homeIcon.className = "homeIcon";
homeBtn.appendChild(homeIcon);
let homeText = document.createElement("p");
homeText.textContent = "HOME";
homeText.className = "btnText";
homeBtn.appendChild(homeText);

let todayBtn = document.createElement("button");
todayBtn.className = "navBtn";
todayBtn.id = "today";
let todayIcon = document.createElement("div");
todayIcon.className = "todayIcon";
todayBtn.appendChild(todayIcon);
let todayText = document.createElement("p");
todayText.textContent = "TODAY";
todayText.className = "btnText";
todayBtn.appendChild(todayText);

let upcomingBtn = document.createElement("button");
upcomingBtn.className = "navBtn";
upcomingBtn.id = "upcoming";
let upcomingIcon = document.createElement("div");
upcomingIcon.className = "upcomingIcon";
upcomingBtn.appendChild(upcomingIcon);
let upcomingText = document.createElement("p");
upcomingText.textContent = "UPCOMING";
upcomingText.className = "btnText";
upcomingBtn.appendChild(upcomingText);

let projectsDiv = document.createElement("div");
projectsDiv.className = "projects";
let projectsText = document.createElement("p");
projectsText.textContent = "PROJECTS";
projectsDiv.appendChild(projectsText);

let notesBtn = document.createElement("button");
notesBtn.className = "navBtn";
notesBtn.id = "notes";
let notesIcon = document.createElement("div");
notesIcon.className = "notesIcon";
notesBtn.appendChild(notesIcon);
let notesText = document.createElement("p");
notesText.textContent = "NOTES";
notesText.className = "btnText";
notesBtn.appendChild(notesText);

nav.appendChild(homeBtn);
nav.appendChild(todayBtn);
nav.appendChild(upcomingBtn);
nav.appendChild(projectsDiv);
nav.appendChild(notesBtn);

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

let notesContainer = document.createElement("div");
notesContainer.className = "notesContainer";
notesContainer.style.display = "none";
mainBox.appendChild(notesContainer);

let homeContainer = document.createElement("div");
homeContainer.className = "homeContainer";
homeContainer.style.display = "flex";
homeBtn.style.position = "relative";
homeBtn.style.boxShadow = "5px 0px 0px rgb(243, 158, 132)";
homeBtn.style.right = "5px";
mainBox.appendChild(homeContainer);

let todayContainer = document.createElement("div");
todayContainer.className = "todayContainer";
todayContainer.style.display = "none";
mainBox.appendChild(todayContainer);

let upcomingContainer = document.createElement("div");
upcomingContainer.className = "upcomingContainer";
upcomingContainer.style.display = "none";
mainBox.appendChild(upcomingContainer);

let projectContainers = [];

export function createNewProject(projectName) {
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
    newProjectTask();
  });
  projectContainer.appendChild(addTaskProject);

  mainBox.appendChild(projectContainer);
  projectContainers.push(projectContainer);

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

createNewProject("Study");
createNewProject("Gym");