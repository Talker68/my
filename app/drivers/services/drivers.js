"use strict";

export default function($http) {
  // Получение списка водителей текущей ТК
  this.getDriversList = function () {
    return $http.get(`${REQUEST_PREFIX}/driver`)
  }

  // Получить водителя по guid
  this.getDriver = function (guid) {
    return $http.get(`${REQUEST_PREFIX}/driver/${guid}`)
  }

  /**
   * Обновление водителя
   * @param driver - объект с данными водителя
   * @returns {*}
   */
  this.updateDriver = function(driver){
    return $http.put(`${REQUEST_PREFIX}/driver/${driver.guid}`, driver)
  }

  /**
   * Добавление водителя
   * @param driver - объект с данными водителя
   * @returns {*}
   */
  this.addDriver = function (driver) {
    return $http.post(`${REQUEST_PREFIX}/driver`, driver);
  }

  // Удаление водителя
  this.removeDriver = function (guid) {
    return $http.delete(`${REQUEST_PREFIX}/driver/${guid}`);
  }
  
}
