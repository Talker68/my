"use strict";

export default function($http, Base64Service, $rootScope){

  this.auth = function(){

    let authData = Base64Service.encode(`${this.login}:${this.pass}`);

    $http.defaults.headers.common.Authorization = 'Basic ' + authData;
    $http.get('/logistics/order').then(
      (response) => {
        $rootScope.curentUser = 'user';
        this.$router.navigate(['Orders'])
      },
      (error) => {
        console.log('gg');
      }
    )
  }
}