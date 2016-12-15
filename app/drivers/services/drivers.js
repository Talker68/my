"use strict";

export default function($http) {
  // Получение списка водителей текущей ТК
  this.getDriversList = function () {
    return $http.get(`${REQUEST_PREFIX}/drivers`)
  }

  // Получить водителя по guid
  this.getDriver = function (guid) {
    return $http.get(`${REQUEST_PREFIX}/drivers/${guid}`)
  }

  // Обновление водителя
  this.updateDriver = function(driver){
    return $http.put(`${REQUEST_PREFIX}/drivers/${driver.guid}`, driver)
  }

  // Добавление водителя
  this.addDriver = function (driver) {
    return $http.post(`${REQUEST_PREFIX}/drivers`, driver);
  }

  // Удаление водителя
  this.removeDriver = function (guid) {
    return $http.delete(`${REQUEST_PREFIX}/drivers/${guid}`);
  }
  
}
