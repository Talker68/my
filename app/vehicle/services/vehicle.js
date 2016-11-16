"use strict";

export default function($http) {

  // Получить список машин
  this.getVehicleList = function() {
    return $http.get(`${REQUEST_PREFIX}/vehicle`);
  }

  // Получить машину по ее guid
  this.getVehicle = function(guid) {
    return $http.get(`${REQUEST_PREFIX}/vehicle/${guid}`);
  }

  /**
   * Обновить машину
   * @param vehicle объект c данными машины
   * @returns {*}
   */
  this.updateVehicle = function(vehicle){
    vehicle.loading_type = vehicle.loading_type.guid;
    return $http.put(`${REQUEST_PREFIX}/vehicle/${vehicle.guid}`, vehicle)
  }

  /**
   * Добавить машину
   * @param vehicle Объект c данными машины
   * @returns {*}
   */
  this.addVehicle = function (vehicle) {
    vehicle.loading_type = vehicle.loading_type.guid;
    return $http.post(`${REQUEST_PREFIX}/vehicle`, vehicle);
  }

  /**
   * Удаление машины
   * @param guid - guid машины
   * @returns {boolean}
   */
  this.removeVehicle = function (guid) {
    return $http.delete(`${REQUEST_PREFIX}/vehicle/${guid}`);
  }

  // Получение типов отгрузки
  this.getLoadingTypes = function() {
    return $http.get(`${REQUEST_PREFIX}/loading_type`);
  }


  // Получение списка полуприцепов
  this.getSemitrailerList = function () {
    return $http.get(`${REQUEST_PREFIX}/semitrailer`);
  }

  // Получить полуприцеп по guid
  this.getSemitrailer = function (guid) {
    return $http.get(`${REQUEST_PREFIX}/semitrailer/${guid}`)
  }

  /**
   * Обновление полуприцепа
   * @param semitrailer - объект с данными полуприцепа
   * @returns {*}
   */
  this.updateSemitrailer = function(semitrailer){
    return $http.put(`${REQUEST_PREFIX}/semitrailer/${semitrailer.guid}`, semitrailer)
  }

  /**
   * Добавить полуприцеп
   * @param semitrailer - объект с данными полуприцепа
   * @returns {*}
   */
  this.addSemitrailer = function (semitrailer) {
    return $http.post(`${REQUEST_PREFIX}/semitrailer`, semitrailer);
  }

  // Удаление полуприцепа по его guid
  this.removeSemitrailer = function (guid) {
    return $http.delete(`${REQUEST_PREFIX}/semitrailer/${guid}`);
  }


}
