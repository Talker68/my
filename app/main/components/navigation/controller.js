"use strict";

export default function ($rootScope) {
  this.userType = $rootScope.globals.currentUser.user.type;
}