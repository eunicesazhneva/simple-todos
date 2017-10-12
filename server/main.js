import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';

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
