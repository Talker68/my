"use strict";

export default function() {

  // Проверка параметра на равенство new
  this.isAddNewState = function(stateParam) {
    return stateParam.trim().toLowerCase() === 'new';
  }

  // Получить элемент из массива по его guid
  this.getArrayElementByGuid = function(guid, array) {
    guid = guid.toLowerCase();

    for (let index = 0; index < array.length; index++) {
      if (array[index].guid.toLowerCase() === guid) {
        return {
          index,
          element : array[index]
        }
      }
    }
    return undefined;
  };




}
