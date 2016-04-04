"use strict";

export default function($http){
  this.getForwarders = function(){
    return $http.get('/logistics/forwarders');
  }
}