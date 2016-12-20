"use strict";

export default function () {
  return function(item, format, round){
    if (round) {
      item = Math[round](item);
    }

    if (format) {
      item = item.toLocaleString();
    }

    return item;
  }
}