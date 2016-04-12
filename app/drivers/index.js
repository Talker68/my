"use strict";

import driversService from  './services/drivers';

import driversComponent from './components/drivers';
import driversListComponent from './components/driversList';
import driverDetailComponent from './components/driverDetail';
import driverFormComponent from './components/driverForm';

export default angular.module('drivers', [])
  .service('DriversService', driversService)

  .component('drivers', driversComponent)
  .component('driversList', driversListComponent)
  .component('driverDetail', driverDetailComponent)
  .component('driverForm', driverFormComponent)

  .name;