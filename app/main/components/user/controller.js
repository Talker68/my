"use strict";

export default function(){
  this.userName = this.user.type === 'forwarder' ? this.user.title : this.user.name;
}