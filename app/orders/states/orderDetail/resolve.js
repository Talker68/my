"use strict";

export default {
  order : function (OrdersService, $stateParams) {
   return OrdersService.getOrderByGuid($stateParams.guid).then((response) => {return response.data} )
  }
}