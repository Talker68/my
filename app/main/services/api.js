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
}