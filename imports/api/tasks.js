import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');
// export const Users = new Mongo.Collection('users');

if (Meteor.isServer) {
   // Only publish tasks that are public or belong to the current user
  // This code only runs on the server
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [{
        private: {
          $ne: true
        }
      }, {
        owner: this.userId
      }, ],
    });

  });
  Meteor.publish('users', function(id){
    var  userId = this.userId,
         data = [
            Meteor.users.find({"owner": userId}),
            Tasks.find({},{
              fields:{
                "username": 1,
                "text": 1
              }
            }).fetch()
        ]
      if (data){
        console.log('owner', userId);
        console.log("data:", data);
        return data;
      }
     return this.ready();

  })

  // Meteor.publish('users', Meteor.users.find().fetch());
  // Meteor.publish('tasks', Tasks.find());

  // console.log(Meteor.users.find().fetch())
  // Meteor.publish('users', Meteor.users.find());

}


Meteor.methods({
 'tasks.insert' (text) {
   check(text, String);

   // Make sure the user is logged in before inserting a task
   if (!Meteor.userId()) {
    //  setTimeout = 10000;
     throw new Meteor.Error('not-authorized');
   }


   Tasks.insert({
     text,
     createdAt: new Date(),
     owner: Meteor.userId(),
     username: Meteor.user().username,
   });
 },
 'tasks.remove' (taskId) {
   check(taskId, String);

   const task = Tasks.findOne(taskId);
   if (task.owner !== Meteor.userId()) {
     // If the task is private, make sure only the owner can delete it
     throw new Meteor.Error('not-authorized');
   }

   Tasks.remove(taskId);
 },
 'tasks.setChecked' (taskId, setChecked) {
   check(taskId, String);
   check(setChecked, Boolean);

   const task = Tasks.findOne(taskId);
      if (task.private && task.owner !== Meteor.userId()) {
        // If the task is private, make sure only the owner can check it off
        throw new Meteor.Error('not-authorized');
      }

   Tasks.update(taskId, {
     $set: {
       checked: setChecked
     }
   });
 },
 'tasks.setPrivate' (taskId, setToPrivate) {
   check(taskId, String);
   check(setToPrivate, Boolean);

   const task = Tasks.findOne(taskId);

   // Make sure only the task owner can make a task private
   if (task.owner !== Meteor.userId()) {
     throw new Meteor.Error('not-authorized');
   }

   Tasks.update(taskId, {
     $set: {
       private: setToPrivate
     }
   });
 },
});
