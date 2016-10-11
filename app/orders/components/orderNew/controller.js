export default function(VehicleService, $uibModal) {
  let orderCtrl = this;

  this.$onInit = function() {
    this.orderData.loadingType = VehicleService.getLoadingTypeByGuid(this.orderData.loadingType).element;
  };

  this.showDetailRoute = function() {
    $uibModal.open({
      template: require('./routeModal/template.html'),
      controller: require('./routeModal/controller'),
      controllerAs: 'routeCtrl',
      resolve: {
        orderData: function() {
          return orderCtrl.orderData;
        }
      },
      size: 'lg'
    });
  };
}
