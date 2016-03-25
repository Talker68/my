"use strict";

export default function (OrdersService) {
  OrdersService.getFormedOrders().then(
    (response) => {
      this.orders = response.data;
    }
  )
}