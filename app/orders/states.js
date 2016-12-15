"use strict";

export default function($stateProvider) {

  $stateProvider
    .state('ordersList', {
      url: "orders?status&auction&title&orderBy",
      parent: "app",
      component : "ordersList",
    })
    .state('createAuction', {
      url: "create-auction",
      parent: "app",
      component : "auctionPacks",
    })
}
