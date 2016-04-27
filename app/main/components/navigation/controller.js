"use strict";

export default function ($rootScope) {
  $rootScope.$watch('globals', (newValue, oldValue) =>  {
    if(newValue) {
      this.userType = $rootScope.globals.currentUser.user.type;
    }
  });
}