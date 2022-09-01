let tasks = {
  element: document.getElementById("items-list"),
  items: [],
  task: {
    description: "",
    id: 1,
    is_deleted: false,
    priority: 2,
  },
  add: function (task) {
    if (task.description !== "") {
      this.task.description = task.description;
      this.task.id = this.items.length + 1;
      this.task.priority = task.priority;
      this.items.push(task);
      this.render(this.task);
      return;
    }
    alert("please enter task");
  },
  render: function (task) {
    if (!Array.isArray(task)) {
      const li = document.createElement("li");
      const button = document.createElement("button");
      const p = document.createElement("p");
      p.innerText = task.description;
      button.innerText = "delete";
      button.onclick = () => this.remove(task.id, p);
      li.appendChild(p);
      li.appendChild(button);
      this.element.append(li);
      return;
    }
    this.element.innerHTML = "";
    task.map((value) => {
      this.render(value);
    });
  },
  remove: function (taskId, p) {
    this.items[taskId - 1].is_deleted = true;
    p.style.textDecoration = "line-through";
    this.render(this.items);
  },
  ascSort: function () {
    for (let i = 0; i < this.items.length - 1; i++) {
      if (this.items[i].priority > this.items[i + 1].priority) {
        let temp = this.items[i];
        this.items[i] = this.items[i + 1];
        this.items[i + 1] = temp;
        i = -1;
      }
    }
    this.render(this.items);
  },
  dscSort: function () {
    for (let i = 0; i < this.items.length - 1; i++) {
      if (this.items[i].priority < this.items[i + 1].priority) {
        let temp = this.items[i];
        this.items[i] = this.items[i + 1];
        this.items[i + 1] = temp;
        i = -1;
      }
    }
    this.render(this.items);
  },
};
