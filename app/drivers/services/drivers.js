"use strict";

export default function($http, $q){
  this.getDriversList = function () {
    return $http.get('/logistics/driver')
  }

  this.getDriver = function (guid) {
    return $http.get(`/logistics/driver/${guid}`)
  }

  this.updateDriver = function(driver){
    return $http.put(`/logistics/driver/${driver.guid}`, driver)
  }

  this.addDriver = function (driver) {
    return $http.post('/logistics/driver', driver);
  }

  this.removeDriver = function (driver) {
    return $http.delete(`/logistics/driver/${driver.guid}`);
  }
  


}
