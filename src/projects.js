import { saveProjectsToLocalStorage } from "./storage.js";
import { createTask } from "./tasks.js";

export function createProject(title) {
  const projectsContainer = document.getElementById("projectsContainer");

  const cardContainer = document.querySelector(".card-container");
  const projectCard = document.createElement("div");
  projectCard.classList.add("card");
  projectCard.id = "card";

  projectCard.innerHTML = `
    <h2 class="project-title">${title}</h2>
    <div class="card-controls">
      <button class="project-buttons new-task">New task</button>
      <button class="project-buttons delete-project">Delete project</button>
    </div>
    <form class="form-input hide">
      <div class="form-element">
        <label for="taskName">Name</label>
        <input type="text" class="taskName" required placeholder="Task name" />
      </div>
      <div class="form-element">
        <label for="priority">Priority</label>
        <select class="priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div class="form-element">
        <label for="dueDate">Due date</label>
        <input type="date" class="dueDate" />
      </div>
      <button type="submit" class="add-task">Add task</button>
    </form>
    <div class="task-container"></div>
  `;

  projectsContainer.prepend(projectCard);

  const newTaskButton = projectCard.querySelector(".new-task");
  const taskForm = projectCard.querySelector(".form-input");
  const deleteButton = projectCard.querySelector(".delete-project");

  newTaskButton.addEventListener("click", () => {
    taskForm.classList.toggle("hide");
  });

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskName = taskForm.querySelector(".taskName").value;
    const priority = taskForm.querySelector(".priority").value;
    const dueDate = taskForm.querySelector(".dueDate").value;
    createTask(projectCard, taskName, priority, dueDate);

    taskForm.reset();
    taskForm.classList.add("hide");
    saveProjectsToLocalStorage();
  });

  deleteButton.addEventListener("click", () => {
    deleteProject(projectCard);
    saveProjectsToLocalStorage();
  });

  return projectCard;
}

export function deleteProject(projectCard) {
  projectCard.remove();
}
