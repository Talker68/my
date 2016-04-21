"use strict";

import ordersOperationsModule from './ordersOperations';

//services
import OrdersService from './services/orders';

import ordersComponent from './components/orders';
import orderListComponent from './components/ordersList';

//import orderPreviewComponent from './components/orderPreview';


import orderComponent from './components/order';
import warehouseComponent from './components/warehouse';
import routePointsComponent from './components/routePoints';



export default angular.module('orders', [ordersOperationsModule])
  .service('OrdersService', OrdersService)

  .component('orders', ordersComponent)
  .component('ordersList', orderListComponent)

  // .component('orderPreview', orderPreviewComponent)
  .component('order', orderComponent)
  .component('warehouse', warehouseComponent)
  .component('routePoints', routePointsComponent)


  .name;