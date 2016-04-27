"use strict";

import 'angular';
import 'bootstrap/dist/css/bootstrap.css';
import uibootstrap from 'angular-ui-bootstrap';
import '@angular/router/angular1/angular_1_router';

import AuthModule from  '../auth';
import OrdersModule from '../orders';
import ForwardersModule from '../forwarders';
import VehicleModule from '../vehicle';
import DriversModule from '../drivers';


import config from './config';

//services
import apiService from './services/api';

//components
import appComponent from './components/app';
import navigationComponent from './components/navigation';


//styles
import './main.less';


const app = angular.module('app',
  [
    AuthModule,
    OrdersModule,
    ForwardersModule,
    VehicleModule,
    DriversModule,

    uibootstrap,
    'ngComponentRouter',
  ])

  .value('$routerRootComponent', 'app')

  .config(config)

  .run(function($http, $rootScope){
    $http.get(`${REQUEST_PREFIX}/auth`).then(
        (response) => {
          $rootScope.globals = {
            currentUser: {
              user: response.data,
            }
          };
        })
  })
  .service('ApiService', apiService)

  .component('app', appComponent)
  .component('navigation', navigationComponent)



export default app;
