"use strict";

export default function($rootScope, AuthService, $rootRouter){

  if($rootScope.globals.currentUser){
    this.userName = $rootScope.globals.currentUser.user.type === 'logist' ?
      $rootScope.globals.currentUser.user.name :
      $rootScope.globals.currentUser.user.title;
  }
  
  this.logout = function(){
    AuthService.logout();
    $rootRouter.navigate(['Auth']);
  }
}