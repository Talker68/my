"use strict";

import authComponent from './components/auth';

export default angular.module('auth', [])
  .component('auth', authComponent)

  .name;