
"use strict";

export default function($http, $rootScope, ApiService){
  // получение списка ТК
  this.getForwarders = function(){
    return $http.get(`${REQUEST_PREFIX}/forwarders`);
  }

}