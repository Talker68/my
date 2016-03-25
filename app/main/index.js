"use strict";

import 'angular';
import 'bootstrap/dist/css/bootstrap.css';
import uirouter from 'angular-ui-router';

import config from './config';
import states from './states/states';

//services
import OrdersService from './services/orders';

//components
import orderListComponent from './components/ordersList';
import orderPreviewComponent from './components/orderPreview';
import orderComponent from './components/order';


import './var.less';

const app = angular.module('app', [uirouter])
  .config(config)
  .config(states)

  .service('OrdersService', OrdersService)

  .component('ordersList', orderListComponent)
  .component('orderPreview', orderPreviewComponent)
  .component('order', orderComponent)

export default app;
