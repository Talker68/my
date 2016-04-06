"use strict";

import companyComponent from './components/company';
import companySettingComponent from './components/companySettings';
import companyVehicleComponent from './components/companyVehicle';
import companyDriversComponent from './components/companyDrivres';

import ForwardersService from './services/forwarders';

export default angular.module('forwarders', [])
  .component('company', companyComponent)
  .component('companySettings', companySettingComponent)
  .component('companyVehicle', companyVehicleComponent)
  .component('companyDrivers', companyDriversComponent)

  .service('ForwardersService', ForwardersService)

  .name;