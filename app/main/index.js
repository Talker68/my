"use strict";

import 'angular';
import 'bootstrap/dist/css/bootstrap.css';
import uirouter from 'angular-ui-router';

import config from './config';
import states from './states/states';

const app = angular.module('app', [uirouter])
  .config(config)
  .config(states);

export default app;