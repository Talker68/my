"use strict";

import companyComponent from './components/company';
import companySettingsComponent from './components/companySettings';

import ForwardersService from './services/forwarders';

export default angular.module('forwarders', [])
  .component('company', companyComponent)
  .component('companySettings', companySettingsComponent)

  .service('ForwardersService', ForwardersService)

  .name;