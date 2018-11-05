'use strict';

angular.module('myApp.taskManager', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/taskManager', {
    templateUrl: '/taskManager/task.manager.html',
    controller: 'taskManagerCtrl'
  });
}])

.controller('taskManagerCtrl', ['Task','$mdPanel',function(Task, $mdPanel) {
    this._mdPanel = $mdPanel;
    this.taskList = [];
    
    this.$onInit = () =>{        
        this.jsonTaskList = jsonTaskList;        
        this.loadTasksFromJson();
    }

    this.addTask = (task) => {        
        let newTask = new Task( task.title, "https://picsum.photos/1600/900", task.description, task.createdBy, task.dueDate);
        this.taskList.unshift(newTask);        
    }

    this.loadTasksFromJson = () => {
        this.jsonTaskList.forEach(task => {
            let newTask = new Task( task.title, task.img, task.description, task.createdBy, task.dueDate, task.isCompleted);                        
            this.taskList.push(newTask);
        });        
    }

    this.deleteTask = (taskToDelete) => {        
        this.taskList = this.taskList.filter(aTask => aTask !== taskToDelete);
    }

    //This should be refactored and moved to another component to decouple it from this controller
    this.showDialog = () =>{
        var position = this._mdPanel.newPanelPosition()
        .absolute()
        .center();
  
        var config = {
            attachTo: angular.element(document.body),
            controller: this.PanelDialogCtrl,
            controllerAs: 'ctrl',
            disableParentScroll: true,
            templateUrl: '/shared/panel.template.html',
            hasBackdrop: true,
            panelClass: '',
            position: position,
            trapFocus: true,
            zIndex: 150,
            clickOutsideToClose: true,
            escapeToClose: true,
            focusOnOpen: true
        };

        this.PanelDialogCtrl = (mdPanelRef) =>{
            this._mdPanelRef = mdPanelRef;
        }  
        this._mdPanel.open(config);

    }
}]);
