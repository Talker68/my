"use strict";

export default function(OrdersService) {
  this.$onInit = function(){
    this.ORDER_STATUSES = OrdersService.ORDER_STATUSES;
    this.AUCTION_STATUSES = OrdersService.AUCTION_STATUSES;
  }
}