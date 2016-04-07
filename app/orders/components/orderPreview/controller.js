"use strict";

export default function(OrdersService, $rootRouter){
  /*
  this.setFrowarder = function(forwarderGuid, orderAcceptTime){
    let orderGuid = this.order.guid;

    return OrdersService.setForwarder(orderGuid, forwarderGuid, orderAcceptTime).then(
      (response) => {
        this.order.forwarder  = response.data.forwarder;
      }
    )
  };*/


  this.goToSetForwarderRoute = function () {
    event.preventDefault();
    event.stopPropagation();
    $rootRouter.navigate(['Orders','SetForwarderForm', {guid : this.order.guid}]);
  }


  this.confirmOrder = function(){
    event.preventDefault();
    event.stopPropagation();
  }

  this.refuseOrder = function(){
    event.preventDefault();
    event.stopPropagation();

    
    OrdersService.patchOrder(this.order.guid, {forwarderGuid : '', orderAcceptTime : ''}).then(
      (response) => {
        this.removeOrder({orderGuid : this.order.guid})
      },
      (error) => {console.log(error)}
    )
  }
}


// Планируется = 0
// Формируется = 1 // отсюда начинается
// КПогрузке = 2 // гп в исполении
// Отправлено = 3
// Закрыто = 4
