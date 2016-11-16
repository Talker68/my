"use strict";

export default function(AuthService){
  this.$onInit = function() {
    this.company = AuthService.user;
  }

}