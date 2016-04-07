"use strict";

import 'angular';
import 'bootstrap/dist/css/bootstrap.css';
import uibootstrap from 'angular-ui-bootstrap';
import '@angular/router/angular1/angular_1_router';
import angularAnimate from 'angular-animate';

import authModule from '../auth';
import OrdersModule from '../orders';
import ForwardersModule from '../forwarders';


import config from './config';

//services
import apiService from './services/api';

//components
import appComponent from './components/app';
import navigationComponent from './components/navigation';


//styles
import './main.less';

const app = angular.module('app',
  [authModule, OrdersModule, ForwardersModule, uibootstrap, 'ngComponentRouter', angularAnimate])

  .value('$routerRootComponent', 'app')

  .config(config)

  .service('ApiService', apiService)

  .component('app', appComponent)
  .component('navigation', navigationComponent)



export default app;
