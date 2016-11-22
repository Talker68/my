"use strict";

export default function($rootScope, $sce){
  this.company = $rootScope.currentUser;

    this.htmlPopover = $sce.trustAsHtml(
        '<div class="s-title">Требования к паролю:</div>' +
        '<ul style="margin-right: 20px">' +
        '<li>Не меньше 8 латинских букв и цифр</li>'+
        '<li>Как минимум одна большая буква</li>'+
        '<li>Как минимум одна маленькая буква</li>'+
        '<li>Нельзя использовать 5 последних паролей</li>'+
        '</ul>'+
        '<div class="s-title">Для смены пароля:</div>'+
        '<ul style="margin-right: 20px">'+
        '<li>Укажите "Имя пользователя" с префиксом' +
            '<br>'+
            '<b>ppl/</b><i>имя пользователя</i>' +
        '</li>'+
        '<li>Правильно укажите текущий пароль</li>'+
        '<li>Внимательно введите новый</li>'+
        '<li>Повторите ввод нового пароля.</li>'+
        '</ul>'
    );


}