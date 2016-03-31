"use strict";

export default function(OrdersService){
  this.$routerOnActivate = function(next, previous) {

    OrdersService.getOrderByGuid(next.params.guid).then(
      (response) => {
        this.order = response.data;
      }
    )
  };
}