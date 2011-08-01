function ToDoController() {
  this.todoList = [
    "Learn Angular",
    "...",
    "PROFIT!"
  ];
}

ToDoController.prototype = {
  remove: function(idx) {
    this.todoList.splice(idx, 1);
  },
  add: function() {
    this.todoList.push(this.newItem);
    this.newItem = '';
  }
};
