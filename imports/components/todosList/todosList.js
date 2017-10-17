import angular from 'angular';
  import angularMeteor from 'angular-meteor';

 import {Meteor} from 'meteor/meteor';
 import {Tasks} from '../../api/tasks.js';

  import template from './todosList.html';

  class TodosListCtrl {

     constructor($scope) {
         $scope.viewModel(this);

         this.subscribe('tasks');

     this.hideCompleted = false;
         this.hideCompleted = false;

        this.helpers({
          tasks() {
                 const selector = {};

                // If hide completed is checked, filter tasks
                if (this.getReactively('hideCompleted')) {
                    selector.checked = {
                        $ne: true
                    };
                 }

                // Show newest tasks at the top
                // return Tasks.find(selector, {
                //   sort: {
                //     createdAt: -1
                //   }
                // });

                let groupedTasks = Tasks.find(selector, {
                    sort: {
                        createdAt: -1
                    }
                }).fetch();
                console.log('Grouped Tasks:', groupedTasks);

                const userNames = [];
                const sortedTasks = [];
                 if (groupedTasks && groupedTasks.length) {
                     for (const task of groupedTasks) {
                         if (!userNames.find(uName => uName === task.username)) {
                             userNames.push(task.username);
                        }
                    }
                     for (const userName of userNames) {
                         sortedTasks.push(groupedTasks.filter(task => task.username === userName));
                     }
                     console.log('Sorted Tasks:', sortedTasks);
                    return sortedTasks;
                }
            },
             incompleteCount() {
                 return Tasks.find({
                     checked: {
                         $ne: true
                     }
                 }).count();
             },
             currentUser() {
                 return Meteor.user();
             }
          });

        // console.log(Tasks.find({
        //     checked: {
        //         $ne: true
        //     }
        // }).count());
    }

    addTask(newTask) {
      // Insert a task into the collection
        Meteor.call('tasks.insert', newTask);

        // Clear form
        this.newTask = '';
    }

    setChecked(task) {
        // Set the checked property to the opposite of its current value
        Meteor.call('tasks.setChecked', task._id, !task.checked);
    }

    removeTask(task) {
        Meteor.call('tasks.remove', task._id);
    }

     setPrivate(task) {
      Meteor.call('tasks.setPrivate', task._id, !task.private);
     }

  }

  export default angular.module('todosList', [

     angularMeteor
  ])

     .component('todosList', {
        templateUrl: 'imports/components/todosList/todosList.html',
        controller: ['$scope', TodosListCtrl]
    });
