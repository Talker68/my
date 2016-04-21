"use strict";

export default function($nextInstruction, $prevInstruction, $q, OrdersService, ForwardersService) {

  return $q.all(
    {
      order : OrdersService.getOrderByGuid($nextInstruction.params.guid),
      forwarders : ForwardersService.getForwarders()
    }
  ).then(
    (response) => {
      $nextInstruction.routeData.order = response.order.data;
      $nextInstruction.routeData.forwarders = response.forwarders.data;
    }
  )


}