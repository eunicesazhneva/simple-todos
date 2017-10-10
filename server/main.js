import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';
import '../imports/api/users.js';
import { Accounts } from 'meteor/accounts-base';

// Meteor.startup(() => {
//   Accounts.onLogin(function() {
//   var userid = Meteor.userId();
//
//   Meteor.setTimeout(function(){
//   Meteor.users.update({_id: userid}, {$set: { "services.resume.loginTokens" : [] }}, {});
//   }, 10000);
//   });
// });

Meteor.publish('lists.users', function(){
  return Meteor.users.find({});
});

// Accounts.config({
//     loginExpirationInDays: 0.0000115741
// })
