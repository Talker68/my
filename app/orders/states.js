"use strict";

export default function($stateProvider) {
  let resolve = {}
  // Типы отгрузки
  resolve.loadingTypes = VehicleService => VehicleService.getLoadingTypes().then(response => VehicleService.loadingTypes = response.data);

  // список ТК
  resolve.forwarders = (ForwardersService, AuthService) => {
    if (AuthService.getUserType() !== AuthService.USER_TYPES.FORWARDER) {
      return ForwardersService.getForwarders().then(response => ForwardersService.forwarders = response.data);
    }
    return null;
  }


  $stateProvider
    .state('ordersList', {
      url: "orders?status&auction&title&orderBy",
      parent: "app",
      component : "ordersList",
      resolve: resolve
    })
    .state('createAuction', {
      url: "create-auction",
      parent: "app",
      component : "auctionPacks",
    })
}
