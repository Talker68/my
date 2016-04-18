"use strict";

import vehicleService from  './services/vehicle';

import vehicleComponent from './components/vehicle';
import vehicleListComponent from './components/vehicleList';
import vehicleDetailComponent from './components/vehicleDetail';
import vehicleFormComponent from './components/vehicleForm';


import semitrailerComponent from './components/semitrailer';
import semitrailerListComponent from './components/semitrailerList';
import semitrailerDetailComponent from './components/semitrailerDetail';
import semitrailerFormComponent from './components/semitrailerForm';

export default angular.module('vehicle', [])
  .service('VehicleService', vehicleService)

  .component('vehicle', vehicleComponent)
  .component('vehicleList', vehicleListComponent)
  .component('vehicleDetail', vehicleDetailComponent)
  .component('vehicleForm', vehicleFormComponent)


  .component('semitrailer', semitrailerComponent)
  .component('semitrailerList', semitrailerListComponent)
  .component('semitrailerDetail', semitrailerDetailComponent)
  .component('semitrailerFrom', semitrailerFormComponent)

  .name;