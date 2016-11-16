export default function(ForwardersService, OrdersService){
  this.$onInit = function(){
    this.now = new Date;
    this.forwarders = ForwardersService.forwarders;
  }

  // Отправка заявки напрямую
  this.sendDirectOrder = function(forwarderGuid, orderAcceptTime){
    let requestData = {
      forwarderGuid,
      orderAcceptTime
    };

    OrdersService.directOrder(this.resolve.orderGuid, requestData).then(
      response => {
        // TODO после изменения запроса, отправлять ответ запроса вместо получения заявки отельным запросом
        OrdersService.getOrderByGuid(this.resolve.orderGuid).then(
          response => {this.close({$value: response.data[0]})}
        )
      }
    )
  }

};




