"use strict";

import 'angular';
import 'bootstrap/dist/css/bootstrap.css';
import uibootstrap from 'angular-ui-bootstrap';
import '@angular/router/angular1/angular_1_router';
import angularAnimate from 'angular-animate';


import config from './config';

//services
import OrdersService from './services/orders';
import ForwardersService from './services/forwarders';

//components
import appComponent from './components/app';
import authComponent from './components/auth';

import navigationComponent from './components/navigation';

import ordersComponent from './components/orders';
import orderListComponent from './components/ordersList';

import orderPreviewComponent from './components/orderPreview';
import orderDetailComponent from './components/orderDetail';
import warehouseComponent from './components/warehouse';
import routePointsComponent from './components/routePoints';

import './main.less';

const app = angular.module('app', [uibootstrap, 'ngComponentRouter', angularAnimate])
  .value('$routerRootComponent', 'app')

  .config(config)

  .service('OrdersService', OrdersService)
  .service('ForwardersService', ForwardersService)


  .component('app', appComponent)
  .component('auth', authComponent)

  .component('navigation', navigationComponent)

  .component('orders', ordersComponent)
  .component('ordersList', orderListComponent)
  .component('orderPreview', orderPreviewComponent)

  .component('orderDetail', orderDetailComponent)
  .component('warehouse', warehouseComponent)
  .component('routePoints', routePointsComponent)

export default app;
