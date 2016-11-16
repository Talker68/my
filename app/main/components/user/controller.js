"use strict";

export default function(AuthService){
  this.$onInit = function() {
    this.user = AuthService.getUser();
    this.userName = this.user.type === 'forwarder' ? this.user.title : this.user.name;
  }

}