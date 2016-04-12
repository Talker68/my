"use strict";

//services
import OrdersService from './services/orders';

import ordersComponent from './components/orders';
import orderListComponent from './components/ordersList';

import orderPreviewComponent from './components/orderPreview';
import setForwarderComponent from './components/setForwarder'
import confirmOrderComponent from './components/confirmOrder'

import orderDetailComponent from './components/orderDetail';
import warehouseComponent from './components/warehouse';
import routePointsComponent from './components/routePoints';

import ordersOperationsComponent from './components/ordersOperations';

export default angular.module('orders', [])
  .service('OrdersService', OrdersService)

  .component('orders', ordersComponent)
  .component('ordersList', orderListComponent)

  .component('orderPreview', orderPreviewComponent)
  .component('orderDetail', orderDetailComponent)
  .component('warehouse', warehouseComponent)
  .component('routePoints', routePointsComponent)

  .component('ordersOperations', ordersOperationsComponent)
  .component('setForwarder', setForwarderComponent)
  .component('confirmOrder', confirmOrderComponent)
  .name;