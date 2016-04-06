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
    return OrdersService.setForwarder(orderGuid, forwarderGuid, orderAcceptTime).then(
      (response) => {
        this.$router.navigate(['OrdersList']);
      }
    )
  };
  
}