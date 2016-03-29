"use strict";

export default {
  parent : 'order',
  url: "/:orderGuid",
  template : '<order order="orderStateCtrl.order"></order>',
  resolve : {
    order : function ($stateParams, OrdersService) {
      return OrdersService.getOrder($stateParams.orderGuid).then(
        (response) => {
          return response.data;
        }
      )
    }
  },
  controller : function(order){
    this.order = order;
  },
  controllerAs: 'orderStateCtrl'
}