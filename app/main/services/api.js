"use strict";

export default function() {
  this.getIndexById = function(collection, id) {
    for (let i = 0; i < collection.length; i++){
      if (collection[i][id.fieldName] === id.value) {
        return i;
      }
    }
    return -1;
  };


  this.getBackRoute = function(backroute) {
    let result = {};

    let params = backroute.split('&');

    for (let param of params) {
      let splitParam = param.split('=');
      result[splitParam[0]] = splitParam[1];
    }

    return result;
  };

  this.getArrayElementByGuid = function(guid, array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].guid === guid) {
        let result = Object.create(null);
        result.index = i;
        result.element = array[i];
        return result;
      }
    }
    return undefined;
  };
}
