"use strict";

import angular from 'angular';

// modules
import ngMessages from 'angular-messages';
import uiRouter from 'angular-ui-router';

// states
import stateConfig from './states';

// services
import OrdersService from './services/orders';

// filters
import ordersFilter from './filters/ordersFilter';

// components
import orderListComponent from './components/ordersList';

import auctionPacksComponent from './components/auctionPacks';

import orderComponent from './components/order';
import orderRouteComponent from './components/order/route';
import orderDirectOrder from './components/order/directOrder';
import orderConfirm from  './components/order/orderConfirm';

import betValidationDirective from './components/betValidation';

export default angular.module('orders', [ngMessages, uiRouter])
  .config(stateConfig)
  
  .service('OrdersService', OrdersService)

  .component('ordersList', orderListComponent)

  .component('auctionPacks', auctionPacksComponent)

  .component('order', orderComponent)
  .component('orderRoute', orderRouteComponent)
  .component('orderDirectOrder', orderDirectOrder)
  .component('orderConfirm', orderConfirm)






  .directive('betValidation', betValidationDirective)

  .filter('ordersFilter', ordersFilter)

  .name;