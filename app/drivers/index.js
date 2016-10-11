"use strict";

import states from './states';

import driversService from  './services/drivers';

import driversListComponent from './components/driversList';
import driverDetailComponent from './components/driverDetail';

export default angular.module('drivers', [])

  .config(states)
  
  .service('DriversService', driversService)

  .component('driversList', driversListComponent)
  .component('driverDetail', driverDetailComponent)

  .name;