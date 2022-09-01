let tasks = {
  element: document.getElementById("items-list"),
  items: [],
  task: {
    is_deleted: false,
    priority: {
      weigth: 3,
      description: "high",
    },
  },
  add: function (task) {
    if (task.description !== "") {
      this.task.description = task.description;
      this.task.id = this.items.length + 1;
      task = Object.assign(task, this.task);
      this.items.push(task);
      this.render(task);
      return;
    }
    alert("please enter task");
  },
  render: function (task) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    const p = document.createElement("p");
    p.innerText = task.description;
    button.innerText = "delete";
    button.onclick = () => this.remove(task.id, p);
    li.appendChild(p);
    li.appendChild(button);
    this.element.append(li);
  },
  remove: function (taskId, p) {
    this.items[taskId - 1].is_deleted = true;
    p.style.textDecoration = "line-through";
  },
};
