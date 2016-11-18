"use strict";

export default function(AuthService){
  let currentUser = AuthService.getCurrentUser();
  this.userName = currentUser.type === 'forwarder' ? currentUser.title : currentUser.name;
}