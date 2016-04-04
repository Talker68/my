"use strict";

import ForwardersService from './services/forwarders';

export default angular.module('forwarders', [])
  .service('ForwardersService', ForwardersService)
  .name;