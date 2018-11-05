'use strict';
angular.module('myApp')
.factory('Task', function () {
    function Task(title, img, description, createdBy, dueDate, isCompleted = false) {
        this.title = title;
        this.img = img;
        this.description = description;
        this.createdOn = new Date();
        this.createdBy = createdBy;
        this.dueDate = dueDate;
        this.isCompleted = isCompleted;
      }

      Task.prototype.getTitle = function () {
        return this.title;
      };
  
      Task.prototype.setCompleted = function(isCompleted){
          this.isCompleted = isCompleted;
      }
  
      Task.prototype.hasExpired = function(){
          return this.dueDate < Date.now();
      }

      return Task;
})