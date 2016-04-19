"use strict";

export default function (OrdersService, ApiService) {


  this.$routerOnActivate = function(next, previous) {
    if(!next.params.status){
      this.$router.navigate(['OrdersList', {status : 2}]);
      return;
    }

    OrdersService.getOrdersByStatus(next.params.status).then(
      (response) => {
        this.list = response.data;
      }
    )
  };

  this.removeOrderFromList = function(orderGuid){
    let orderIndex = ApiService.getIndexById(this.list, {fieldName : 'guid', value: orderGuid});
    this.list.splice(orderIndex,1);
  }
}