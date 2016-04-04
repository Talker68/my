"use strict";

//services
import OrdersService from './services/orders';

import ordersComponent from './components/orders';
import orderListComponent from './components/ordersList';

import orderPreviewComponent from './components/orderPreview';
import setForwarderComponent from './components/orderPreview/setForwarder'

import orderDetailComponent from './components/orderDetail';
import warehouseComponent from './components/warehouse';
import routePointsComponent from './components/routePoints';

export default angular.module('orders', [])
  .service('OrdersService', OrdersService)

  .component('orders', ordersComponent)
  .component('ordersList', orderListComponent)

  .component('orderPreview', orderPreviewComponent)
  .component('setForwarder', setForwarderComponent)

  .component('orderDetail', orderDetailComponent)
  .component('warehouse', warehouseComponent)
  .component('routePoints', routePointsComponent)

  .name;