// import angular from 'angular';
// import angularMeteor from 'angular-meteor';
// import { Meteor } from 'meteor/meteor';
// import { Users } from '../../api/users.js';
//
// import template from './todosList.html';
//
// // class UsersListCtrl{
// //   constructor($scope){
// //     $scope.viewModel(this);
// //
// //     this.subscribe('users');
// //     this.filterUsername = false;
// //
// //     this.helpers({
// //       tasks(){
// //         const selector ={};
// //
// //         if (this.getReactively('filterUsername')){
// //           selector.checked ={
// //             $ne: true
// //           };
// //         }
// //       }
// //     })
// //   }
// // }
// class UsersListCtrl{
//   constructor($scope){
//     $scope.viewModel(this);
//
//     this.subscribe('users');
//     // this.filterUsername = false;
//
//     this.helpers({
//       users(){
//
//         console.log('User', Meteor.User.find(selector,{
//           sort:{
//             createdAt: -1
//           }
//         }));
//       // return Users.find({});
//       }
//     })
//   }
// }
//
// export default angular.module('usersList', [
//   angularMeteor
//  ])
//    .component('usersList', {
//      templateUrl: 'imports/components/todosList/todosList.html',
//      controller: ['$scope', UsersListCtrl]
//    });
