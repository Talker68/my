"use strict";

import 'angular';
import 'bootstrap/dist/css/bootstrap.css';
import uibootstrap from 'angular-ui-bootstrap';
import uiRouter from 'angular-ui-router';

import OrdersModule from '../orders';
import ForwardersModule from '../forwarders';
import VehicleModule from '../vehicle';
import DriversModule from '../drivers';

import config from './config';
import states from './states';

//services
import apiService from './services/api';
import AuthService from './services/auth';
import modalService from './services/modal';
import errorRejector from './services/errorRejector';

//components
import appComponent from './components/app';
import navigationComponent from './components/navigation';
import loaderComponent from  './components/loader';
import serverTimeComponent from './components/serverTime';
import userComponent from './components/user';
import confirmComponent from './components/confirm';

//directives
import uppercaseDirective from './directives/uppercase';

// filters
import numFilter from './filters/num'

//styles
import './main.less';

const app = angular.module('app',
  [
    OrdersModule,
    ForwardersModule,
    VehicleModule,
    DriversModule,
    uiRouter,
    uibootstrap,
  ])
  
  // Основные настройка
  .config(config)

  // Интерсептор для ошибок
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('ErrorRejector');
  })

  // Стэйты
  .config(states)

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
  .service('AuthService', AuthService)

  .component('app', appComponent)
  .component('navigation', navigationComponent)
  .component('loader', loaderComponent)
  .component('serverTime', serverTimeComponent)
  .component('confirm', confirmComponent)
  .component('user', userComponent)

  .directive('uppercase', uppercaseDirective)

  .filter('num', numFilter)

export default app;
