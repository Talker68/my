"use strict";

export default function($nextInstruction, $prevInstruction, $q, OrdersService) {
  return $q.all(
    {
      order : OrdersService.getOrderByGuid($nextInstruction.params.guid)
    }
  ).then(
    (response) => {
      $nextInstruction.routeData.order = response.order.data;
    }
  )
}