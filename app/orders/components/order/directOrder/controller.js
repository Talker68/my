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
      response => this.close({$value: response.data})
    )
  }

};




