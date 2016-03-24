/* Контроллер страницы логиста */
app.controller('requestsLogist', function($scope, $http) {



    $http.get( 'http://localhost/ERPPPK_Pivovarov/hs/Logistics/Order/List' ).then( function( response ){
        $scope.listGP = response.data;

        console.log( $scope.listGP );
    });




});