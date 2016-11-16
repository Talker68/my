"use strict";

export default function($http) {

  // Запрос на сревер , получающий данные пользователя
  this.auth = function () {
    return $http.get(`${REQUEST_PREFIX}/auth`)
  }

  // Получить пользователя
  this.getUser = function() {
    return this.user;
  }

  // Получить тип пользователя
  this.getUserType = function() {
    return this.user ? this.user.type.trim().toLowerCase() : undefined;
  }
}