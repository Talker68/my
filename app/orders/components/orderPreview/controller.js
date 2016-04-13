"use strict";

export default function(OrdersService, $rootRouter, $element){
  
  $element.on('click', (e) => {
    if(e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A'){
      $rootRouter.navigate(['Orders', 'OrderDetail', {guid : this.order.guid}])
    }
  })

  
  //Обработка отказа ТК от заявки
  this.refuseOrder = function(){
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
