"use strict";

export default function (VehicleService, ApiService, ModalService, $state) {
  let backRoute;

  this.$onInit = function(){
    //Получение списка полуприцепов
    VehicleService.getSemitrailerList().then((result) => {this.semitrailersList = result.data});

    //Если есть обратный маршурут
    if ($state.params.back){
      backRoute = ApiService.getBackRoute($state.params.back);
    }
  }


  //добавление полуприцепа
  this.addSemitrailer = function (semitrailer) {
    return VehicleService.addSemitrailer(semitrailer).then((response) => {
      if(backRoute){
        $state.transitionTo(backRoute.state, backRoute);
      } else {
        this.semitrailersList.push(response.data)
      }
    })
  };

  //редактирование полуприцепа
  this.updateSemitrailer = function(semitrailer){
    return VehicleService.updateSemitrailer(semitrailer).then(
      (response) => {
        let semitrailer = response.data;
        let index = ApiService.getIndexById(this.semitrailersList, {fieldName : 'guid', value : semitrailer.guid });
        this.semitrailersList.splice(index, 1 , semitrailer);
      }
    )
  };

  // удаление полуприцепа
  this.removeSemitrailer = function(semitrailer) {

    let modalInstance = ModalService.showConfirm(`Удалить полуприцеп ?`);

    modalInstance.result.then(
      (response) => {
        VehicleService.removeSemitrailer(semitrailer).then(
          (response) => {
            let index = ApiService.getIndexById(this.semitrailersList, {fieldName : 'guid', value : semitrailer.guid });
            this.semitrailersList.splice(index,1);
          },
          (error) => {alert('Ошибка!')}
        )
      },
      (reject) => {}
    )

  };

}