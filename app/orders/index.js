"use strict";

//modules
import ngMessages from 'angular-messages';
import uiRouter from 'angular-ui-router';

//states
import stateConfig from './states';

//services
import OrdersService from './services/orders';

//filters
import ordersFilter from './filters/ordersFilter';

//components
import orderListComponent from './components/ordersList';
import orderListNewComponent from './components/ordersListNew';

import packsComponent from './components/packs';

import orderComponent from './components/order';
import orderComponentNew from './components/orderNew';

import orderMainDataComponent from './components/orderMainData';
import warehouseComponent from './components/warehouse';
import routePointsComponent from './components/routePoints';
import betValidationDirective from './components/betValidation';
import auctionComponent from './components/auction';


export default angular.module('orders', [ngMessages, uiRouter])
  .config(stateConfig)
  
  .service('OrdersService', OrdersService)

  .component('ordersList', orderListComponent)
  .component('ordersListNew', orderListNewComponent)

  .component('packs', packsComponent)

  .component('order', orderComponent)
  .component('orderNew', orderComponentNew)

  .component('orderMainData', orderMainDataComponent)
  .component('warehouse', warehouseComponent)
  .component('routePoints', routePointsComponent)

  .component('auction', auctionComponent)

  .directive('betValidation', betValidationDirective)

  .filter('ordersFilter', ordersFilter)

  .name;