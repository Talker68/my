"use strict";

export default function($scope, $uibModalInstance, ForwardersService, OrdersService){
  let orderPreviewCtrl = $scope.$parent.orderPreviewCtrl;

  ForwardersService.getForwarders().then(
    (response) => {
      this.forwardersList = response.data;
    }
  )


  this.selectFrowarder = function(forwarderGuid, orderAcceptTime){
    let orderGuid = orderPreviewCtrl.order.guid;
    OrdersService.setForwarder(orderGuid, forwarderGuid, orderAcceptTime);
    $uibModalInstance.close();
  }


}