// import { Meteor } from 'meteor/meteor';
// import { Mongo } from 'meteor/mongo';
// import { check } from 'meteor/check';
//
// if (Meteor.isServer){
//   Meteor.publish('users', function(id){
//     var data = Meteor.users.find().fetch();
//       _.map(data, function(user, key){
//         _.extend(user, {
//           tasks: Tasks.find({owner: this.Reactively(user._id)}).fetch()
//         });
//       })
//       if (data){
//         console.log("data:", data);
//         return data;
//       }
//      return this.ready();
//   })
// }
