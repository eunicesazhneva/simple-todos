// import { Meteor } from 'meteor/meteor';
// import { Mongo } from 'meteor/mongo';
// import { check } from 'meteor/check';
//

// var users = Meteor.subscribe('lists.users');
// const Users = Meteor.Users.find({ userId: Meteor.userId() }).fetch();
//
// // export const Users = new Mongo.Collection('users');
//   // var userId = Meteor.userId();
//   // Meteor.Users.find({_id: userId});
//
//
// // if (Meteor.isServer) {
// //    // Only publish tasks that are public or belong to the current user
// //   // This code only runs on the server
// //   Meteor.publish('users', function usersPublication() {
// //     console.log('Users:', users)
// //     // return Users.find({
// //     //   // check(userId, String)
// //     //   // $or: [{
// //     //   //   private: {
// //     //   //     $ne: true
// //     //   //   }
// //     //   // }, {
// //     //   //   owner: this.userId
// //     //   // }, ],
// //     // });
// //   });
// // }
