"use strict";

export default function(OrdersService, $rootRouter, $element, $attrs, $q){

  this.$routerOnActivate = (next, previous) => {
    return $q.all(
      {
        order : OrdersService.getOrderByGuid(next.params.guid)
      }
    ).then(
      (response) => {
        this.order = response.order.data;
      }
    )
  }

  let isPreview = 'preview' in $attrs;

  if(isPreview && this.orderPreview){
    this.order = this.orderPreview;
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
