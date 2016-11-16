"use strict";

export default function($stateProvider){
  $stateProvider
    .state('company', {
      parent: "app",
      url : 'company',
      component: 'company'
    })

}