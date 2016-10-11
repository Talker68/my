"use strict";

import 'angular';
import 'bootstrap/dist/css/bootstrap.css';
import uibootstrap from 'angular-ui-bootstrap';
import uiRouter from 'angular-ui-router';

import authModule from '../auth';
import OrdersModule from '../orders';
import ForwardersModule from '../forwarders';
import VehicleModule from '../vehicle';
import DriversModule from '../drivers';

import config from './config';

//services
import apiService from './services/api';
import modalService from './services/modal';
import errorRejector from './services/errorRejector';


//components
import appComponent from './components/app';
import navigationComponent from './components/navigation';
import loaderComponent from  './components/loader';
import serverTimeComponent from './components/serverTime';

//directives
import uppercaseDirective from './directives/uppercase';

//styles
import './main.less';

const app = angular.module('app',
  [
    authModule,
    OrdersModule,
    ForwardersModule,
    VehicleModule,
    DriversModule,
    uiRouter,
    uibootstrap,
  ])
  

  .config(config)

  .config(function($httpProvider) {
    $httpProvider.interceptors.push('ErrorRejector');
  })

  .run(function ($rootScope, $interval, $http) {

    //Получение серверного времени
    let begin = new Date;

    $http.get(`${REQUEST_PREFIX}/time`).then(response => {

      let serverTime = new Date(response.data.time);
      serverTime.setMilliseconds(serverTime.getMilliseconds() + (new Date - begin));
      $rootScope.serverTime = serverTime;

      //Каждую секнду время будет меняться
      $interval(function () {
        $rootScope.serverTime.setSeconds($rootScope.serverTime.getSeconds() + 1);
      }, 1000)
    })




  })

  .service('ApiService', apiService)
  .service('ModalService', modalService)
  .service('ErrorRejector', errorRejector)

  .component('app', appComponent)
  .component('navigation', navigationComponent)
  .component('loader', loaderComponent)
  .component('serverTime', serverTimeComponent)

  .directive('uppercase', uppercaseDirective)


export default app;
