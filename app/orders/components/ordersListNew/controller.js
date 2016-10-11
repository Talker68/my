"use strict";

export default function ($http) {

  this.$onInit = function () {
    $http.get('format.json').then(response => {
      this.orders = response.data;
    })
  }

}