"use strict";

export default function (OrdersService, ForwardersService) {
  let orderGuid;

  //получаем guid заказа из параметра и сам заказ
  this.$routerOnActivate = function(next, previous) {
    orderGuid = next.params.guid;
    OrdersService.getOrderByGuid(next.params.guid).then(
      (response) => {
        this.order = response.data;
      }
    )
  };

  //получаем список транспортных компаний
  ForwardersService.getForwarders().then(
    (response) => {
      this.forwardersList = response.data;
    }
  );

  //установка транспортной компании для заявки
  this.setFrowarder = function(forwarderGuid, orderAcceptTime){
    return OrdersService.patchOrder(orderGuid, {forwarderGuid : forwarderGuid, orderAcceptTime : orderAcceptTime}).then(
      (response) => {
        this.$router.navigate(['OrdersList']);
      }
    )
  };


  this.digOnly = function( value ){
    var s = value.replace(/[^0-9]/g, '');
    if( s > 59 ){ s = 59 };
    if( s < 0 ){ s = 0 };
    this.orderAcceptTime.minutes = s;
    console.log( s );
  };


}