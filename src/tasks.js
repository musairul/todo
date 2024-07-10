import { parseISO, compareAsc } from "date-fns";
import { saveProjectsToLocalStorage } from "./storage";

export function createTask(projectCard, name, priority, dueDate) {
  const taskContainer = projectCard.querySelector(".task-container");
  const taskCard = document.createElement("div");
  taskCard.classList.add("task");

  if (priority === "medium") {
    taskCard.classList.add("medium");
  } else if (priority === "high") {
    taskCard.classList.add("high");
  }

  taskCard.innerHTML = `
      <p class="task-text">${name}</p>
      <p class="due">${dueDate}</p>
    `;

  taskContainer.appendChild(taskCard);

  sortTasksByDueDate(taskContainer);

  taskCard.addEventListener("click", () => {
    taskCard.remove();
    saveProjectsToLocalStorage();
  });
  saveProjectsToLocalStorage();
}

function sortTasksByDueDate(taskContainer) {
  const tasks = Array.from(taskContainer.querySelectorAll(".task"));
  tasks.sort((a, b) => {
    const dueDateA = parseISO(a.querySelector(".due").textContent);
    const dueDateB = parseISO(b.querySelector(".due").textContent);
    return compareAsc(dueDateA, dueDateB);
  });

  tasks.forEach((task) => taskContainer.appendChild(task));
}
