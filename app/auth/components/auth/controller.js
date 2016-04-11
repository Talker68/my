"use strict";

export default function(Base64Service, $rootScope, AuthService, $http){
  this.$routerOnActivate = function(next, previous) {
    if($rootScope.globals.currentUser && $rootScope.globals.currentUser.authData){
      this.$router.navigate(['Orders']);
    }
  };



  this.auth = function(){
    let authData = Base64Service.encode(`${this.login}:${this.pass}`);
    
    $http.get('/logistics/auth', {headers : {Authorization : 'Basic ' + authData}}).then(
      (response) => {
        AuthService.SetCredentials(response.data, authData);
        this.$router.navigate(['Orders'])
      },
      (error) => {
        this.error = "Ошибка авторизации"
        this.authForm.$setPristine();
      }
    )
  }
}