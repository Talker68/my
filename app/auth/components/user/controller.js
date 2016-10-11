"use strict";

export default function(AuthService){
  let currentUser = AuthService.getCurrentUser();
  this.userName = currentUser.type[0] === 'forwarder' ? currentUser.title : currentUser.name;
}