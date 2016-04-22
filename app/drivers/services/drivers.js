"use strict";

export default function($http, $q){
  this.getDriversList = function () {
    return $http.get(`${REQUEST_PREFIX}/driver`)
  }

  this.getDriver = function (guid) {
    return $http.get(`${REQUEST_PREFIX}/driver/${guid}`)
  }

  this.updateDriver = function(driver){
    return $http.put(`${REQUEST_PREFIX}/driver/${driver.guid}`, driver)
  }

  this.addDriver = function (driver) {
    return $http.post(`${REQUEST_PREFIX}/driver`, driver);
  }

  this.removeDriver = function (driver) {
    return $http.delete(`${REQUEST_PREFIX}/driver/${driver.guid}`);
  }
  
}
