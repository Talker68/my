"use strict";

//services
import OrdersService from './services/orders';

import ordersComponent from './components/orders';
import orderListComponent from './components/ordersList';

import orderPreviewComponent from './components/orderPreview';
import setForwarderFormComponent from './components/setForwarderForm'

import orderDetailComponent from './components/orderDetail';
import warehouseComponent from './components/warehouse';
import routePointsComponent from './components/routePoints';

export default angular.module('orders', [])
  .service('OrdersService', OrdersService)

  .component('orders', ordersComponent)
  .component('ordersList', orderListComponent)

  .component('orderPreview', orderPreviewComponent)
  .component('setForwarderForm', setForwarderFormComponent)

  .component('orderDetail', orderDetailComponent)
  .component('warehouse', warehouseComponent)
  .component('routePoints', routePointsComponent)

  .name;