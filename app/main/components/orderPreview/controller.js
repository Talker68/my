"use strict";

export default function(OrdersService){
  this.setFrowarder = function(forwarderGuid, orderAcceptTime){
    let orderGuid = this.order.guid;
    
    return OrdersService.setForwarder(orderGuid, forwarderGuid, orderAcceptTime).then(
      (response) => {
        this.order.forwarder  = response.data.forwarder;
      }
    )
  };
}


// Планируется = 0
// Формируется = 1 // отсюда начинается
// КПогрузке = 2 // гп в исполении
// Отправлено = 3
// Закрыто = 4
