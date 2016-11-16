"use strict";

export default function(OrdersService, ApiService, VehicleService) {
  this.$onInit = function(){

    this.order = angular.copy(this.resolve.order);

    this.ORDER_STATUSES = OrdersService.ORDER_STATUSES;

    //Получение типа отгрузки
    this.order.loadingType = ApiService.getArrayElementByGuid(this.order.loadingType, VehicleService.loadingTypes).element;

    if(this.order.vehicle) {
      this.order.vehicle.loadingType = ApiService.getArrayElementByGuid(this.order.vehicle.loadingType, VehicleService.loadingTypes).element;
    }
  }
}