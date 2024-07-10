import "./styles.css";

import { createProject } from "./projects.js";
import { saveProjectsToLocalStorage, loadProjects } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const newProjectButton = document.getElementById("newProject");
  const addProjectButton = document.getElementById("addProject");
  const projectInputCard = document.getElementById("inputProjectCard");
  const projectForm = document.getElementById("inputProject");

  newProjectButton.addEventListener("click", () => {
    projectInputCard.classList.remove("hide");
    newProjectButton.classList.add("hide");
    addProjectButton.classList.remove("hide");
  });

  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const projectTitle = document.getElementById("projectTitle").value;
    createProject(projectTitle);
    projectInputCard.classList.add("hide");
    newProjectButton.classList.remove("hide");
    addProjectButton.classList.add("hide");
    projectForm.reset();
    saveProjectsToLocalStorage();
  });

  loadProjects();
});
