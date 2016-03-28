"use strict";

export default function (OrdersService) {
  OrdersService.getInWorkOrders().then(
    (response) => {
      this.orders = response.data;
    }
  )
}