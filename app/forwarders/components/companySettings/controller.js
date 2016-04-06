"use strict";

export default function($rootScope){
  this.company = $rootScope.globals.currentUser.user;
}