import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../../api/tasks.js';


import template from './todosList.html';

class TodosListCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.subscribe('tasks');
    var usersHandle = this.subscribe('users');
    setTimeout(function(){
      var usersList = Meteor.users.find().fetch();
      _.map(usersList, function(user, key){
        _.extend(user, {
          tasks: Tasks.find({owner: user._id}).fetch()
        });
      })
      console.log('usersList ', usersList)
    }, 5000);
    


    this.hideCompleted = false;
    // console.log(usersList.find().fetch());

    this.helpers({
      tasks() {
        const selector = {};

        // If hide completed is checked, filter tasks
        if (this.getReactively('hideCompleted')) {
          selector.checked = {
            $ne: true
          };
        }

        var users = [];

        users = Meteor.users.find({});
        // Show newest tasks at the top
        return Tasks.find(selector, {
          sort: {
            createdAt: -1
          }
        });
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
    })
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
