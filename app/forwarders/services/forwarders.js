"use strict";

export default function($http){
  this.getForwarders = function(){
    return $http.get(`${REQUEST_PREFIX}/forwarders`);
  }
  
  this.getDriversList = function () {
    return $http.get(`${REQUEST_PREFIX}/driver`)
  }
}