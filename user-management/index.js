const users = {
  table: document.querySelector("table tbody"),
  items: localStorage,
  date: new Date(),
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  phone: /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,

  add: function (user) {
    if (localStorage.length == 0) {
      this.items.setItem("key", 1);
    }
    if (
      user.name.trim() == "" ||
      user.username.trim() == "" ||
      user.email.trim() == "" ||
      user.phone.trim() == "" ||
      user.password == ""
    ) {
      alert("Invalid Credentials");
      return;
    }
    if (user.email.match(this.email) && this.phone.exec(user.phone)) {
      this.items.setItem(this.items.getItem("key"), [
        user.name.trim(),
        user.username.trim(),
        user.email.trim(),
        user.phone.trim(),
        "inactive",
        this.date.toLocaleString(),
        false,
        user.password,
      ]);
      this.items.setItem("key", this.items.length);
      this.render();
      return;
    }
    alert("Invalid Credentials");
  },
  render: function () {
    this.table.innerHTML = "";
    for (let i = 1, j = 1; i <= this.items.length - 1; i++) {
      const user = this.items.getItem(`${i}`).split(",");

      if (user[7] == "false") {
        console.log("hello world");
        const tr = document.createElement("tr");
        const id = document.createElement("td");
        const name = document.createElement("td");
        const username = document.createElement("td");
        const email = document.createElement("td");
        const phone = document.createElement("td");
        const status = document.createElement("td");
        const created = document.createElement("td");
        const actions = document.createElement("td");
        const viewButton = document.createElement("button");
        const editButton = document.createElement("button");
        const removeButton = document.createElement("button");
        const statusButton = document.createElement("button");

        id.innerText = j++;
        name.textContent = user[0];
        username.textContent = user[1];
        email.textContent = user[2];
        phone.textContent = user[3];
        status.textContent = user[4];
        created.textContent = user[5] + user[6];

        
        viewButton.textContent = "View";
        viewButton.classList.add("bg-green");
        editButton.classList.add("bg-grey");
        removeButton.textContent = "Remove";
        removeButton.classList.add("bg-red");
        editButton.textContent = "Edit";

        if (user[4] == "active") {
          statusButton.textContent = "Disable";
          statusButton.addEventListener("click", () => this.statusToggle(i));
        } else {
          statusButton.textContent = "able";
          statusButton.addEventListener("click", () => this.statusToggle(i));
        }
        statusButton.classList.add("bg-yellow");
        removeButton.addEventListener("click", () => this.remove(i));
        editButton.addEventListener("click", () => this.edit(i));
        actions.append(viewButton, editButton, removeButton, statusButton);
        tr.append(id, name, username, email, phone, status, created, actions);
        this.table.append(tr);
      }
    }
  },
  remove: function (id) {
    if (confirm("are you sure you want to delete :")) {
      const user = this.items.getItem(id).split(",");
      user[7] = true;
      this.items.setItem(id, [...user]);
      this.render();
    }
  },
  edit: function (id) {
    if (confirm("are you want to edit :")) {
      this.items.setItem("key", id);
      const user = this.items.getItem(id).split(",");
      location.href = "./index.html";
      document.querySelector("#fname").value = user[0];
      document.querySelector("#username").value = user[1];
      document.querySelector("#email").value = user[2];
      document.querySelector("#phonenumber").value = user[3];
      return;
    }
  },
  statusToggle: function (id) {
    if (confirm("are you sure you want to change status :")) {
      const user = this.items.getItem(id).split(",");
      if (user[4] == "inactive") {
        user[4] = "active";
        this.items.setItem(id, [...user]);
        this.render();
        return;
      }
      user[4] = "inactive";
      this.items.setItem(id, [...user]);
      this.render();
    }
  },
  search: function (value) {
    this.table.innerHTML = "";
    if (value.trim() == "") {
      alert("invalid credentials");
      return;
    }
    for (let i = 1, j = 1; i <= this.items.length - 1; i++) {
      const user = this.items.getItem(`${i}`).split(",");
      if (
        user[0].toLocaleLowerCase() == value.toLocaleLowerCase() ||
        user[1].toLocaleLowerCase() == value.toLocaleLowerCase()
      ) {
        if (user[7] == "false") {
          const tr = document.createElement("tr");
          const id = document.createElement("td");
          const name = document.createElement("td");
          const username = document.createElement("td");
          const email = document.createElement("td");
          const phone = document.createElement("td");
          const status = document.createElement("td");
          const created = document.createElement("td");
          const actions = document.createElement("td");
          const viewButton = document.createElement("button");
          const editButton = document.createElement("button");
          const removeButton = document.createElement("button");
          const statusButton = document.createElement("button");

          editButton.textContent = "Edit";
          id.innerText = j++;
          name.textContent = user[0];
          username.textContent = user[1];
          email.textContent = user[2];
          phone.textContent = user[3];
          status.textContent = user[4];
          created.textContent = user[5];
          viewButton.textContent = "View";
          viewButton.classList.add("bg-green");
          editButton.classList.add("bg-grey");
          removeButton.textContent = "Remove";
          removeButton.classList.add("bg-red");

          if (user[4] == "active") {
            statusButton.textContent = "Disable";
            statusButton.addEventListener("click", () => this.statusToggle(i));
          } else {
            statusButton.textContent = "able";
            statusButton.addEventListener("click", () => this.statusToggle(i));
          }
          statusButton.classList.add("bg-yellow");

          removeButton.addEventListener("click", () => this.remove(i));
          editButton.addEventListener("click", () => this.edit(i));
          actions.append(viewButton, editButton, removeButton, statusButton);
          tr.append(id, name, username, email, phone, status, created, actions);
          this.table.append(tr);
          return;
        }   
      }
    }
    alert("no record found")
  },
};
users.render();
