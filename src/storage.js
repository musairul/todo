import { createProject } from "./projects.js";
import { createTask } from "./tasks.js";

export function saveProjectsToLocalStorage() {
  const projects = [];
  document.querySelectorAll("#card").forEach((projectCard) => {
    console.log(projectCard);
    const title = projectCard.querySelector(".project-title").textContent;
    const tasks = Array.from(projectCard.querySelectorAll(".task")).map(
      (task) => {
        return {
          name: task.querySelector(".task-text").textContent,
          priority: task.classList.contains("high")
            ? "high"
            : task.classList.contains("medium")
            ? "medium"
            : "low",
          dueDate: task.querySelector(".due").textContent,
        };
      }
    );
    projects.push({ title, tasks });
  });
  localStorage.setItem("projects", JSON.stringify(projects));
  console.log(localStorage);
}

export function loadProjects() {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  console.log(projects);
  projects.forEach((project) => {
    console.log(project);
    let newProject = createProject(project.title);
    console.log(newProject);
    project.tasks.forEach((task) => {
      console.log(task);
      createTask(newProject, task.name, task.priority, task.dueDate);
    });
  });
}
