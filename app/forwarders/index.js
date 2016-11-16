"use strict";



import companyComponent from './components/company';

import ForwardersService from './services/forwarders';


import stateConfig from './states';
export default angular.module('forwarders', [])
  .config(stateConfig)
  .component('company', companyComponent)

  .service('ForwardersService', ForwardersService)

  .name;