"use strict";

import states from './states';

import vehicleService from  './services/vehicle';

import vehicleListComponent from './components/vehicleList';
import vehicleDetailComponent from './components/vehicleDetail';

import semitrailerListComponent from './components/semitrailerList';
import semitrailerComponent from './components/semitrailer';


export default angular.module('vehicle', [])
  .config(states)

  .service('VehicleService', vehicleService)

  .component('vehicleList', vehicleListComponent)
  .component('vehicleDetail', vehicleDetailComponent)

  .component('semitrailerList', semitrailerListComponent)
  .component('semitrailer', semitrailerComponent)

  .name;