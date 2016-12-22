"use strict";

export default function($http) {

  // Получить список машин
  this.getVehicleList = function() {
    return $http.get(`${REQUEST_PREFIX}/vehicleList`);
  }

  // Получить машину по ее guid
  this.getVehicle = function(guid) {
    return $http.get(`${REQUEST_PREFIX}/vehicleList/${guid}`);
  }

  // Обновить машину
  this.updateVehicle = function(vehicle){
    return $http.put(`${REQUEST_PREFIX}/vehicleList/${vehicle.guid}`, vehicle)
  }

  // Добавить машину
  this.addVehicle = function (vehicle) {
    return $http.post(`${REQUEST_PREFIX}/vehicleList`, vehicle);
  }

  // Удаление машины
  this.removeVehicle = function (guid) {
    return $http.delete(`${REQUEST_PREFIX}/vehicleList/${guid}`);
  }

  // Получение типов отгрузки
  this.getLoadingTypes = function() {
    return $http.get(`${REQUEST_PREFIX}/loadingTypes`);
  }

  // Получение типа отгрузки
  this.getLoadingType = function(guid) {
    return $http.get(`${REQUEST_PREFIX}/loadingTypes/${guid.trim()}`);
  }


  // Получение списка полуприцепов
  this.getSemitrailerList = function () {
    return $http.get(`${REQUEST_PREFIX}/semitrailer`);
  }

  // Получить полуприцеп по guid
  this.getSemitrailer = function (guid) {
    return $http.get(`${REQUEST_PREFIX}/semitrailer/${guid}`)
  }

  // Обновление полуприцепа
  this.updateSemitrailer = function(semitrailer){
    return $http.put(`${REQUEST_PREFIX}/semitrailer/${semitrailer.guid}`, semitrailer)
  }

  // Добавить полуприцеп
  this.addSemitrailer = function (semitrailer) {
    return $http.post(`${REQUEST_PREFIX}/semitrailer`, semitrailer);
  }

  // Удаление полуприцепа по его guid
  this.removeSemitrailer = function (guid) {
    return $http.delete(`${REQUEST_PREFIX}/semitrailer/${guid}`);
  }


}
