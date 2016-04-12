"use strict";

export default function () {

  this.getIndexById = function(collection, id){
    for(let i = 0; i < collection.length; i++){
      if(collection[i][id.fieldName] === id.value){
        return i;
      }
    }
    return -1;
  }

  //Для добавления транформации в $http
  this.appendTransform = function (defaults, transform) {

    // We can't guarantee that the default transformation is an array
    defaults = angular.isArray(defaults) ? defaults : [defaults];

    // Append the new transformation to the defaults
    return defaults.concat(transform);
  }
}