"use strict";

export default [
  {path: '/', name: 'VehicleList', component : 'vehicleList', useAsDefault: true},
  {path: '/:guid', name: 'VehicleDetail', component : 'vehicleDetail'},
]