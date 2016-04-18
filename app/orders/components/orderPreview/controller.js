"use strict";

export default function(OrdersService, $rootRouter, $element){

  //Отмена всплытия при нажатии на button внутри $element
  $element.children().on('click', (e) => {
    if( e.target.tagName === 'BUTTON'){
      console.log('fefe');
      e.stopImmediatePropagation();
    }
  })

  
  //Обработка отказа ТК от заявки
  this.refuseOrder = function($event){
    $event.preventDefault();
    /*
    $event.stopPropagation();
    $event.stopImmediatePropagation();*/

    console.log($event);

    OrdersService.forwarderRefuseOrder(this.order.guid).then(
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
