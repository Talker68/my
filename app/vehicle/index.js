"use strict";

import vehicleService from  './services/vehicle';

import vehicleComponent from './components/vehicle';
import vehicleListComponent from './components/vehicleList';
import vehicleDetailComponent from './components/vehicleDetail';
import vehicleFormComponent from './components/vehicleForm';

export default angular.module('vehicle', [])
  .service('VehicleService', vehicleService)

  .component('vehicle', vehicleComponent)
  .component('vehicleList', vehicleListComponent)
  .component('vehicleDetail', vehicleDetailComponent)
  .component('vehicleForm', vehicleFormComponent)

  .name;