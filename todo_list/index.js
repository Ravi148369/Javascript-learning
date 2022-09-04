let tasks = {
  element: document.getElementById("items-list"),
  subElement:document.getElementById("subtask"),
  subButton:document.getElementById('subtask-btn'),
  items: [],
  task: {
    description: "",
    id: 1,
    is_deleted: false,
    priority: 2,
    sortOrder:null,
    subtask:[]
  },
  add: function (task) {
    if(task.subtask){
      this.items[task.index-1].subtask.push(task.subtask)
      this.render()
      return
    }
    if (task.description !== "") {
      this.task.description = task.description;
      this.task.id = this.items.length + 1;
      this.task.priority = task.priority;
      this.task.sortOrder=this.items.length+1
      this.task.subtask=[]
      task=Object.assign(task,this.task)
      this.items.push(task);
      this.render(this.task);
      return
    }

    alert("please enter task");
  },

  render: function () {
    for(let i=0;i<this.items.length-1;i++){
      if(this.items[i].sortOrder>this.items[i+1].sortOrder){
        let temp=this.items[i+1]
        this.items[i+1]=this.items[i]
        this.items[i]=temp
        i=-1
      }
    }
    this.element.innerHTML = "";
    this.items.map((value) => {
      const div=document.createElement('div')
      const li = document.createElement("div");
      const btn_div=document.createElement('div')
      const button = document.createElement("button");
      const up_button=document.createElement('button')
      const down_button=document.createElement('button')
      const p = document.createElement("p");
      const addSub=document.createElement('button')
      li.className="space-evenly"
      div.className="task-list"
      addSub.onclick=()=>{
        btn_div.style.display='none'
        const subtext=document.createElement('textarea')
        const subButton=document.createElement('button')
        subButton.onclick=()=>{
          this.add({subtask:subtext.value,index:value.sortOrder})
          btn_div.style.display='block'
        }
        subButton.textContent="Add subTask"
        li.append(subtext,subButton)
      } 
      addSub.textContent="Add SubTask"
      up_button.textContent="Up"
      down_button.textContent="Down"
      button.textContent = "delete";

      up_button.onclick=()=>this.move(value.sortOrder,"up")
      down_button.onclick=()=>this.move(value.sortOrder,"down")
      button.onclick = () =>this.remove(value.id, p);
      
      btn_div.append(addSub,up_button,down_button,button)
      p.innerText = value.description;
      if(value.is_deleted){
        p.style.textDecoration='line-through'
      }
      if(value.sortOrder==1){
        up_button.style.display='none'
      }
      if(value.sortOrder==this.items.length){
        down_button.style.display='none'
      }
      li.appendChild(p);
      li.appendChild(btn_div);
      div.append(li)
      if(value.subtask.length!==0){
        const ul=document.createElement('ul')
        value.subtask.map(value=>{
          const li=document.createElement('li')
          li.innerText=value
          ul.append(li)
        })
        div.append(ul)
      }
      this.element.append(div);
    });
  },
  remove: function (taskId, p) {
    this.items[taskId - 1].is_deleted = true;
    p.style.textDecoration = "line-through";
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
  move: function(sortOrder,move){
    if(move=='up'){
      this.items[sortOrder-1].sortOrder=sortOrder-1;
      this.items[sortOrder-2].sortOrder=sortOrder;
      this.render()
      return;
    }

    this.items[sortOrder-1].sortOrder=sortOrder+1
    this.items[sortOrder].sortOrder=sortOrder
    
    this.render()
  }
};
