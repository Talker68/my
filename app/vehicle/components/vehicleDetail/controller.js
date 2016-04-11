"use strict";

export default function () {
  this.isEdit = false;

  this.$routerOnActivate = function(next, previous) {
    this.loadingTypes = next.routeData.loadingTypes;
    this.vehicle = next.routeData.vehicle;

    if(next.params.isEdit || next.params.guid === 'new'){
      this.isEdit = true;
    }
  };
}