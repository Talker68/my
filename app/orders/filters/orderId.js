"use strict";

export default function () {
  return function(item, prefix){
    if (!prefix) {
      return item;
    } else {
      let regExp = new RegExp("(" + prefix +")(0+)([1-9]+0*)");
      item = item.replace(regExp, '$1$3');
    }
    return item;
  }
}