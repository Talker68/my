"use strict";

import companyComponent from './components/company';

import ForwardersService from './services/forwarders';

export default angular.module('forwarders', [])
  .component('company', companyComponent)

  .service('ForwardersService', ForwardersService)

  .name;