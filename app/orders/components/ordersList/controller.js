"use strict";

export default function (OrdersService) {
  this.$routerOnActivate = function(next, previous) {
    if(!next.params.status){
      this.$router.navigate(['OrdersList', {status : 1}]);
      return;
    }

    OrdersService.getOrdersByStatus(next.params.status).then(
      (response) => {
        this.list = response.data;
      }
    )
  };
}