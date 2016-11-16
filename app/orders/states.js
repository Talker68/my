"use strict";

export default function($stateProvider) {
  $stateProvider
    .state('ordersList', {
      url: "orders?status&auction&title&order",
      parent: "app",
      component : "ordersList"
    })
}
