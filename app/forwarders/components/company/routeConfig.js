"use strict";

export default [
  //{path: '/', name: 'CompanyMain', redirectTo: ['CompanySettings']},
  {path: '/', name: 'CompanySettings', component: 'companySettings', useAsDefault : true},
  {path: '/vehicle', name: 'CompanyVehicle', component : 'companyVehicle'},
  {path: '/drivres', name: 'CompanyDrivers', component : 'companyDrivers'},
]