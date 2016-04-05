"use strict";

export default function($q, $rootRouter) {
  this.responseError = (rejection) => {

    if (rejection.status === 401) {
      //$injector.get('$state').go('login');
      $rootRouter.navigate(['Auth']);
    }

    return $q.reject(rejection);
  };
}