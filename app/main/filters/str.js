"use strict";

export default function () {
  return function(item, removeFirstZero){
    if (removeFirstZero) {
      item = item.replace(/(УП-)(0+)([1-9]+0*)/, '$1$3');
    }
    return item;
  }
}