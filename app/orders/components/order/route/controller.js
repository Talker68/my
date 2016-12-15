"use strict";

export default function(OrdersService, ApiService, VehicleService) {
  this.$onInit = function(){
    this.order = angular.copy(this.resolve.order);
    this.ORDER_STATUSES = OrdersService.ORDER_STATUSES;
  }
}