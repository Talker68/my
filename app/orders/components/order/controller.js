"use strict";

export default function(OrdersService, $rootRouter, $element, $attrs){

  this.$routerOnActivate = function(next, previous) {
    this.order = next.routeData.order;
  };

  let isPreview = 'preview' in $attrs;

  if(isPreview && this.orderPreview){
    this.order = this.orderPreview;
  }


  switch (this.order.status){
    case 2 :
      this.orderStaus = 'F'; //Формируется
      break;
    case 3 :
      this.orderStaus = 'W';//В работе
      break;
  }


  //Отмена всплытия при нажатии на button внутри $element
  $element.children().on('click', (e) => {
    if(isPreview && e.target.tagName === 'BUTTON'){
      e.stopImmediatePropagation();
    }
  })

  
  //Обработка отказа ТК от заявки
  this.refuseOrder = function($event){
    $event.preventDefault();

    OrdersService.forwarderRefuseOrder(this.order.guid).then(
      (response) => {this.removeOrder({orderGuid : this.order.guid})},
      (error) => {console.log(error)}
    )
  }
  

}





// Планируется = 0
// Формируется = 2 // отсюда начинается
// КПогрузке = 3 // гп в исполении
// Отправлено = 4
// Закрыто = 5
