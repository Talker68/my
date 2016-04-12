"use strict";

export default [
  {path: '/', name: 'DriversList', component : 'driversList', useAsDefault: true},
  {path: '/:guid', name: 'DriverDetail', component : 'driverDetail'},
]