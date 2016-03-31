"use strict";

export default function(){

  switch (this.order.status) {
    case 1 : {
      this.isFormed = true;
      break;
    }
    case 2 : {
      this.inWork = true;
      break;
    }
  }


  this.pickupTk = function(){
    alert('it work')
  };
}





// Планируется = 0
// Формируется = 1 // отсюда начинается
// КПогрузке = 2 // гп в исполении
// Отправлено = 3
// Закрыто = 4
